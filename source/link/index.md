---
title: 友链申请
date: 2026-05-20 09:00:00
type: "link"
---

# 🔗 友链

> 交换链接，携手共进

## 📝 申请格式

请在 [留言板](/message/) 提供以下信息：

<style>
.info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 20px 0; }
.info-item { background: var(--card-bg); border: 1px solid var(--border); border-radius: 0.625rem; padding: 14px 16px; display: flex; align-items: center; gap: 12px; box-shadow: 0 1px 2px oklch(0 0 0 / 0.05); transition: transform 200ms ease, box-shadow 200ms ease; }
.info-item:hover { transform: translateY(-2px); box-shadow: 0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1); }
.info-icon { font-size: 20px; }
.info-content { flex: 1; }
.info-label { font-size: 12px; opacity: 0.6; margin-bottom: 2px; }
.info-value { font-size: 14px; font-weight: 500; }
</style>

<div class="info-grid">
  <div class="info-item">
    <span class="info-icon">🏷️</span>
    <div class="info-content">
      <div class="info-label">网站名称</div>
      <div class="info-value">你的网站名</div>
    </div>
  </div>
  <div class="info-item">
    <span class="info-icon">🔗</span>
    <div class="info-content">
      <div class="info-label">网站地址</div>
      <div class="info-value">https://your-site.com</div>
    </div>
  </div>
  <div class="info-item">
    <span class="info-icon">📝</span>
    <div class="info-content">
      <div class="info-label">网站描述</div>
      <div class="info-value">一句话简介</div>
    </div>
  </div>
  <div class="info-item">
    <span class="info-icon">🖼️</span>
    <div class="info-content">
      <div class="info-label">网站图标</div>
      <div class="info-value">头像URL</div>
    </div>
  </div>
</div>

## 🌟 我的友链

<p style="color: var(--secondary); opacity: 0.7; font-size: 0.9rem; margin-bottom: 20px;">这些是我常读的博客，他们值得被看见 ✨</p>

<style>
.friend-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 20px 0; }

/* 友链卡片 */
.friend-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 0.625rem;
  padding: 20px;
  text-align: center;
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
  box-shadow: 0 1px 2px oklch(0 0 0 / 0.05);
  position: relative;
  overflow: hidden;
}
.friend-card:hover { transform: translateY(-2px); box-shadow: 0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1); border-color: oklch(0.65 0.18 260); }
.friend-card:hover .friend-avatar { transform: scale(1.05); }
.friend-card:hover .friend-arrow { opacity: 1; transform: translateX(0); }

/* 活跃光点 */
.friend-active-dot {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 6px #22c55e;
  opacity: 0;
  transition: opacity 200ms ease;
}
.friend-card.has-active .friend-active-dot { opacity: 1; }
.friend-card.has-active:hover .friend-active-dot { display: none; }
.friend-active-dot::after {
  content: attr(data-tip);
  position: absolute;
  right: 14px;
  top: -2px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 0.7rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms ease;
  box-shadow: 0 2px 8px oklch(0 0 0 / 0.1);
}
.friend-card.has-active:hover .friend-active-dot::after { opacity: 1; }

/* 悬停箭头 */
.friend-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateX(6px) translateY(-50%);
  opacity: 0;
  transition: opacity 200ms ease, transform 200ms ease;
  color: oklch(0.65 0.18 260);
  font-size: 0.85rem;
  pointer-events: none;
}

/* 随机高亮（今日推荐） */
.friend-card.featured {
  border-color: oklch(0.65 0.18 260 / 0.4);
  box-shadow: 0 0 0 3px oklch(0.65 0.18 260 / 0.08), 0 1px 2px oklch(0 0 0 / 0.05);
}
.friend-card.featured::before {
  content: '今日推荐';
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  color: oklch(0.65 0.18 260);
  opacity: 0.7;
  font-weight: 600;
}

.friend-avatar { width: 60px; height: 60px; border-radius: 50%; margin-bottom: 12px; background: var(--border); display: flex; align-items: center; justify-content: center; font-size: 24px; object-fit: cover; transition: transform 200ms ease; }
.friend-name { font-weight: 600; margin-bottom: 4px; }
.friend-desc { font-size: 13px; opacity: 0.7; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* 申请入口按钮 */
.link-apply-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 50px;
  padding: 10px 24px;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-high);
  text-decoration: none;
  transition: all 200ms ease;
  box-shadow: 0 1px 2px oklch(0 0 0 / 0.05);
  margin-top: 8px;
}
.link-apply-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1);
  border-color: oklch(0.65 0.18 260);
  color: oklch(0.65 0.18 260);
}
</style>

<div class="friend-grid">
  <div class="friend-card has-active">
    <div class="friend-active-dot" data-tip="近期活跃"></div>
    <div class="friend-arrow">→</div>
    <div class="friend-avatar">🔗</div>
    <div class="friend-name">_(待添加)_</div>
    <div class="friend-desc">_(待添加)_</div>
  </div>
</div>

<!-- 空状态 -->
<div id="link-empty" style="display:none;">
  <div style="background: var(--card-bg); border: 1px solid var(--border); border-radius: 1rem; padding: 40px 24px; text-align: center; backdrop-filter: blur(12px); box-shadow: 0 4px 16px oklch(0 0 0 / 0.06); margin: 20px 0;">
    <div style="font-size: 2.5rem; margin-bottom: 14px;">🤝</div>
    <div style="font-weight: 600; font-size: 1.05rem; margin-bottom: 8px;">还没有友链</div>
    <div style="color: var(--secondary); opacity: 0.65; font-size: 0.88rem; line-height: 1.6; margin-bottom: 20px;">这个位置留给你交换的第一个友邻<br>快去留言板申请吧，这里等你回来</div>
    <a href="/message/" class="link-apply-btn">✉️ 加入这个友邻圈</a>
  </div>
</div>

<!-- 底部入口 -->
<div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px dashed var(--border);">
  <span style="font-size: 0.85rem; opacity: 0.5;">想成为友邻？</span>
  <a href="/message/" class="link-apply-btn" style="margin-left: 8px;">✉️ 加入这个友邻圈 →</a>
</div>

<script>
// 随机高亮一张卡片
const cards = document.querySelectorAll('.friend-card:not(#link-empty .friend-card)');
if (cards.length > 0) {
  const idx = Math.floor(Math.random() * cards.length);
  cards[idx].classList.add('featured');
}
// 活跃光点：手动维护数组（友链名称放这里即为"活跃"）
const activeFriends = []; // 例如：['博客名A', '博客名B']
cards.forEach(card => {
  const name = card.querySelector('.friend-name').textContent.trim();
  if (activeFriends.includes(name)) {
    card.classList.add('has-active');
  }
});
</script>