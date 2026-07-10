// notice-loader.js
// 自动从 /notice/ 页面读取第一条公告，注入到侧边栏公告卡片
(function () {
  function getNotice() {
    fetch('/notice/')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var firstNotice = doc.querySelector('.notice-item');
        if (!firstNotice) return;

        var tag = firstNotice.querySelector('.notice-tag');
        var date = firstNotice.querySelector('.notice-date');
        var title = firstNotice.querySelector('.notice-title');

        var tagText = tag ? tag.textContent.trim() : '';
        var dateText = date ? date.textContent.trim() : '';
        var titleText = title ? title.textContent.trim() : '';

        var card = document.querySelector('.card-announcement .announcement_content');
        if (!card) return;

        card.innerHTML = '\n          <div class="notice-item" style="margin:-12px -12px 0 -12px;padding:0 12px 12px 12px;">\n            <div class="notice-header" style="font-size:12px;color:#999;margin-bottom:4px;">\n              ' + tagText + '\n              <span style="float:right;">' + dateText + '</span>\n            </div>\n            <div class="notice-title" style="font-weight:bold;font-size:14px;margin-bottom:6px;">' + titleText + '</div>\n            <div style="font-size:12px;">\n              <a href="/notice/" style="color:#666;">查看全部公告 &raquo;</a>\n            </div>\n          </div>\n        ';
      })
      .catch(function () {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', getNotice);
  } else {
    getNotice();
  }
})();
