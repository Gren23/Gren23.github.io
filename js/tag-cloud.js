// 动态生成标签云 - 从 posts 数据统计
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
    const r = Math.floor(Math.random() * 156 + 50);
    const g = Math.floor(Math.random() * 156 + 50);
    const b = Math.floor(Math.random() * 156 + 50);
    return `rgb(${r},${g},${b})`;
  };

  sorted.forEach(([name, count]) => {
    const a = document.createElement('a');
    const size = 1.2 + (count / max) * 0.3;
    a.href = '/tags/' + encodeURIComponent(name) + '/';
    a.style.cssText = `font-size: ${size.toFixed(2)}em; background-color: ${getColor()}; color: #fff; padding: 4px 12px; border-radius: 20px; display: inline-block; margin: 4px; text-decoration: none; opacity: 0.85; transition: all 0.3s;`;
    a.innerHTML = `${name}<sup>${count}</sup>`;
    container.appendChild(a);
  });
})();