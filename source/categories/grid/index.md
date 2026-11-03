---
title: 分类 - 网格卡片
date: 2026-05-22 02:35:00
type: categories
---

<style>
.categories-page { width: 100%; min-height: calc(100vh - 200px); padding: 40px 20px; }
.cat-desc { text-align: center; font-size: 14px; color: var(--sec-text); margin-bottom: 30px; }
.cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; max-width: 900px; margin: 0 auto; }
.cat-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 28px 20px; text-align: center; cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden; }
.cat-card::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: conic-gradient(transparent, var(--accent), transparent 30%); animation: cat-rotate 4s linear infinite; opacity: 0; transition: opacity 0.3s; }
.cat-card:hover::before { opacity: 0.15; }
.cat-card:hover { transform: translateY(-4px); border-color: var(--accent); box-shadow: 0 8px 30px rgba(108, 92, 231, 0.2); }
@keyframes cat-rotate { to { transform: rotate(360deg); } }
.cat-card-icon { font-size: 36px; margin-bottom: 12px; }
.cat-card-name { font-size: 16px; font-weight: 700; margin-bottom: 6px; color: var(--text-color); }
.cat-card-count { font-size: 12px; color: var(--sec-text); }
</style>

<div class="categories-page">
  <p class="cat-desc">🏷️ 网格卡片样式</p>
  <div class="cat-grid" id="cat-grid"></div>
</div>

<script>
const CATEGORIES_DATA = [{ name: '测试', count: 1, icon: '📁' }];
function renderGrid() {
  const el = document.getElementById('cat-grid');
  el.innerHTML = CATEGORIES_DATA.map(c => `
    <div class="cat-card" onclick="location.href='/categories/${c.name}/'">
      <div class="cat-card-icon">${c.icon}</div>
      <div class="cat-card-name">${c.name}</div>
      <div class="cat-card-count">${c.count} 篇文章</div>
    </div>
  `).join('');
}
renderGrid();
</script>