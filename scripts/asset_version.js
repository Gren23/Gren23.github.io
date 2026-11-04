'use strict'

// asset_version.js
// 给自定义 CSS/JS 加内容哈希文件名，解决 CDN 长缓存导致的「改了不生效」。
//
// 背景：Vercel 对静态资源下发 Cache-Control: public, max-age=2678400（31 天），
// Cloudflare 完全遵循；且 Cloudflare 对静态扩展名按「忽略 query string」缓存，
// 所以 ?v=xxx、?bust=xxx 都打不穿 —— 只有换路径才会命中新对象。
//
// 做法：hexo generate 全部写完后，读 public 里的文件算 md5(前8位)：
//   css/inject-fix.css  ->  css/inject-fix.<hash>.css
// 复制出带 hash 的副本，再扫描所有 HTML 把引用替换过去。
// 改内容 -> hash 变 -> URL 变 -> CDN 自动回源。原文件保留，兼容外部直链。

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

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

  const mapping = {}
  for (const rel of CUSTOM_ASSETS) {
    const abs = path.join(pub, rel.split('/').join(path.sep))
    if (!fs.existsSync(abs)) continue
    const buf = fs.readFileSync(abs)
    const h = crypto.createHash('md5').update(buf).digest('hex').slice(0, 8)
    const ext = path.extname(rel)
    const vrel = rel.slice(0, -ext.length) + '.' + h + ext
    fs.writeFileSync(path.join(pub, vrel.split('/').join(path.sep)), buf)
    mapping['/' + rel] = '/' + vrel
  }

  let changed = 0
  for (const file of walk(pub, [])) {
    if (!file.endsWith('.html')) continue
    let str = fs.readFileSync(file, 'utf8')
    const before = str
    for (const orig of Object.keys(mapping)) {
      const ver = mapping[orig]
      const esc = orig.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const re = new RegExp('(href|src)=(["\'])' + esc + '(?:\\?[^"\']*)?\\2', 'g')
      str = str.replace(re, function (m, attr, q) {
        return attr + '=' + q + ver + q
      })
    }
    if (str !== before) {
      fs.writeFileSync(file, str)
      changed++
    }
  }

  log.info('asset_version: %d assets versioned, %d/%d html rewritten (attempt %d)',
    Object.keys(mapping).length, changed, htmlCount, attempt)
}

hexo.on('generateAfter', function () {
  setTimeout(function () { doVersion(0) }, 0)
})
