const fs = require('fs');
const path = require('path');

/**
 * 从 source/notice/index.md 提取最新公告，生成 public/data/latest-notice.json
 */
hexo.extend.generator.register('latest-notice', function (locals) {
  const noticePath = hexo.base_dir + 'source/notice/index.md';
  if (!fs.existsSync(noticePath)) return;

  const content = fs.readFileSync(noticePath, 'utf8');
  const rawMatch = content.match(/{% raw %}([\s\S]*?){% endraw %}/);
  if (!rawMatch) return;

  const html = rawMatch[1];
  const firstItemMatch = html.match(/<div class="notice-item">([\s\S]*?)<\/div>\s*<\/div>\s*<div class="notice-item">/);
  let noticeHtml = firstItemMatch ? firstItemMatch[1] : html;
  noticeHtml = noticeHtml.replace(/<\/div>\s*$/, '').trim();

  const tagMatch = noticeHtml.match(/<span class="notice-tag">([^<]*)<\/span>/);
  const dateMatch = noticeHtml.match(/<span class="notice-date">([^<]*)<\/span>/);
  const titleMatch = noticeHtml.match(/<div class="notice-title">([^<]*)<\/div>/);

  const notice = {
    tag: tagMatch ? tagMatch[1].trim() : '',
    date: dateMatch ? dateMatch[1].trim() : '',
    title: titleMatch ? titleMatch[1].trim() : '',
    url: '/notice/'
  };

  const outputPath = hexo.public_dir + 'data/latest-notice.json';
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }
  fs.writeFileSync(outputPath, JSON.stringify(notice, null, 2));
});