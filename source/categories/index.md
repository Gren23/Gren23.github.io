---
title: 分类
date: 2024-01-01 12:00:00
type: custom-tags
comments: false
---

{% raw %}
<div class="categories-page" id="categoriesPage">
  <div class="cat-grid-title">// CATEGORY_CLASSIFIERS //</div>
  <div class="cat-grid" id="catGrid"></div>
</div>
{% endraw %}

<style>
.categories-page {
  width: 100%;
  padding: 20px 10px;
  box-sizing: border-box;
}
.cat-grid-title {
  text-align: left;
  font-size: 15px;
  margin-bottom: 30px;
  color: #64748b;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
}
.cat-grid {
  columns: 200px 2;
  column-gap: 20px;
}
.cat-card {
  break-inside: avoid;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.35s ease,
              box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
  cursor: pointer;
}
.cat-card:hover {
  transform: translateY(-4px) scale(1.02) !important;
  border-color: rgba(59, 130, 246, 0.45) !important;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.08) !important;
}
.cat-card-name {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.cat-card-name .cat-icon {
  font-size: 18px;
}
.cat-card-count {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.06);
  border: 1px solid rgba(59, 130, 246, 0.12);
  padding: 2px 8px;
  border-radius: 10px;
}
.cat-card:hover .cat-card-count {
  background: #3b82f6;
  color: #ffffff;
}
.cat-card-desc {
  font-size: 12px;
  color: #64748b;
  margin-top: 8px;
}
.cat-card-tag {
  display: inline-block;
  font-family: 'Courier New', monospace;
  font-size: 8.5px;
  color: #3b82f6;
  margin-top: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.cat-card:hover .cat-card-tag {
  opacity: 1;
}

[data-theme="dark"] .cat-card {
  background: rgba(15, 23, 42, 0.5) !important;
  border-color: rgba(255, 255, 255, 0.04) !important;
}
[data-theme="dark"] .cat-card-name {
  color: #f1f5f9;
}
[data-theme="dark"] .cat-card:hover {
  border-color: rgba(96, 165, 250, 0.3) !important;
  box-shadow: 0 8px 24px rgba(96, 165, 250, 0.12) !important;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  var emojiMap = {
    '梅卡曼德': '🤖',
    '机器人通讯': '🔧',
    '文章': '📝',
    '视觉': '👁️',
    'PLC通讯': '⚡',
    '前端': '🎨'
  };
  var colorMap = {
    '梅卡曼德': '#ef4444',
    '机器人通讯': '#f97316',
    '文章': '#22c55e',
    '视觉': '#3b82f6',
    'PLC通讯': '#a855f7',
    '前端': '#ec4899'
  };

  fetch('/api/categories.json')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var grid = document.getElementById('catGrid');
      if (!data || data.length === 0) {
        grid.innerHTML = '<div style="text-align:center;color:#64748b;padding:60px 0;">暂无分类</div>';
        return;
      }
      data.forEach(function(cat, i) {
        var emoji = emojiMap[cat.name] || '📁';
        var color = colorMap[cat.name] || '#3b82f6';
        var link = '/' + cat.path;
        var tag = '[CLS:' + String(i + 1).padStart(2, '0') + '] [ITEMS:' + cat.count + '] [SCAN]';
        var card = document.createElement('div');
        card.className = 'cat-card';
        card.onclick = function() { location.href = link; };
        card.innerHTML =
          '<div class="cat-card-name">' +
            '<span class="cat-icon" style="color:' + color + '">' + emoji + '</span>' +
            cat.name +
            '<span class="cat-card-count">' + cat.count + ' 篇</span>' +
          '</div>' +
          '<div class="cat-card-tag">' + tag + '</div>';
        grid.appendChild(card);
      });
    })
    .catch(function() {
      var grid = document.getElementById('catGrid');
      if (grid) grid.innerHTML = '<div style="text-align:center;color:#64748b;padding:60px 0;">加载失败</div>';
    });
});
</script>
