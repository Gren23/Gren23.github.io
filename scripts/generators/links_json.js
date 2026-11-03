'use strict'

// links_json.js
// 把 source/_data/link.yml 里手写的友链，转成前端可直接消费的 /data/links.json。
//
// 背景：友链原本只有一个来源——https://link.hehey.top 的 API，但该后端目前返回 502，
// 导致 /link/ 页面每次都空等 4~5 秒且列表为空。这里在构建期生成静态快照，
// 页面先渲染快照，远程 API 可用时再覆盖。

const fs = require('fs')
const path = require('path')

hexo.extend.generator.register('links_json', function (locals) {
  const ymlPath = path.join(hexo.base_dir, 'source', '_data', 'link.yml')

  if (!fs.existsSync(ymlPath)) {
    return { path: 'data/links.json', data: '[]' }
  }

  // Hexo 已经把 _data/*.yml 解析进 locals.data，直接用，避免再引一次 yaml 解析器
  const groups = (locals.data && locals.data.link) || []
  const flat = []

  groups.forEach(function (group) {
    const groupName = group.class_name || ''
    const list = group.link_list || []
    list.forEach(function (item) {
      flat.push({
        name: item.name || '',
        link: item.link || '',
        avatar: item.avatar || '',
        descr: item.descr || '',
        group: groupName
      })
    })
  })

  return {
    path: 'data/links.json',
    data: JSON.stringify(flat)
  }
})
