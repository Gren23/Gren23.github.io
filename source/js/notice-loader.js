// notice-loader.js
// 从 /data/latest-notice.json（构建时生成，约 150B）读取最新公告，注入侧边栏公告卡片。
// 旧实现会 fetch 整个 /notice/ 页面（约 34KB）只为抠第一条，等于每个页面都多下一次全页请求。
// 现在改读 JSON，并且全部走 DOM API 而不是拼 HTML 字符串。
(function () {
  'use strict';

  var ENDPOINT = '/data/latest-notice.json';
  var FALLBACK_URL = '/notice/';

  function render(card, data) {
    while (card.firstChild) card.removeChild(card.firstChild);

    var item = document.createElement('div');
    item.className = 'notice-item';
    item.style.cssText = 'margin:-12px -12px 0 -12px;padding:0 12px 12px 12px;';

    var header = document.createElement('div');
    header.className = 'notice-header';
    header.style.cssText = 'font-size:12px;color:#999;margin-bottom:4px;';
    header.appendChild(document.createTextNode(data.tag || ''));

    var date = document.createElement('span');
    date.style.cssText = 'float:right;';
    date.textContent = data.date || '';
    header.appendChild(date);

    var title = document.createElement('div');
    title.className = 'notice-title';
    title.style.cssText = 'font-weight:bold;font-size:14px;margin-bottom:6px;';
    title.textContent = data.title || '';

    var foot = document.createElement('div');
    foot.style.cssText = 'font-size:12px;';
    var a = document.createElement('a');
    a.href = data.url || FALLBACK_URL;
    a.style.cssText = 'color:#666;';
    a.textContent = '查看全部公告 »';
    foot.appendChild(a);

    item.appendChild(header);
    item.appendChild(title);
    item.appendChild(foot);
    card.appendChild(item);
  }

  function load() {
    var card = document.querySelector('.card-announcement .announcement_content');
    if (!card) return;

    // 构建异常时 JSON 不存在，静默保留模板自带的静态内容
    fetch(ENDPOINT, { credentials: 'same-origin' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        if (data && data.title) render(card, data);
      })
      .catch(function () { /* 保持静态内容 */ });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
