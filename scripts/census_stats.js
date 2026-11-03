'use strict'

const cheerio = require('cheerio')
const moment = require('moment')

hexo.extend.filter.register('after_render:html', function (locals) {
  const $ = cheerio.load(locals)
  const census = $('#census-stats')

  if (census.length > 0) {
    const posts = hexo.locals.get('posts')
    const tags = hexo.locals.get('tags')
    const categories = hexo.locals.get('categories')

    // 计算总字数和总词数
    let totalChars = 0
    let totalWords = 0
    posts.forEach(post => {
      const text = post.content.replace(/<[^>]+>/g, '')
      totalChars += text.length
      totalWords += text.split(/\s+/).filter(w => w.length > 0).length
    })

    // 最活跃月份
    const monthMap = {}
    posts.forEach(post => {
      const m = post.date.format('YYYY-MM')
      monthMap[m] = (monthMap[m] || 0) + 1
    })
    const sortedMonths = Object.entries(monthMap).sort((a, b) => b[1] - a[1])
    const topMonth = sortedMonths.length > 0 ? sortedMonths[0][0] : '-'
    const topMonthCount = sortedMonths.length > 0 ? sortedMonths[0][1] : 0

    // 友链数量（从 flink 数据获取）
    let friendCount = 0
    try {
      const linkPagePath = hexo.route.get('link/index.html')
      if (linkPagePath) {
        const linkContent = linkPagePath.toString()
        friendCount = (linkContent.match(/class="flink-list-item"/g) || []).length
      }
    } catch (e) {
      friendCount = 0
    }

    const statsHtml = `
<div class="census-grid">
  <div class="stat-card">
    <div class="stat-number">${posts.length}</div>
    <div class="stat-label">文章</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">${tags.length}</div>
    <div class="stat-label">标签</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">${categories.length}</div>
    <div class="stat-label">分类</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">${Math.round(totalChars / 10000)}</div>
    <div class="stat-label">总字数(万)</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">${totalWords}</div>
    <div class="stat-label">总词数</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">${topMonth}</div>
    <div class="stat-label">最活跃月(${topMonthCount}篇)</div>
  </div>
</div>`

    census.after(statsHtml)
  }

  return $.root().html()
}, 15)