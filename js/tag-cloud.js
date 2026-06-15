// 动态生成标签云 - 等 DOM 完全就绪后再执行
(function() {
  function waitForPosts() {
    if (typeof posts === 'undefined') {
      setTimeout(waitForPosts, 100);
      return;
    }
    run();
  }

  function run() {
    var tagCount = {};
    posts.forEach(function(post) {
      (post.tags || []).forEach(function(t) {
        var name = typeof t === 'object' ? t.name : t;
        tagCount[name] = (tagCount[name] || 0) + 1;
      });
    });

    var container = document.getElementById('tag-cloud');
    if (!container) return;

    var sorted = Object.entries(tagCount).sort(function(a, b) { return b[1] - a[1]; });
    var max = sorted[0][1];

    var getColor = function() {
      var r = Math.floor(Math.random() * 201);
      var g = Math.floor(Math.random() * 201);
      var b = Math.floor(Math.random() * 201);
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    };

    sorted.forEach(function(entry) {
      var name = entry[0];
      var count = entry[1];
      var a = document.createElement('a');
      var size = 1.2 + (count / max) * 0.3;
      a.href = '/tags/' + encodeURIComponent(name) + '/';
      a.style.cssText = [
        'display: inline-block',
        'margin: 8px 12px',
        'padding: 6px 16px',
        'border-radius: 30px',
        'font-family: "Noto Sans SC", sans-serif',
        'font-weight: 500',
        'text-decoration: none',
        'font-size: ' + size.toFixed(2) + 'em',
        'background-color: ' + getColor(),
        'box-shadow: inset 0 0 0 100px rgba(255,255,255,0.86)',
        'color: #475569',
        'border: 1px solid rgba(219,234,254,0.7)',
        'transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      ].join('; ');
      a.innerHTML = name + '<sup>' + count + '</sup>';
      container.appendChild(a);
    });

    function applyTheme() {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var items = document.querySelectorAll('#tag-cloud a');
      items.forEach(function(el) {
        if (isDark) {
          el.style.setProperty('box-shadow', 'inset 0 0 0 100px rgba(15,23,42,0.85)');
          el.style.setProperty('border-color', 'rgba(255,255,255,0.08)');
          el.style.setProperty('color', '#94a3b8');
        } else {
          el.style.setProperty('box-shadow', 'inset 0 0 0 100px rgba(255,255,255,0.86)');
          el.style.setProperty('border-color', 'rgba(219,234,254,0.7)');
          el.style.setProperty('color', '#475569');
        }
      });
    }

    applyTheme();
    new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForPosts);
  } else {
    waitForPosts();
  }
})();