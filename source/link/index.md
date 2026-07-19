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

<!-- 友链申请入口 -->
<div style="text-align:center; margin: 28px 0 20px;">
  <button id="open-apply-form" style="
    background: linear-gradient(135deg, oklch(0.65 0.18 260), oklch(0.55 0.20 280));
    color: #fff; border: none; padding: 12px 32px; border-radius: 2rem;
    font-size: 0.95rem; font-weight: 600; cursor: pointer;
    box-shadow: 0 4px 14px oklch(0.55 0.20 280 / 0.35);
    transition: transform 0.2s, box-shadow 0.2s;
  " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px oklch(0.55 0.20 280 / 0.45)'"
     " onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 14px oklch(0.55 0.20 280 / 0.35)'">
    &#x1F4E4; 申请交换友链
  </button>
</div>

<!-- 申请表单模态框 -->
<div id="apply-modal" style="
  display:none; position:fixed; inset:0; z-index:9999;
  background:rgba(0,0,0,0.5); backdrop-filter:blur(4px);
  align-items:center; justify-content:center;
" onclick="if(event.target===this)closeApplyModal()">
  <div style="
    background:var(--card-bg,#fff); border-radius:1.2rem; padding:32px;
    width:min(520px,92vw); max-height:90vh; overflow-y:auto;
    box-shadow:0 24px 60px rgba(0,0,0,0.25);
    position:relative;
  ">
    <button onclick="closeApplyModal()" style="
      position:absolute; top:16px; right:16px; background:none; border:none;
      font-size:1.4rem; cursor:pointer; opacity:0.5; line-height:1;
    ">&#x2715;</button>

    <h3 style="margin:0 0 6px; font-size:1.15rem;">&#x1F4E4; 申请交换友链</h3>
    <p style="margin:0 0 20px; opacity:0.55; font-size:0.82rem;">填写以下信息，我会尽快审核并添加</p>

    <form id="apply-form" onsubmit="submitApply(event)">
      <div style="display:flex; flex-direction:column; gap:14px;">

        <label style="font-size:0.85rem; font-weight:600; margin-bottom:4px;">
          网站名称 <span style="color:#e05050">*</span>
        </label>
        <input name="site_name" required placeholder="如：鹿话博客"
          style="width:100%; padding:10px 14px; border-radius:0.7rem;
                 border:1.5px solid var(--border); font-size:0.9rem;
                 background:var(--secondary); color:var(--primary);
                 box-sizing:border-box; outline:none;
                 transition:border-color 0.2s;"
          onfocus="this.style.borderColor='oklch(0.65 0.18 260)'"
          onblur="this.style.borderColor='var(--border)'" />

        <label style="font-size:0.85rem; font-weight:600; margin-bottom:4px;">
          网站地址 <span style="color:#e05050">*</span>
        </label>
        <input name="site_url" type="url" required placeholder="https://your-blog.com"
          style="width:100%; padding:10px 14px; border-radius:0.7rem;
                 border:1.5px solid var(--border); font-size:0.9rem;
                 background:var(--secondary); color:var(--primary);
                 box-sizing:border-box; outline:none;
                 transition:border-color 0.2s;"
          onfocus="this.style.borderColor='oklch(0.65 0.18 260)'"
          onblur="this.style.borderColor='var(--border)'" />

        <label style="font-size:0.85rem; font-weight:600; margin-bottom:4px;">
          头像 URL <span style="color:#e05050">*</span>
        </label>
        <input name="site_avatar" type="url" required placeholder="https://your-blog.com/avatar.png"
          style="width:100%; padding:10px 14px; border-radius:0.7rem;
                 border:1.5px solid var(--border); font-size:0.9rem;
                 background:var(--secondary); color:var(--primary);
                 box-sizing:border-box; outline:none;
                 transition:border-color 0.2s;"
          onfocus="this.style.borderColor='oklch(0.65 0.18 260)'"
          onblur="this.style.borderColor='var(--border)'" />

        <label style="font-size:0.85rem; font-weight:600; margin-bottom:4px;">
          网站简介 <span style="color:#e05050">*</span>
        </label>
        <textarea name="site_intro" required placeholder="简单介绍一下你的博客（10-100字）"
          rows="3"
          style="width:100%; padding:10px 14px; border-radius:0.7rem;
                 border:1.5px solid var(--border); font-size:0.9rem;
                 background:var(--secondary); color:var(--primary);
                 box-sizing:border-box; outline:none; resize:vertical;
                 transition:border-color 0.2s; font-family:inherit;"
          onfocus="this.style.borderColor='oklch(0.65 0.18 260)'"
          onblur="this.style.borderColor='var(--border)'"></textarea>

        <label style="font-size:0.85rem; font-weight:600; margin-bottom:4px;">
          分组（可选）
        </label>
        <input name="group" placeholder="默认分组"
          style="width:100%; padding:10px 14px; border-radius:0.7rem;
                 border:1.5px solid var(--border); font-size:0.9rem;
                 background:var(--secondary); color:var(--primary);
                 box-sizing:border-box; outline:none;
                 transition:border-color 0.2s;"
          onfocus="this.style.borderColor='oklch(0.65 0.18 260)'"
          onblur="this.style.borderColor='var(--border)'" />

      </div>

      <div id="apply-msg" style="margin-top:14px; display:none; border-radius:0.7rem;
           padding:10px 14px; font-size:0.85rem; text-align:center;"></div>

      <button type="submit" id="apply-submit" style="
        margin-top:20px; width:100%; padding:12px; border-radius:2rem;
        background:linear-gradient(135deg, oklch(0.65 0.18 260), oklch(0.55 0.20 280));
        color:#fff; border:none; font-size:0.95rem; font-weight:600;
        cursor:pointer; box-shadow:0 4px 14px oklch(0.55 0.20 280 / 0.35);
        transition:transform 0.2s, box-shadow 0.2s;
      " onmouseover="this.style.transform='translateY(-2px)'"
         onmouseout="this.style.transform='translateY(0)'">
        &#x2709; 提交申请
      </button>
    </form>
  </div>
</div>

<script>
function openApplyModal() {
  document.getElementById('apply-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeApplyModal() {
  document.getElementById('apply-modal').style.display = 'none';
  document.body.style.overflow = '';
}

document.getElementById('open-apply-form').addEventListener('click', openApplyModal);

// 表单提交
async function submitApply(e) {
  e.preventDefault();
  var fd   = new FormData(e.target);
  var msg  = document.getElementById('apply-msg');
  var btn  = document.getElementById('apply-submit');
  msg.style.display = 'none';
  btn.disabled = true;
  btn.textContent = '提交中...';

  try {
    var res = await fetch(window.__LINK_API_BASE__ + '/api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        site_name:   fd.get('site_name'),
        site_url:    fd.get('site_url'),
        site_avatar: fd.get('site_avatar'),
        site_intro:  fd.get('site_intro'),
        group:       fd.get('group') || '默认分组',
      }),
    });
    var json = await res.json();
    if (json.code === 200) {
      msg.style.display = 'block';
      msg.style.background = 'oklch(0.70 0.18 145 / 0.15)';
      msg.style.color = 'oklch(0.55 0.15 145)';
      msg.textContent = '✓ 提交成功！网站名称「' + fd.get('site_name') + '」已加入友链列表，刷新页面可见。';
      e.target.reset();
      setTimeout(closeApplyModal, 2500);
    } else {
      throw new Error(json.detail || '提交失败');
    }
  } catch(err) {
    msg.style.display = 'block';
    msg.style.background = 'oklch(0.60 0.20 25 / 0.12)';
    msg.style.color = '#e05050';
    msg.textContent = '提交失败：' + err.message;
  } finally {
    btn.disabled = false;
    btn.textContent = '✉ 提交申请';
  }
}
</script>


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
// API 地址：通过 Cloudflare Tunnel 暴露，部署后把 link.hehehey.top 改成你的 tunnel 域名
window.__LINK_API_BASE__ = window.__LINK_API_BASE__ || "https://link.hehehey.top";

const API_LINKS = window.__LINK_API_BASE__ + "/api/links";

// 构造一张友链卡片
function buildCard(item) {
  const escape = s => String(s||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const name = escape(item.name);
  const desc = escape(item.descr);
  const avatar = item.avatar && item.avatar !== "#"
    ? `<img class="friend-avatar no-lightbox" src="${item.avatar}" alt="${name}" onerror="this.outerHTML='<div class=\'friend-avatar\'>'+(this.alt||'?').charAt(0)+'</div>'">`
    : `<div class="friend-avatar">${name.charAt(0)}</div>`;

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
async function loadLinks() {
  try {
    const res = await fetch(API_LINKS, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const json = await res.json();
    if (json.code === 200 && json.data) {
      renderLinks(json.data);
    }
  } catch (err) {
    console.warn("[link-server] fetch failed:", err.message);
  }
}

// 活跃名单配置（友链名称放这里即为"活跃"）
window.__ACTIVE_FRIENDS__ = [];

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadLinks);
} else {
  loadLinks();
}
</script>