// 动态生成标签云 - 内联样式，匹配 Gemini 改的 HTML 效果
(function() {
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
    // 内联样式 + 白色遮罩 = 气泡效果（和 Gemini HTML 一致）
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

  // 暗黑模式
  const darkOverride = () => {
    document.querySelectorAll('#tag-cloud a').forEach(a => {
      a.style.setProperty('box-shadow', 'inset 0 0 0 100px rgba(15,23,42,0.85)');
      a.style.setProperty('border-color', 'rgba(255,255,255,0.08)');
      a.style.setProperty('color', '#94a3b8');
    });
  };
  const lightOverride = () => {
    document.querySelectorAll('#tag-cloud a').forEach(a => {
      a.style.setProperty('box-shadow', 'inset 0 0 0 100px rgba(255,255,255,0.86)');
      a.style.setProperty('border-color', 'rgba(219,234,254,0.7)');
      a.style.setProperty('color', '#475569');
    });
  };

  const observer = new MutationObserver(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') darkOverride();
    else lightOverride();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    darkOverride();
  }
})();