---
title: 分类 - 目录树
date: 2026-05-22 02:36:00
type: categories
---

<style>
.categories-page { width: 100%; min-height: calc(100vh - 200px); padding: 40px 20px; }
.cat-desc { text-align: center; font-size: 14px; color: var(--sec-text); margin-bottom: 30px; }
.cat-tree { max-width: 600px; margin: 0 auto; }
.cat-tree-item { border: 1px solid var(--border); border-radius: 8px; margin-bottom: 8px; background: var(--card-bg); overflow: hidden; transition: all 0.2s; }
.cat-tree-item:hover { border-color: var(--accent); }
.cat-tree-header { padding: 14px 20px; display: flex; align-items: center; gap: 12px; cursor: pointer; font-size: 15px; font-weight: 600; }
.cat-tree-icon { font-size: 20px; }
.cat-tree-name { flex: 1; }
.cat-tree-count { font-size: 12px; background: var(--btn-bg); color: #fff; padding: 2px 8px; border-radius: 10px; }
.cat-tree-content { display: none; padding: 0 20px 14px 52px; font-size: 13px; color: var(--sec-text); }
.cat-tree-item.open .cat-tree-content { display: block; }
.cat-tree-item.open .cat-tree-arrow { transform: rotate(90deg); }
.cat-tree-arrow { transition: transform 0.2s; font-size: 12px; color: var(--sec-text); }
</style>

<div class="categories-page">
  <p class="cat-desc">📂 目录树样式</p>
  <div class="cat-tree" id="cat-tree"></div>
</div>

<script>
const CATEGORIES_DATA = [{ name: '测试', count: 1, icon: '📁' }];
function renderTree() {
  const el = document.getElementById('cat-tree');
  el.innerHTML = CATEGORIES_DATA.map(c => `
    <div class="cat-tree-item">
      <div class="cat-tree-header" onclick="this.parentElement.classList.toggle('open')">
        <span class="cat-tree-arrow">▶</span>
        <span class="cat-tree-icon">${c.icon}</span>
        <span class="cat-tree-name">${c.name}</span>
        <span class="cat-tree-count">${c.count}</span>
      </div>
      <div class="cat-tree-content">点击分类名前往 → <a href="/categories/${c.name}/" style="color:var(--accent)">/categories/${c.name}/</a></div>
    </div>
  `).join('');
}
renderTree();
</script>