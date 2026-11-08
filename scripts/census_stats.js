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
    <div class="stat-number">${topMonth}</div>
    <div class="stat-label">最活跃月(${topMonthCount}篇)</div>
  </div>
</div>`

    // ---------- 月度趋势（纯 CSS 柱状图，零 JS 依赖）----------
    const monthKeys = Object.keys(monthMap).sort()
    const maxCount = Math.max(...Object.values(monthMap), 1)
    const barsHtml = monthKeys.map(m => {
      const c = monthMap[m]
      const h = Math.round((c / maxCount) * 100)
      const label = m.slice(2)          // 2025-09 -> 25-09
      return `<div class="census-bar-wrap" title="${m}：${c} 篇">
        <div class="census-bar-count">${c}</div>
        <div class="census-bar" style="height:${h}%"></div>
        <div class="census-bar-label">${label}</div>
      </div>`
    }).join('')

    // ---------- 最后更新时间 ----------
    const now = moment().format('YYYY-MM-DD HH:mm')
    const metaHtml = `<div class="census-meta">数据生成于 ${now}（每次构建自动更新）</div>`

    const trendHtml = `
<div class="census-trend">
  <div class="census-trend-bars">${barsHtml}</div>
</div>`

    census.after(statsHtml)
    census.parent().append(metaHtml)

    // 趋势图插入到专用容器 #census-trend
    const trendSlot = $('#census-trend')
    if (trendSlot.length > 0) {
      trendSlot.html('<div class="census-trend-bars">' + barsHtml + '</div>')
      // 给容器本身套上 census-trend 的卡片样式
      trendSlot.addClass('census-trend')
    }
  }

  return $.root().html()
}, 15)