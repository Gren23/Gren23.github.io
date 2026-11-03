'use strict'

// latest_notice_json.js
// 从 source/notice/index.md 提取第一条公告，生成 /data/latest-notice.json。
//
// 历史问题：旧实现只认 `{% raw %}...{% endraw %}` 包裹的写法，
// 而 notice/index.md 用的是裸 HTML，永远匹配不到 → 一直提前 return。
// 于是这个生成器从来没生效过，实际的 JSON 是 source/data/latest-notice.json
// 这个手工维护的静态文件（日期还丢了时分）。
//
// 现在：不再依赖 raw 标签，直接在 md 正文里找第一个 .notice-item 块，
// 并且作为正常 generator 返回，保证产物一定存在。

const fs = require('fs')
const path = require('path')

hexo.extend.generator.register('latest_notice_json', function () {
  const mdPath = path.join(hexo.base_dir, 'source', 'notice', 'index.md')
  if (!fs.existsSync(mdPath)) return

  let content = fs.readFileSync(mdPath, 'utf8')

  // 去掉 front-matter
  content = content.replace(/^---[\s\S]*?\n---\n?/, '')

  const startIdx = content.indexOf('<div class="notice-item">')
  if (startIdx < 0) return

  const rest = content.slice(startIdx)
  const nextIdx = rest.indexOf('<div class="notice-item">', 10)
  const block = nextIdx > 0 ? rest.slice(0, nextIdx) : rest

  const pick = (re) => {
    const m = block.match(re)
    return m ? m[1].trim() : ''
  }

  const notice = {
    url: '/notice/',
    tag: pick(/<span class="notice-tag">([^<]*)<\/span>/),
    date: pick(/<span class="notice-date">([^<]*)<\/span>/),
    title: pick(/<div class="notice-title">([^<]*)<\/div>/)
  }

  if (!notice.title) return

  return {
    path: 'data/latest-notice.json',
    data: JSON.stringify(notice, null, 2)
  }
})
