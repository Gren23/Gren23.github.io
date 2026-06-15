// 动态生成标签云 - 等 posts 变量就绪后再执行
(function waitForPosts() {
  if (typeof posts === 'undefined') {
    setTimeout(waitForPosts, 100);
    return;
  }

  const tagCount = {};
  posts.forEach(post => {
    (post.tags || []).forEach(t => {
      const name = typeof t === 'object' ? t.name : t;
      tagCount[name] = (tagCount[name] || 0) + 1;
    });
  });

  const container = document.getElementById('tag-cloud');
  if (!container) return;

  const sorted = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);
  const max = sorted[0][1];

  const getColor = () => {
    const r = Math.floor(Math.random() * 201);
    const g = Math.floor(Math.random() * 201);
    const b = Math.floor(Math.random() * 201);
    return `rgb(${r},${g},${b})`;
  };

  sorted.forEach(([name, count]) => {
    const a = document.createElement('a');
    const size = 1.2 + (count / max) * 0.3;
    a.href = '/tags/' + encodeURIComponent(name) + '/';
    a.style.cssText = [
      `display: inline-block`,
      `margin: 8px 12px`,
      `padding: 6px 16px`,
      `border-radius: 30px`,
      `font-family: 'Noto Sans SC', sans-serif`,
      `font-weight: 500`,
      `text-decoration: none`,
      `font-size: ${size.toFixed(2)}em`,
      `background-color: ${getColor()}`,
      `box-shadow: inset 0 0 0 100px rgba(255,255,255,0.86)`,
      `color: #475569`,
      `border: 1px solid rgba(219,234,254,0.7)`,
      `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`
    ].join('; ');
    a.innerHTML = `${name}<sup>${count}</sup>`;
    container.appendChild(a);
  });

  const applyTheme = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('#tag-cloud a').forEach(a => {
      if (isDark) {
        a.style.setProperty('box-shadow', 'inset 0 0 0 100px rgba(15,23,42,0.85)');
        a.style.setProperty('border-color', 'rgba(255,255,255,0.08)');
        a.style.setProperty('color', '#94a3b8');
      } else {
        a.style.setProperty('box-shadow', 'inset 0 0 0 100px rgba(255,255,255,0.86)');
        a.style.setProperty('border-color', 'rgba(219,234,254,0.7)');
        a.style.setProperty('color', '#475569');
      }
    });
  };

  applyTheme();
  new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();