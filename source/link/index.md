---
title: 友链申请
date: 2026-05-20 09:00:00
type: "link"
---

## 🔗 友链

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
// ========== 友链动态加载 (link-server API) ==========
// API 地址：通过 Cloudflare Tunnel 暴露
window.__LINK_API_BASE__ = window.__LINK_API_BASE__ || "https://link.hehey.top";

const API_LINKS = window.__LINK_API_BASE__ + "/api/links";

// 属性/文本统一转义（原来只转义 < >，双引号能直接逃出属性，属于 DOM XSS）
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// 只放行 http(s) 和站内相对路径，挡住 javascript:/data: 协议
function safeUrl(u) {
  const s = String(u == null ? "" : u).trim();
  if (!s || s === "#") return "";
  if (/^(https?:)?\/\//i.test(s)) return s;
  if (/^\/[^\/]/.test(s)) return s;
  return "";
}

// 构造一张友链卡片
function buildCard(item) {
  const name = esc(item.name);
  const rawName = String(item.name == null ? "" : item.name);
  const desc = esc(item.descr);
  const avatarUrl = safeUrl(item.avatar);

  const avatar = avatarUrl
    ? `<img class="friend-avatar no-lightbox" src="${esc(avatarUrl)}" alt="${name}" loading="lazy" decoding="async" onerror="this.outerHTML='&lt;div class=&quot;friend-avatar&quot;&gt;'+(this.alt||'?').charAt(0)+'&lt;/div&gt;'">`
    : `<div class="friend-avatar">${esc(rawName.charAt(0))}</div>`;

  return `<div class="friend-card" data-name="${name}">
    <div class="friend-active-dot" data-tip="近期活跃"></div>
    <div class="friend-arrow">&#8594;</div>
    ${avatar}
    <div class="friend-name">${name}</div>
    <div class="friend-desc">${desc}</div>
  </div>`;
}

// 渲染友链列表
function renderLinks(links) {
  const grid = document.querySelector(".friend-grid");
  if (!grid) return;

  if (!links || links.length === 0) {
    const empty = document.getElementById("link-empty");
    if (empty) empty.style.display = "block";
    return;
  }

  grid.innerHTML = links.map(buildCard).join("");

  // 随机高亮一张（今日推荐）
  const allCards = grid.querySelectorAll(".friend-card");
  if (allCards.length > 0) {
    const idx = Math.floor(Math.random() * allCards.length);
    allCards[idx].classList.add("featured");
  }

  // 活跃光点（手动维护名单）
  const activeFriends = window.__ACTIVE_FRIENDS__ || [];
  allCards.forEach(card => {
    const n = card.dataset.name;
    if (activeFriends.includes(n)) card.classList.add("has-active");
  });

  const empty = document.getElementById("link-empty");
  if (empty) empty.style.display = "none";
}

// 从 API 加载友链
// link.hehey.top 目前返回 502（后端已挂），这里改成两段式：
//   1) 先读构建期生成的 /data/links.json（_data/link.yml 的静态快照），几乎 0 延迟；
//   2) 再尝试远程 API，成功则覆盖渲染，失败则安静保留静态列表，不留空窗。
async function loadRemoteLinks() {
  try {
    const res = await fetch(API_LINKS, {
      signal: AbortSignal.timeout(4000),
      cache: "no-store"
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const json = await res.json();
    if (json.code === 200 && Array.isArray(json.data) && json.data.length) {
      renderLinks(json.data);
    }
  } catch (err) {
    console.warn("[link-server] remote fetch failed, kept static list:", err.message);
  }
}

async function loadLinks() {
  try {
    const res = await fetch("/data/links.json", { credentials: "same-origin" });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length) renderLinks(data);
    }
  } catch (e) { /* 快照不存在则直接走远程 */ }

  loadRemoteLinks();
}

// 活跃名单配置（友链名称放这里即为"活跃"）
window.__ACTIVE_FRIENDS__ = [];

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadLinks);
} else {
  loadLinks();
}
</script>