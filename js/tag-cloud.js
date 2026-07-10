// 动态生成标签云
(function () {
  function waitForPosts() {
    if (typeof posts === 'undefined') {
      setTimeout(waitForPosts, 100);
      return;
    }
    run();
  }

  function run() {
    const tagCount = {};
    posts.forEach(function (post) {
      (post.tags || []).forEach(function (t) {
        const name = typeof t === 'object' ? t.name : t;
        tagCount[name] = (tagCount[name] || 0) + 1;
      });
    });

    const container = document.getElementById('tag-cloud');
    if (!container) return;

    const sorted = Object.entries(tagCount).sort(function (a, b) { return b[1] - a[1]; });
    const max = sorted[0][1];

    // HSL 限制色相范围，确保对比度和可读性
    function getColor() {
      const hue = Math.floor(Math.random() * 360);
      const sat = 60 + Math.floor(Math.random() * 30); // 60%~90%
      const light = 45 + Math.floor(Math.random() * 20); // 45%~65%
      return `hsl(${hue}, ${sat}%, ${light}%)`;
    }

    sorted.forEach(function (entry) {
      const name = entry[0];
      const count = entry[1];
      const a = document.createElement('a');
      const size = 1.2 + (count / max) * 0.3;
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
      a.textContent = name;
      const sup = document.createElement('sup');
      sup.textContent = count;
      a.appendChild(sup);
      container.appendChild(a);
    });

    function applyTheme() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const items = container.querySelectorAll('a');
      items.forEach(function (el) {
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

    // 主题切换时重新应用，无需 MutationObserver（只改现有元素的 style，不新建）
    const themeObs = new MutationObserver(applyTheme);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForPosts);
  } else {
    waitForPosts();
  }
})();
