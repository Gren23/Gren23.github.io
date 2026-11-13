---
title: 友链
date: 2026-05-20 09:00:00
comments: false
---

{% raw %}
<div class="link-page" id="linkPage">

  <!-- ========== 顶部信息 ========== -->
  <div class="lp-head">
    <div class="lp-head-label">// FRIEND_LINKS //</div>
    <p class="lp-head-desc">交换链接，携手共进。这里记录着我常读的博客与技术同好。</p>
    <div class="lp-head-stats">
      <span class="lp-stat"><b id="linkCount">0</b> 位友邻</span>
      <span class="lp-stat"><b id="linkGroupCount">0</b> 个分组</span>
      <span class="lp-stat lp-stat--muted" id="linkStatus">加载中…</span>
    </div>
  </div>

  <!-- ========== 友链网格 ========== -->
  <div class="lp-grid" id="linkGrid"></div>

  <!-- ========== 空状态 ========== -->
  <div class="lp-empty" id="linkEmpty" hidden>
    <div class="lp-empty-icon">🤝</div>
    <div class="lp-empty-title">还没有友链</div>
    <div class="lp-empty-desc">
      这个位置留给你交换的第一个友邻。<br>
      下拉查看申请方式，随时欢迎。
    </div>
  </div>

  <!-- ========== 申请区 ========== -->
  <div class="lp-apply">
    <div class="lp-section-label">// APPLY_FOR_LINK //</div>

    <div class="lp-apply-cards">

      <!-- 通道 1：GitHub Issue -->
      <a class="lp-apply-card" id="applyGithub" href="#" target="_blank" rel="noopener">
        <div class="lp-apply-icon">
          <svg viewBox="0 0 16 16" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </div>
        <div class="lp-apply-body">
          <div class="lp-apply-name">GitHub Issue</div>
          <div class="lp-apply-desc">推荐 · 打开预填表单，提交即成工单</div>
        </div>
        <div class="lp-apply-arrow">→</div>
      </a>

      <!-- 通道 2：邮件 -->
      <a class="lp-apply-card" id="applyEmail" href="#">
        <div class="lp-apply-icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m2 7 10 6 10-6"/>
          </svg>
        </div>
        <div class="lp-apply-body">
          <div class="lp-apply-name">邮件</div>
          <div class="lp-apply-desc">没有 GitHub 账号时用这个</div>
        </div>
        <div class="lp-apply-arrow">→</div>
      </a>

      <!-- 通道 3：复制模板 -->
      <button class="lp-apply-card" id="applyCopy" type="button">
        <div class="lp-apply-icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="12" height="12" rx="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </div>
        <div class="lp-apply-body">
          <div class="lp-apply-name">复制申请模板</div>
          <div class="lp-apply-desc">复制后发到留言板或任意联系方式</div>
        </div>
        <div class="lp-apply-arrow">→</div>
      </button>

    </div>

    <!-- 申请要求 -->
    <div class="lp-req">
      <div class="lp-req-head">申请前请确认</div>
      <ul class="lp-req-list">
        <li>站点可正常访问，已稳定运行 <b>3 个月</b>以上</li>
        <li>内容以<b>原创</b>技术、生活记录为主，无违规内容</li>
        <li>已在你的站点添加本站友链</li>
        <li>本站信息见下方，可直接复制</li>
      </ul>
      <div class="lp-selfinfo">
        <div class="lp-selfinfo-row"><span>名称</span><code>G/ren的小破站</code></div>
        <div class="lp-selfinfo-row"><span>地址</span><code>https://www.hehehey.top/</code></div>
        <div class="lp-selfinfo-row"><span>图标</span><code>https://www.hehehey.top/img/头像.JPG</code></div>
        <div class="lp-selfinfo-row"><span>描述</span><code>机器视觉调试工程师 | 技术分享</code></div>
      </div>
      <button class="lp-selfinfo-copy" id="copySelfInfo" type="button">复制本站信息</button>
    </div>

    <!-- 反馈提示 -->
    <div class="lp-toast" id="linkToast" role="status" aria-live="polite"></div>
  </div>

</div>

<style>
/* ============================================================
   友链页 · 对齐全站视觉语言（分类页/首页卡片同款）
   16px 圆角 / 1px 边框 / 冷蓝高亮 / 等宽字体技术标签
   ============================================================ */

.link-page { width: 100%; padding: 4px 2px; box-sizing: border-box; }

/* ---------- 顶部 ---------- */
.lp-head { margin-bottom: 28px; }

.lp-head-label {
  font-family: var(--c-font-mono);
  font-size: 15px;
  color: #64748b;
  letter-spacing: 1px;
  margin-bottom: 12px;
}
.lp-head-desc {
  font-size: 14px;
  color: var(--c-text-secondary, #6B7280);
  line-height: 1.7;
  margin: 0 0 16px;
}
.lp-head-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
.lp-stat {
  font-family: var(--c-font-mono);
  font-size: 12px;
  color: var(--c-primary, #1677B3);
  background: rgba(var(--c-primary-rgb, 22,119,179), 0.06);
  border: 1px solid rgba(var(--c-primary-rgb, 22,119,179), 0.12);
  border-radius: 10px;
  padding: 3px 10px;
}
.lp-stat b { font-weight: 700; }
.lp-stat--muted {
  color: var(--c-text-secondary, #6B7280);
  background: transparent;
  border-color: transparent;
  padding-left: 2px;
}

/* ---------- 友链网格 ---------- */
.lp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
}

.lp-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  padding: 18px;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.35s ease,
              box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.lp-card:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: rgba(59, 130, 246, 0.45);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.08);
}

/* 悬停箭头 */
.lp-card-arrow {
  position: absolute;
  right: 14px;
  top: 14px;
  font-size: 13px;
  color: var(--c-primary, #1677B3);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.25s ease, transform 0.25s ease;
  pointer-events: none;
}
.lp-card:hover .lp-card-arrow { opacity: 0.8; transform: translateX(0); }

/* 头像 */
.lp-avatar {
  flex: 0 0 46px;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  object-fit: cover;
  background: rgba(var(--c-primary-rgb, 22,119,179), 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  font-weight: 700;
  color: var(--c-primary, #1677B3);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}
.lp-card:hover .lp-avatar { transform: scale(1.06); }
img.lp-avatar { display: block; }

/* 文字区 */
.lp-card-main { flex: 1; min-width: 0; }
.lp-card-name {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lp-card-desc {
  font-size: 12.5px;
  color: #64748b;
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 8px;
  min-height: 2.6em;
}
.lp-card-host {
  font-family: var(--c-font-mono);
  font-size: 10.5px;
  color: var(--c-primary, #1677B3);
  opacity: 0.65;
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ---------- 空状态 ---------- */
.lp-empty {
  background: rgba(255, 255, 255, 0.9);
  border: 1px dashed rgba(226, 232, 240, 1);
  border-radius: 16px;
  padding: 44px 24px;
  text-align: center;
  margin-bottom: 40px;
}
.lp-empty-icon { font-size: 2.4rem; margin-bottom: 14px; }
.lp-empty-title { font-size: 15px; font-weight: 700; color: #1e293b; margin-bottom: 8px; }
.lp-empty-desc { font-size: 13px; color: #64748b; line-height: 1.7; }

/* ---------- 申请区 ---------- */
.lp-apply { margin-top: 8px; }

.lp-section-label {
  font-family: var(--c-font-mono);
  font-size: 15px;
  color: #64748b;
  letter-spacing: 1px;
  margin-bottom: 18px;
}

.lp-apply-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 14px;
  margin-bottom: 28px;
}

.lp-apply-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  padding: 16px 18px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.35s ease,
              box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.lp-apply-card:hover {
  transform: translateY(-3px);
  border-color: rgba(59, 130, 246, 0.45);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.08);
}

.lp-apply-icon {
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--c-primary-rgb, 22,119,179), 0.08);
  color: var(--c-primary, #1677B3);
}
.lp-apply-body { flex: 1; min-width: 0; }
.lp-apply-name { font-size: 14px; font-weight: 700; color: #1e293b; margin-bottom: 3px; }
.lp-apply-desc { font-size: 11.5px; color: #64748b; line-height: 1.5; }
.lp-apply-arrow {
  color: var(--c-primary, #1677B3);
  font-size: 13px;
  opacity: 0;
  transform: translateX(-5px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.lp-apply-card:hover .lp-apply-arrow { opacity: 0.8; transform: translateX(0); }

/* ---------- 申请要求 ---------- */
.lp-req {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  padding: 24px;
}
.lp-req-head {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.lp-req-head::before {
  content: '';
  width: 3px;
  height: 14px;
  border-radius: 2px;
  background: var(--c-primary, #1677B3);
}
.lp-req-list {
  margin: 0 0 20px;
  padding-left: 18px;
  font-size: 13px;
  color: #64748b;
  line-height: 1.9;
}
.lp-req-list b { color: var(--c-primary, #1677B3); font-weight: 600; }

.lp-selfinfo {
  background: rgba(var(--c-primary-rgb, 22,119,179), 0.03);
  border: 1px solid rgba(var(--c-primary-rgb, 22,119,179), 0.1);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 14px;
}
.lp-selfinfo-row {
  display: flex;
  gap: 12px;
  font-size: 12.5px;
  padding: 5px 0;
  align-items: baseline;
}
.lp-selfinfo-row > span {
  flex: 0 0 42px;
  color: #64748b;
  font-size: 12px;
}
.lp-selfinfo-row > code {
  font-family: var(--c-font-mono);
  font-size: 12px;
  color: var(--c-primary, #1677B3);
  word-break: break-all;
  background: transparent;
  padding: 0;
}

.lp-selfinfo-copy {
  font: inherit;
  font-size: 12.5px;
  font-family: var(--c-font-mono);
  color: var(--c-primary, #1677B3);
  background: rgba(var(--c-primary-rgb, 22,119,179), 0.06);
  border: 1px solid rgba(var(--c-primary-rgb, 22,119,179), 0.18);
  border-radius: 10px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease;
}
.lp-selfinfo-copy:hover {
  background: rgba(var(--c-primary-rgb, 22,119,179), 0.12);
  border-color: rgba(var(--c-primary-rgb, 22,119,179), 0.35);
}

/* ---------- Toast ---------- */
.lp-toast {
  margin-top: 16px;
  font-size: 13px;
  color: var(--c-primary, #1677B3);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  text-align: center;
  min-height: 20px;
}
.lp-toast.is-on { opacity: 1; transform: translateY(0); }

/* ---------- 深色模式 ---------- */
html[data-theme='dark'] .lp-head-label,
html[data-theme='dark'] .lp-section-label { color: #8b9db5; }
html[data-theme='dark'] .lp-head-desc,
html[data-theme='dark'] .lp-card-desc,
html[data-theme='dark'] .lp-empty-desc,
html[data-theme='dark'] .lp-req-list,
html[data-theme='dark'] .lp-apply-desc,
html[data-theme='dark'] .lp-selfinfo-row > span { color: #8b9db5; }

html[data-theme='dark'] .lp-card,
html[data-theme='dark'] .lp-apply-card,
html[data-theme='dark'] .lp-req,
html[data-theme='dark'] .lp-empty {
  background: rgba(15, 23, 42, 0.5);
  border-color: rgba(255, 255, 255, 0.06);
}
html[data-theme='dark'] .lp-empty { border-style: dashed; }

html[data-theme='dark'] .lp-card-name,
html[data-theme='dark'] .lp-apply-name,
html[data-theme='dark'] .lp-req-head,
html[data-theme='dark'] .lp-empty-title { color: #e8eef4; }

html[data-theme='dark'] .lp-card:hover,
html[data-theme='dark'] .lp-apply-card:hover {
  border-color: rgba(100, 181, 246, 0.35);
  box-shadow: 0 8px 24px rgba(100, 181, 246, 0.1);
}

html[data-theme='dark'] .lp-avatar {
  background: rgba(100, 181, 246, 0.12);
  color: #64b5f6;
}

html[data-theme='dark'] .lp-stat {
  color: #64b5f6;
  background: rgba(100, 181, 246, 0.08);
  border-color: rgba(100, 181, 246, 0.16);
}
html[data-theme='dark'] .lp-stat--muted { color: #8b9db5; background: transparent; border-color: transparent; }

html[data-theme='dark'] .lp-apply-icon {
  background: rgba(100, 181, 246, 0.12);
  color: #64b5f6;
}
html[data-theme='dark'] .lp-card-arrow,
html[data-theme='dark'] .lp-apply-arrow,
html[data-theme='dark'] .lp-card-host { color: #64b5f6; }

html[data-theme='dark'] .lp-selfinfo {
  background: rgba(100, 181, 246, 0.05);
  border-color: rgba(100, 181, 246, 0.12);
}
html[data-theme='dark'] .lp-selfinfo-row > code { color: #90caf9; }
html[data-theme='dark'] .lp-selfinfo-copy,
html[data-theme='dark'] .lp-toast {
  color: #64b5f6;
  background: rgba(100, 181, 246, 0.08);
  border-color: rgba(100, 181, 246, 0.2);
}

/* ---------- 移动端 ---------- */
@media (max-width: 640px) {
  .lp-grid { grid-template-columns: 1fr; gap: 12px; }
  .lp-apply-cards { grid-template-columns: 1fr; }
  .lp-req { padding: 18px; }
  .lp-selfinfo-row { flex-direction: column; gap: 2px; }
  .lp-selfinfo-row > span { flex: none; }
}
</style>

<script>
(function () {
  'use strict';

  // ===== 博客基本信息（申请模板用）=====
  var SITE = {
    name: 'G/ren的小破站',
    url: 'https://www.hehehey.top/',
    avatar: 'https://www.hehehey.top/img/头像.JPG',
    desc: '机器视觉调试工程师 | 技术分享',
    email: '1955561070@qq.com',
    issueRepo: 'Gren23/Gren23.github.io'
  };

  var $ = function (id) { return document.getElementById(id); };

  // ===== 转义 =====
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // 只放行 http(s) 和站内相对路径
  function safeUrl(u) {
    var s = String(u == null ? '' : u).trim();
    if (!s || s === '#') return '';
    if (/^(https?:)?\/\//i.test(s)) return s;
    if (/^\/[^\/]/.test(s)) return s;
    return '';
  }

  function hostOf(u) {
    try {
      var s = String(u || '').trim();
      if (!s) return '';
      if (!/^https?:\/\//i.test(s)) s = 'https://' + s.replace(/^\/\//, '');
      return new URL(s).hostname.replace(/^www\./, '');
    } catch (e) { return ''; }
  }

  // ===== 卡片 =====
  function buildCard(item) {
    var name = String(item.name == null ? '' : item.name);
    var desc = String(item.descr == null ? '' : item.descr);
    var link = safeUrl(item.link);
    var avatar = safeUrl(item.avatar);
    var host = hostOf(link);

    var avatarHtml = avatar
      ? '<img class="lp-avatar no-lightbox" src="' + esc(avatar) + '" alt="' + esc(name) +
        '" loading="lazy" decoding="async" onerror="this.outerHTML=\'&lt;div class=&quot;lp-avatar&quot;&gt;' +
        esc((name || '?').charAt(0)) + '&lt;/div&gt;\'">'
      : '<div class="lp-avatar">' + esc((name || '?').charAt(0)) + '</div>';

    var inner =
      '<div class="lp-card-arrow">→</div>' +
      avatarHtml +
      '<div class="lp-card-main">' +
        '<div class="lp-card-name">' + esc(name) + '</div>' +
        '<div class="lp-card-desc">' + esc(desc) + '</div>' +
        (host ? '<div class="lp-card-host">' + esc(host) + '</div>' : '') +
      '</div>';

    if (link) {
      return '<a class="lp-card" href="' + esc(link) + '" target="_blank" rel="noopener noreferrer">' + inner + '</a>';
    }
    return '<div class="lp-card">' + inner + '</div>';
  }

  // ===== 渲染 =====
  function render(links) {
    var grid = $('linkGrid');
    var empty = $('linkEmpty');
    if (!grid) return;

    var list = Array.isArray(links) ? links.filter(function (x) {
      return x && String(x.name || '').trim() && String(x.name).indexOf('待添加') === -1;
    }) : [];

    if (!list.length) {
      grid.innerHTML = '';
      if (empty) empty.hidden = false;
      setStats(0, 0, '暂无友链');
      return;
    }

    if (empty) empty.hidden = true;
    grid.innerHTML = list.map(buildCard).join('');

    var groups = {};
    list.forEach(function (x) { if (x.group) groups[x.group] = 1; });
    setStats(list.length, Object.keys(groups).length, '已收录');
  }

  function setStats(n, g, status) {
    if ($('linkCount')) $('linkCount').textContent = n;
    if ($('linkGroupCount')) $('linkGroupCount').textContent = g;
    if (status && $('linkStatus')) $('linkStatus').textContent = status;
  }

  // ===== Toast =====
  var toastTimer = null;
  function toast(msg) {
    var el = $('linkToast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-on'); }, 2600);
  }

  // ===== 申请模板 =====
  // 只保留待填字段。本站信息由页面下方的「复制本站信息」按钮单独提供，
  // 不塞进模板，避免申请人复制一堆自己用不上的内容。
  function applyTemplate() {
    return [
      '【友链申请】',
      '',
      '网站名称：',
      '网站地址：',
      '头像 URL：',
      '网站描述：'
    ].join('\n');
  }

  // ===== 绑定申请通道 =====
  function bindApply() {
    // 1) GitHub Issue（预填标题和正文）
    var gh = $('applyGithub');
    if (gh) {
      var title = encodeURIComponent('【友链申请】');
      var body = encodeURIComponent(applyTemplate());
      gh.href = 'https://github.com/' + SITE.issueRepo +
        '/issues/new?title=' + title + '&body=' + body + '&labels=friend-link';
    }

    // 2) 邮件
    var mail = $('applyEmail');
    if (mail) {
      mail.href = 'mailto:' + SITE.email +
        '?subject=' + encodeURIComponent('友链申请') +
        '&body=' + encodeURIComponent(applyTemplate());
    }

    // 3) 复制模板 + 跳转信箱页 + 自动填入
    //    跳转前把模板存进 sessionStorage，信箱页读出来后塞进 Twikoo 输入框。
    //    因为跳转会丢失剪贴板以外的状态，sessionStorage 是同源同标签页内最轻的传递方式。
    var copyBtn = $('applyCopy');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var text = applyTemplate();
        var go = function () {
          try { sessionStorage.setItem('linkApplyTemplate', text); } catch (e) { /* 隐私模式可能失败 */ }
          toast('模板已复制，正在前往信箱页…');
          setTimeout(function () {
            window.location.href = '/message/#msg-write';
          }, 520);
        };
        copyText(text, '申请模板已复制', go);
      });
    }

    // 4) 复制本站信息
    var copySelf = $('copySelfInfo');
    if (copySelf) {
      copySelf.addEventListener('click', function () {
        var txt = [
          '名称：' + SITE.name,
          '地址：' + SITE.url,
          '图标：' + SITE.avatar,
          '描述：' + SITE.desc
        ].join('\n');
        copyText(txt, '本站信息已复制');
      });
    }
  }

  // 复制文本。onDone 无论复制成功与否都会执行（没复制成功也让用户能继续跳转）
  function copyText(text, okMsg, onDone) {
    function done(ok) {
      toast(ok ? okMsg : '复制失败，但模板已带过去，可直接在输入框里取用');
      if (typeof onDone === 'function') onDone(ok);
    }

    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;left:-9999px;top:0;';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      done(ok);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }).catch(fallback);
    } else {
      fallback();
    }
  }

  // ===== 数据加载 =====
  // 只读构建期生成的静态快照 /data/links.json。
  // 原 link.hehey.top 后端已下线，相关远程逻辑全部移除。
  function load() {
    bindApply();

    fetch('/data/links.json', { credentials: 'same-origin' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) { render(data); })
      .catch(function () {
        render([]);
        setStats(0, 0, '数据加载失败');
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
</script>
{% endraw %}
