'use strict';

const { stripHTML } = require('hexo-util');
const pinyin = require('pinyin');

function getPinyin(text) {
  if (!text) return '';
  return pinyin(text, {
    style: pinyin.STYLE_NORMALIZED,
    segment: true
  }).join('').toLowerCase();
}

function savedb(article, config, isPost) {
  const data = {};
  if (article.title) {
    data.title = article.title;
    // Add pinyin for title
    data.title_pinyin = getPinyin(article.title);
  }
  if (article.path) {
    data.url = encodeURI(config.root + article.path);
  }
  if (config.search.content !== false) {
    if (config.search.format === 'raw') {
      data.content = article._content;
    } else {
      data.content = article.content.replace(/<td class="gutter">.*?<\/td>/g, '');
      if (config.search.format === 'striptags') {
        data.content = stripHTML(data.content);
      }
    }
  } else {
    data.content = '';
  }
  if (!isPost) {
    return data;
  }
  if (article.categories && article.categories.length > 0) {
    data.categories = article.categories.map(category => category.name);
  }
  if (article.tags && article.tags.length > 0) {
    data.tags = article.tags.map(tag => tag.name);
  }
  return data;
}

module.exports = function(locals, config) {
  const searchfield = config.search.field;
  const database = [];
  if (searchfield === 'all' || searchfield === 'post') {
    locals.posts.forEach(post => {
      const data = savedb(post, config, true);
      database.push(data);
    });
  }
  if (searchfield === 'all' || searchfield === 'page') {
    locals.pages.forEach(page => {
      const data = savedb(page, config);
      database.push(data);
    });
  }
  return database;
};