'use strict'

const moment = require('moment')

hexo.extend.generator.register('charts_page', function (locals) {
  const posts = locals.posts.sort('date', -1)
  const date = new Date().toISOString().slice(0, 10)

  // 准备文章发布时间统计数据
  const startDate = moment('2025-01')
  const endDate = moment()
  const monthMap = new Map()

  for (let time = startDate; time <= endDate; time += 3600 * 24 * 1000) {
    const month = moment(time).format('YYYY-MM')
    if (!monthMap.has(month)) {
      monthMap.set(month, 0)
    }
  }

  posts.forEach(function (post) {
    const month = post.date.format('YYYY-MM')
    if (monthMap.has(month)) {
      monthMap.set(month, monthMap.get(month) + 1)
    }
  })

  const monthArr = JSON.stringify([...monthMap.keys()])
  const monthValueArr = JSON.stringify([...monthMap.values()])

  // 准备标签统计数据
  const tagArr = []
  locals.tags.map(function (tag) {
    tagArr.push({ name: tag.name, value: tag.length, path: tag.path })
  })
  tagArr.sort((a, b) => { return b.value - a.value })
  const topTags = tagArr.slice(0, 10)
  const tagNameArr = JSON.stringify(topTags.map(t => t.name))
  const tagValueArr = JSON.stringify(topTags.map(t => t.value))

  // 准备分类统计数据
  const categoryArr = []
  locals.categories.map(function (category) {
    categoryArr.push({ name: category.name, value: category.length, path: category.path })
  })
  categoryArr.sort((a, b) => { return b.value - a.value })
  const categoryNameArr = JSON.stringify(categoryArr.map(c => c.name))
  const categoryValueArr = JSON.stringify(categoryArr.map(c => ({ name: c.name, value: c.value, path: c.path })))

  const html = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>文章统计 | G/ren的小破站</title>' +
    '<link rel="stylesheet" href="/css/index.css?v=5.5.4">' +
    '<style>' +
    '.chart-section { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin: 20px 0; }' +
    '.chart-title { font-size: 18px; font-weight: 600; color: var(--text-color); text-align: center; margin-bottom: 20px; }' +
    '</style></head><body>' +
    '<div class="container" style="max-width:1200px;margin:0 auto;padding:20px;">' +
    '<h1 style="text-align:center">📊 文章统计</h1>' +
    '<p style="text-align:center;color:var(--sec-text)">📊 数据更新于 ' + date + '</p>' +
    '<div id="posts-chart" class="chart-section" data-start="2025-01"></div>' +
    '<div id="tags-chart" class="chart-section" data-length="10"></div>' +
    '<div id="categories-chart" class="chart-section" data-parent="false"></div>' +
    '</div>' +
    '<script src="https://npm.elemecdn.com/echarts@5/dist/echarts.min.js"></script>' +
    '<script>' +
    `var color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4c4948' : 'rgba(255,255,255,0.7)';
    var postsChart = echarts.init(document.getElementById('posts-chart'));
    postsChart.setOption({
      title: { text: '文章发布统计图', x: 'center', textStyle: { color: color } },
      tooltip: { trigger: 'axis' },
      xAxis: { name: '日期', type: 'category', boundaryGap: false, nameTextStyle: { color: color }, axisTick: { show: false }, axisLabel: { color: color }, axisLine: { lineStyle: { color: color } }, data: ${monthArr} },
      yAxis: { name: '文章篇数', type: 'value', nameTextStyle: { color: color }, splitLine: { show: false }, axisTick: { show: false }, axisLabel: { color: color }, axisLine: { lineStyle: { color: color } } },
      series: [{ name: '文章篇数', type: 'line', smooth: true, lineStyle: { width: 0 }, showSymbol: false, itemStyle: { opacity: 1, color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(128, 255, 165)' }, { offset: 1, color: 'rgba(1, 191, 236)' }]) }, areaStyle: { opacity: 1, color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(128, 255, 165)' }, { offset: 1, color: 'rgba(1, 191, 236)' }]) }, data: ${monthValueArr}, markLine: { data: [{ name: '平均值', type: 'average', label: { color: color } }] } }]
    });

    var tagsChart = echarts.init(document.getElementById('tags-chart'));
    tagsChart.setOption({
      title: { text: 'Top 10 标签统计图', x: 'center', textStyle: { color: color } },
      tooltip: {},
      xAxis: { name: '标签', type: 'category', nameTextStyle: { color: color }, axisTick: { show: false }, axisLabel: { color: color, interval: 0 }, axisLine: { lineStyle: { color: color } }, data: ${tagNameArr} },
      yAxis: { name: '文章篇数', type: 'value', splitLine: { show: false }, nameTextStyle: { color: color }, axisTick: { show: false }, axisLabel: { color: color }, axisLine: { lineStyle: { color: color } } },
      series: [{ name: '文章篇数', type: 'bar', data: ${tagValueArr}, itemStyle: { borderRadius: [5, 5, 0, 0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(128, 255, 165)' }, { offset: 1, color: 'rgba(1, 191, 236)' }]) }, markLine: { data: [{ name: '平均值', type: 'average', label: { color: color } }] } }]
    });

    var categoriesChart = echarts.init(document.getElementById('categories-chart'));
    categoriesChart.setOption({
      title: { text: '文章分类统计图', x: 'center', textStyle: { color: color } },
      legend: { top: 'bottom', data: ${categoryNameArr}, textStyle: { color: color } },
      tooltip: { trigger: 'item' },
      series: [{ name: '文章篇数', type: 'pie', radius: [30, 80], roseType: 'area', label: { color: color, formatter: '{b} : {c} ({d}%)' }, data: ${categoryValueArr}, itemStyle: { emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(255, 255, 255, 0.5)' } } }]
    });

    window.addEventListener('resize', () => {
      postsChart.resize();
      tagsChart.resize();
      categoriesChart.resize();
    });` +
    '</script></body></html>'

  return {
    path: 'charts/index.html',
    data: new Buffer(html),
    mode: '0644'
  }
})