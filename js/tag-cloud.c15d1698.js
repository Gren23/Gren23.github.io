// tag-cloud.js
// 只服务于带 #tag-cloud 容器的页面（当前站点没有任何页面提供该容器）。
// 旧实现找不到容器也会一直每 100ms 轮询等 window.posts，等于所有页面常驻一个定时器。
// 现在：先看容器在不在，不在直接退出；在的话用 rAF 等待并设超时上限。
(function () {
  'use strict';

  var MAX_WAIT_MS = 5000;
  var start = Date.now();

  function run() {
    var container = document.getElementById('tag-cloud');
    if (!container) return;

    var posts = window.posts;
    if (!Array.isArray(posts)) {
      if (Date.now() - start > MAX_WAIT_MS) return;
      requestAnimationFrame(run);
      return;
    }

    var tagCount = Object.create(null);
    posts.forEach(function (post) {
      (post.tags || []).forEach(function (t) {
        var name = (t && typeof t === 'object') ? t.name : t;
        if (!name) return;
        tagCount[name] = (tagCount[name] || 0) + 1;
      });
    });

    var sorted = Object.keys(tagCount)
      .map(function (k) { return [k, tagCount[k]]; })
      .sort(function (a, b) { return b[1] - a[1]; });

    if (!sorted.length) return;
    var max = sorted[0][1];

    var frag = document.createDocumentFragment();
    sorted.forEach(function (entry) {
      var name = entry[0];
      var count = entry[1];

      var a = document.createElement('a');
      a.className = 'tag-cloud-anchor';
      a.href = '/tags/' + encodeURIComponent(name) + '/';
      a.style.setProperty('--tc-size', (1.2 + (count / max) * 0.3).toFixed(2) + 'em');
      a.textContent = name;

      var sup = document.createElement('sup');
      sup.textContent = count;
      a.appendChild(sup);

      frag.appendChild(a);
    });

    container.appendChild(frag);
  }

  function boot() {
    if (!document.getElementById('tag-cloud')) return;
    run();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
