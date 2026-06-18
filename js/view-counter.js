/**
 * 博客文章浏览量统计 - Cloudflare KV
 * 仅在文章页显示
 */
(function() {
  // 只在文章页执行
  if (!document.body.classList.contains('type-post') && !window.location.pathname.startsWith('/posts/')) return;

  const apiUrl = 'https://kv.hehey.top/';
  const path = window.location.pathname;

  function createViewEl(initialCount) {
    const el = document.createElement('span');
    el.id = 'blog-views';
    el.className = 'post-meta-views';
    el.innerHTML = '<i class="fa-solid fa-eye"></i> <span>' + initialCount + '</span>';
    return el;
  }

  function insertViewCount(count) {
    const titleEl = document.querySelector('.post-title, .article-title, h1.title');
    if (!titleEl) return;
    const el = createViewEl(count);
    titleEl.parentNode.insertBefore(el, titleEl.nextSibling);
  }

  fetch(apiUrl + '?path=' + encodeURIComponent(path))
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data && data.views !== undefined) {
        insertViewCount(data.views);
      }
    })
    .catch(function() {});
})();
