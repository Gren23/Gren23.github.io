'use strict'

// asset_version.js
// 给静态资源加内容哈希文件名，解决 CDN 长缓存导致的「改了不生效」。
//
// 背景：Vercel 对静态资源下发 Cache-Control: public, max-age=2678400（31 天），
// Cloudflare 完全遵循；且 Cloudflare 对静态扩展名按「忽略 query string」缓存，
// 所以 ?v=xxx、?bust=xxx 都打不穿 —— 只有换路径才会命中新对象。
//
// 做法：hexo generate 全部写完后，读 public 里的文件算 md5(前8位)：
//   css/inject-fix.css      ->  css/inject-fix.<hash>.css
//   webfonts/fa-solid-900.woff2 -> webfonts/fa-solid-900.<hash>.woff2
// 复制出带 hash 的副本，再改写引用。
//
// 引用有两类，必须分别处理：
//   1. HTML 里的 href=/src=      -> 全局改写所有 .html
//   2. CSS 里的 url(...)         -> 字体是被 css/all.min.css 的 @font-face 引用的，
//                                   所以字体必须先算 hash，再重写 CSS 内部的 url()，
//                                   最后才计算 CSS 自己的 hash（否则 hash 会算错）。
// 改内容 -> hash 变 -> URL 变 -> CDN/浏览器自动回源。原文件保留，兼容外部直链。

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

// 第一批：字体（被 CSS 引用，必须先处理）
const FONT_ASSETS = [
  'webfonts/fa-solid-900.woff2',
  'webfonts/fa-brands-400.woff2',
  'webfonts/fa-regular-400.woff2',
  'webfonts/fa-v4compatibility.woff2',
]

// 第二批：CSS / JS（CSS 内部可能引用字体）
const CUSTOM_ASSETS = [
  // 主题编译产物：配色/样式改动全在这里，必须版本化
  'css/index.css',
  'css/all.min.css',
  'js/main.js',
  'js/utils.js',
  'js/search/local-search.js',
  // 本站自定义资源
  'css/design-system.css',
  'css/custom-index.css',
  'css/custom-notice-tags.css',
  'css/inject-fix.css',
  'js/vision-network.js',
  'js/tag-cloud.js',
  'js/scroll-reveal.js',
  'js/notice-loader.js',
]

function walk(dir, out) {
  let names
  try { names = fs.readdirSync(dir) } catch (e) { return out }
  for (const name of names) {
    const p = path.join(dir, name)
    let st
    try { st = fs.statSync(p) } catch (e) { continue }
    if (st.isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

function countHtml(pub) {
  return walk(pub, []).filter(function (f) { return f.endsWith('.html') }).length
}

function hashOf(buf) {
  return crypto.createHash('md5').update(buf).digest('hex').slice(0, 8)
}

function versionedRel(rel, hash) {
  const ext = path.extname(rel)
  return rel.slice(0, -ext.length) + '.' + hash + ext
}

function abs(pub, rel) {
  return path.join(pub, rel.split('/').join(path.sep))
}

// 给一批资源生成 hash 副本，返回 { '/原路径': '/新路径' }
function makeVersioned(pub, list, log) {
  const map = {}
  for (const rel of list) {
    const src = abs(pub, rel)
    if (!fs.existsSync(src)) continue
    const buf = fs.readFileSync(src)
    const h = hashOf(buf)
    const vrel = versionedRel(rel, h)
    fs.writeFileSync(abs(pub, vrel), buf)
    map['/' + rel] = '/' + vrel
  }
  return map
}

// 改写 CSS 内部的 url(...)：把 ../webfonts/x.woff2 换成带 hash 的
function rewriteCssUrls(pub, cssRel, fontMap) {
  const p = abs(pub, cssRel)
  if (!fs.existsSync(p)) return 0
  let str = fs.readFileSync(p, 'utf8')
  const before = str
  let n = 0

  for (const orig of Object.keys(fontMap)) {
    const ver = fontMap[orig]
    // orig 形如 /webfonts/fa-solid-900.woff2
    // CSS 里写的是 ../webfonts/fa-solid-900.woff2（相对 css/ 目录）
    const fileName = orig.replace('/webfonts/', '')
    const verName = ver.replace('/webfonts/', '')
    const esc = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    // 允许前面有任意相对前缀（../、../../）或绝对路径
    const re = new RegExp('(url\\(\\s*["\']?)([^)"\']*?)' + esc + '(\\?[^)"\']*)?(["\'"]?\\s*\\))', 'g')
    const next = str.replace(re, function (m, pre, prefix, q, post) {
      n++
      return pre + prefix + verName + post
    })
    str = next
  }

  if (str !== before) {
    fs.writeFileSync(p, str, 'utf8')
  }
  return n
}

// 改写 HTML 里的引用
function rewriteHtml(pub, map) {
  let changed = 0
  for (const file of walk(pub, [])) {
    if (!file.endsWith('.html')) continue
    let str = fs.readFileSync(file, 'utf8')
    const before = str
    for (const orig of Object.keys(map)) {
      const ver = map[orig]
      const esc = orig.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const re = new RegExp('(href|src)=(["\'])' + esc + '(?:\\?[^"\']*)?\\2', 'g')
      str = str.replace(re, function (m, attr, q) {
        return attr + '=' + q + ver + q
      })
    }
    if (str !== before) {
      fs.writeFileSync(file, str, 'utf8')
      changed++
    }
  }
  return changed
}

let lastCount = -1

function doVersion(attempt) {
  const pub = hexo.public_dir
  const log = hexo.log

  // 必须等 HTML 全部落盘再动手。
  // 判据：连续两次扫描数量相同（说明写入已停止），且至少有个位数的页面。
  // 不能写死阈值——页面会增删（曾因写死 100 在 94 页时永不触发；
  // 改成 >=10 又会在只写了 18 个时就提前触发）。
  const htmlCount = countHtml(pub)
  const settled = htmlCount === lastCount && htmlCount > 5
  lastCount = htmlCount

  if (!settled) {
    if (attempt < 300) {
      setTimeout(function () { doVersion(attempt + 1) }, 100)
    } else {
      log.warn('asset_version: gave up, html never settled (last count %d, %d attempts)', htmlCount, attempt)
    }
    return
  }

  // ---- 1. 字体先版本化 ----
  const fontMap = makeVersioned(pub, FONT_ASSETS, log)
  log.info('asset_version: %d fonts versioned', Object.keys(fontMap).length)

  // ---- 2. 把字体新路径写进引用了字体的 CSS ----
  // all.min.css 是 @font-face 的唯一来源；其他 CSS 若也引用了字体，一并处理
  const cssFiles = walk(pub, []).filter(function (f) {
    return f.endsWith('.css') && path.dirname(f).includes('css')
  })
  let urlRewrites = 0
  for (const f of cssFiles) {
    const rel = path.relative(pub, f).replace(/\\/g, '/')
    urlRewrites += rewriteCssUrls(pub, rel, fontMap)
  }
  log.info('asset_version: %d css url() rewritten', urlRewrites)

  // ---- 3. 再给 CSS/JS 算 hash（此时 CSS 内容已含字体 hash，算出来才对）----
  const assetMap = makeVersioned(pub, CUSTOM_ASSETS, log)

  // ---- 4. 改写 HTML 引用 ----
  const allMap = Object.assign({}, fontMap, assetMap)
  const changed = rewriteHtml(pub, allMap)

  log.info('asset_version: %d assets versioned (%d fonts), %d/%d html rewritten (attempt %d)',
    Object.keys(allMap).length, Object.keys(fontMap).length, changed, htmlCount, attempt)
}

hexo.on('generateAfter', function () {
  setTimeout(function () { doVersion(0) }, 0)
})
