---
title: 分类 - 瀑布流
date: 2026-05-22 02:38:00
---

<style>
.categories-page { width: 100%; min-height: calc(100vh - 200px); padding: 40px 20px; }
.cat-desc { text-align: center; font-size: 14px; color: var(--sec-text); margin-bottom: 30px; }
.cat-waterfall { columns: 200px 3; column-gap: 16px; max-width: 700px; margin: 0 auto; }
.cat-waterfall-item { break-inside: avoid; margin-bottom: 16px; border-radius: 12px; background: var(--card-bg); border: 1px solid var(--border); padding: 20px; text-align: center; transition: all 0.3s; cursor: pointer; }
.cat-waterfall-item:hover { transform: scale(1.03); border-color: var(--accent); box-shadow: 0 4px 20px rgba(108, 92, 231, 0.15); }
.cat-waterfall-icon { font-size: 28px; margin-bottom: 10px; }
.cat-waterfall-name { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.cat-waterfall-count { font-size: 12px; color: var(--sec-text); }
</style>

<div class="categories-page">
  <p class="cat-desc">📐 瀑布流样式</p>
  <div class="cat-waterfall" id="cat-waterfall"></div>
</div>

<script>
const CATEGORIES_DATA = [
  { name: '前端', count: 4, icon: '🎨' },
  { name: '视觉', count: 4, icon: '👁️' }
];
function renderWaterfall() {
  const el = document.getElementById('cat-waterfall');
  el.innerHTML = CATEGORIES_DATA.map(c => `
    <div class="cat-waterfall-item" onclick="location.href='/categories/${c.name}/'">
      <div class="cat-waterfall-icon">${c.icon}</div>
      <div class="cat-waterfall-name">${c.name}</div>
      <div class="cat-waterfall-count">${c.count} 篇</div>
    </div>
  `).join('');
}
renderWaterfall();
</script>