---
title: 给我留言
date: 2026-05-20 09:00:00
type: "message"
comments: true
---

<style>
/* 信箱页面便当盒风格 */
.message-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 32px 16px 80px;
  font-family: inherit;
}

/* 页面标题区 */
.msg-hero {
  text-align: center;
  padding: 20px 0 36px;
}
.msg-hero h1 {
  font-size: 1.9rem;
  font-weight: 700;
  margin: 0 0 8px;
  background: linear-gradient(135deg, var(--accent), #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.msg-hero p {
  color: var(--secondary);
  font-size: 0.95rem;
  margin: 0;
  opacity: 0.75;
}

/* 分割区 */
.msg-divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 36px 0;
  color: var(--border);
  opacity: 0.6;
  font-size: 0.85rem;
  letter-spacing: 0.15em;
}
.msg-divider::before,
.msg-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
  opacity: 0.5;
}

/* 毛玻璃便当盒卡片 */
.msg-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 28px 32px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  transition: box-shadow 0.3s ease;
}
.msg-card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

/* 联系卡片区 */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 14px;
  margin-bottom: 8px;
}
.contact-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px 16px;
  text-align: center;
  backdrop-filter: blur(8px);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
}
.contact-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}
.contact-icon { font-size: 26px; margin-bottom: 8px; }
.contact-title { font-weight: 600; font-size: 0.88rem; margin-bottom: 4px; color: var(--text-high); }
.contact-info { font-size: 0.78rem; opacity: 0.6; }

/* 分区标签 */
.msg-section-label {
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--secondary);
  opacity: 0.55;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.msg-section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
  opacity: 0.4;
}

/* 表单样式 */
.msg-form { display: flex; flex-direction: column; gap: 14px; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

.input-wrap { position: relative; }
.input-wrap input,
.msg-form textarea {
  width: 100%;
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 11px 14px;
  font-size: 0.9rem;
  color: var(--text-high);
  font-family: inherit;
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
  box-sizing: border-box;
  backdrop-filter: blur(6px);
}
.input-wrap input::placeholder,
.msg-form textarea::placeholder {
  color: var(--secondary);
  opacity: 0.45;
}
.input-wrap input:focus,
.msg-form textarea:focus {
  border-color: var(--accent);
  background: rgba(255,255,255,0.1);
  box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
}
.msg-form textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.7;
  /* 横格线效果 */
  background-image: repeating-linear-gradient(transparent, transparent 27px, var(--border) 27px, var(--border) 28px);
  background-position: 0 11px;
  background-size: 100% 28px;
  padding-top: 14px;
}

/* 提交按钮 */
.msg-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 12px 32px;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  align-self: flex-end;
  font-family: inherit;
  letter-spacing: 0.03em;
}
.msg-submit:hover {
  background: var(--theme-color);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 20px rgba(99,102,241,0.35);
}
.msg-submit:active { transform: translateY(0) scale(0.98); }

/* 留言列表 */
.msg-list { display: flex; flex-direction: column; gap: 14px; margin-top: 28px; }

.msg-item {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 20px 22px;
  backdrop-filter: blur(8px);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s;
  animation: msgSlideIn 0.4s cubic-bezier(0.34, 1.2, 0.64, 1) both;
}
.msg-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}
@keyframes msgSlideIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.msg-item-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.msg-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), #a78bfa);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  color: #fff;
  flex-shrink: 0;
}
.msg-avatar img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
.msg-meta { flex: 1; min-width: 0; }
.msg-nickname { font-weight: 600; font-size: 0.9rem; color: var(--text-high); }
.msg-time { font-size: 0.75rem; opacity: 0.45; color: var(--secondary); }

.msg-body {
  font-size: 0.9rem;
  line-height: 1.75;
  color: var(--text);
  white-space: pre-wrap;
  word-break: break-word;
}

.msg-item + .msg-item {
  border-top: 1px dashed var(--border);
  opacity: 0.85;
}

/* 子回复 */
.msg-children { margin-top: 14px; padding-left: 18px; border-left: 2px solid var(--border); opacity: 0.75; }
.msg-reply-btn {
  background: none;
  border: none;
  color: var(--secondary);
  font-size: 0.78rem;
  cursor: pointer;
  padding: 4px 0;
  opacity: 0.6;
  transition: opacity 0.2s, color 0.2s;
  font-family: inherit;
}
.msg-reply-btn:hover { opacity: 1; color: var(--accent); }

/* 空状态 */
.msg-empty {
  text-align: center;
  padding: 48px 20px;
  color: var(--secondary);
  opacity: 0.5;
}
.msg-empty-icon { font-size: 3rem; margin-bottom: 14px; display: block; }
.msg-empty p { font-size: 0.9rem; line-height: 1.7; margin: 0; }

/* 浮动回顶部 */
.msg-gotop {
  position: fixed;
  right: 28px;
  bottom: 32px;
  width: 42px;
  height: 42px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0;
  pointer-events: none;
}
.msg-gotop.visible { opacity: 1; pointer-events: auto; }
.msg-gotop:hover { transform: translateY(-3px); background: var(--accent); color: #fff; }

/* 响应式 */
@media (max-width: 600px) {
  .form-row { grid-template-columns: 1fr; }
  .msg-card { padding: 20px 18px; }
  .msg-hero h1 { font-size: 1.5rem; }
  .contact-grid { grid-template-columns: 1fr 1fr; }
}

/* ===== twikoo 美化：融入便当盒风格 ===== */
#post-comment {
  background: transparent;
  border: none;
  margin: 0;
  padding: 0;
  max-width: 700px;
  margin: 0 auto;
}
.comment-head {
  display: none; /* 标题区已用页面自带标题 */
}
.comment-wrap { background: transparent; border-radius: 0; padding: 0; }
#twikoo-wrap .tk-comments { margin-top: 0; }

/* 整体容器融入毛玻璃 */
#twikoo-wrap .tk-comments-container {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 24px 28px;
  backdrop-filter: blur(10px);
}

/* 评论区标题 */
#twikoo-wrap .tk-comments-title {
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--secondary);
  opacity: 0.5;
  border-bottom: 1px solid var(--border);
  padding-bottom: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}
#twikoo-wrap .tk-comments-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
  opacity: 0.4;
}

/* 单条评论卡片 */
#twikoo-wrap .tk-comment {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 16px 18px;
  margin-bottom: 14px;
  backdrop-filter: blur(8px);
  transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
  box-shadow: none;
}
#twikoo-wrap .tk-comment:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

/* 头像 */
#twikoo-wrap .tk-comment .tk-avatar {
  border-radius: 50%;
  border: 2px solid rgba(99,102,241,0.3);
  width: 36px;
  height: 36px;
}
#twikoo-wrap .tk-comment .tk-avatar img { border-radius: 50%; }

/* 昵称 */
#twikoo-wrap .tk-comment .tk-nick {
  color: var(--text-high);
  font-weight: 600;
  font-size: 0.88rem;
}

/* 时间 */
#twikoo-wrap .tk-comment .tk-time {
  color: var(--secondary);
  opacity: 0.45;
  font-size: 0.73rem;
}

/* 评论内容 */
#twikoo-wrap .tk-comment .tk-content {
  color: var(--text);
  font-size: 0.9rem;
  line-height: 1.75;
}
#twikoo-wrap .tk-comment .tk-content p { margin: 4px 0; }

/* 嵌套回复 */
#twikoo-wrap .tk-comment .tk-replies { margin-top: 10px; }
#twikoo-wrap .tk-comment .tk-reply { margin-top: 10px; }
#twikoo-wrap .tk-comment .tk-replies .tk-comment {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.04);
}

/* ===== 输入框区域 ===== */
#twikoo-wrap .tk-input {
  background: rgba(255,255,255,0.06) !important;
  border: 1px solid var(--border) !important;
  border-radius: 10px !important;
  padding: 10px 14px !important;
  color: var(--text-high) !important;
  font-family: inherit !important;
  font-size: 0.9rem !important;
  backdrop-filter: blur(6px);
  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
  outline: none;
  box-shadow: none !important;
}
#twikoo-wrap .tk-input:focus {
  border-color: var(--accent) !important;
  background: rgba(255,255,255,0.09) !important;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.12) !important;
}
#twikoo-wrap .tk-input::placeholder { color: var(--secondary); opacity: 0.45; }

/* 文本框（留言内容）*/
#twikoo-wrap .tk-textarea {
  background: rgba(255,255,255,0.06) !important;
  border: 1px solid var(--border) !important;
  border-radius: 10px !important;
  padding: 12px 14px !important;
  color: var(--text-high) !important;
  font-family: inherit !important;
  font-size: 0.9rem !important;
  line-height: 1.7;
  backdrop-filter: blur(6px);
  transition: border-color 0.25s, box-shadow 0.25s;
  outline: none;
  width: 100% !important;
  resize: vertical;
  min-height: 100px;
  box-shadow: none !important;
}
#twikoo-wrap .tk-textarea:focus {
  border-color: var(--accent) !important;
  background: rgba(255,255,255,0.09) !important;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.12) !important;
}

/* 发送按钮 */
#twikoo-wrap .tk-submit {
  background: var(--accent) !important;
  color: #fff !important;
  border: none !important;
  border-radius: 50px !important;
  padding: 10px 28px !important;
  font-size: 0.88rem !important;
  font-weight: 600 !important;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1) !important;
  font-family: inherit !important;
  letter-spacing: 0.03em;
  box-shadow: none !important;
}
#twikoo-wrap .tk-submit:hover {
  background: var(--theme-color, #6366f1) !important;
  transform: translateY(-2px) scale(1.02) !important;
  box-shadow: 0 6px 20px rgba(99,102,241,0.35) !important;
}
#twikoo-wrap .tk-submit:active { transform: translateY(0) scale(0.98) !important; }

/* 回复按钮 */
#twikoo-wrap .tk-action-btn {
  color: var(--secondary) !important;
  font-size: 0.78rem !important;
  opacity: 0.6;
  transition: opacity 0.2s, color 0.2s;
  border: none !important;
  background: none !important;
  border-radius: 20px !important;
  padding: 3px 10px !important;
}
#twikoo-wrap .tk-action-btn:hover { opacity: 1; color: var(--accent) !important; }

/* 验证提示 */
#twikoo-wrap .tk-msg {
  color: var(--text-high);
  font-size: 0.85rem;
}

/* 加载动画 */
#twikoo-wrap .tk-loading {
  color: var(--secondary);
  opacity: 0.6;
}

/* 暂无评论 */
#twikoo-wrap .tk-empty { text-align: center; padding: 32px; color: var(--secondary); opacity: 0.5; font-size: 0.9rem; }

</style>

<!-- 页面内容 -->
<div class="message-page" id="msgPage">

  <!-- 标题区 -->
  <div class="msg-hero">
    <h1>给我留言</h1>
    <p>你的每句话，都是这里的星光 ✨</p>
    <p style="font-size: 0.82rem; opacity: 0.5; margin-top: 6px;">成为友邻的第一步 · <a href="/link/" style="color: var(--accent, oklch(0.65 0.18 260)); text-decoration: none; font-weight: 500;">先看看友链墙 →</a></p>
  </div>

  <!-- 我的博客信息 -->
  <div class="msg-card" style="margin-bottom: 0;">
    <div class="msg-section-label">我的博客信息</div>
    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
      <img src="/img/%E5%A4%B4%E5%83%8F.JPG" style="width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border);" alt="avatar" onerror="this.onerror=null;this.src='/img/friend_404.gif'">
      <div style="flex: 1; min-width: 180px;">
        <div style="font-weight: 600; margin-bottom: 4px;">G/ren的小破站</div>
        <div style="font-size: 0.82rem; opacity: 0.6; margin-bottom: 6px;">机器视觉调试工程师 | 技术分享</div>
        <div style="font-size: 0.78rem;">
          <a href="https://www.hehehey.top/" style="color: var(--accent, oklch(0.65 0.18 260)); text-decoration: none;">https://www.hehehey.top/</a>
        </div>
      </div>
      <button onclick="copySiteInfo()" id="copyBtn" style="background: var(--card-bg); border: 1px solid var(--border); border-radius: 50px; padding: 8px 18px; font-size: 0.82rem; cursor: pointer; transition: all 200ms ease; font-family: inherit; color: var(--text-high);">复制站名和链接</button>
      <button onclick="copySiteHTML()" id="copyHTMLBtn" style="background: var(--card-bg); border: 1px solid var(--border); border-radius: 50px; padding: 8px 18px; font-size: 0.82rem; cursor: pointer; transition: all 200ms ease; font-family: inherit; color: var(--text-high);">复制 HTML 链接</button>
    </div>
  </div>

  <script>
    function copySiteInfo() {
      const info = "网站名称：G/ren的小破站\n网址：https://www.hehehey.top/";
      navigator.clipboard.writeText(info).then(() => {
        const btn = document.getElementById('copyBtn');
        btn.textContent = '已复制 ✓';
        btn.style.borderColor = 'var(--accent, oklch(0.65 0.18 260))';
        btn.style.color = 'var(--accent, oklch(0.65 0.18 260))';
        setTimeout(() => {
          btn.textContent = '复制站名和链接';
          btn.style.borderColor = 'var(--border)';
          btn.style.color = 'var(--text-high)';
        }, 2000);
      });
    }
    function copySiteHTML() {
      const html = '<a href="https://www.hehehey.top/">G/ren的小破站</a>';
      navigator.clipboard.writeText(html).then(() => {
        const btn = document.getElementById('copyHTMLBtn');
        btn.textContent = '已复制 ✓';
        btn.style.borderColor = 'var(--accent, oklch(0.65 0.18 260))';
        btn.style.color = 'var(--accent, oklch(0.65 0.18 260))';
        setTimeout(() => {
          btn.textContent = '复制 HTML 链接';
          btn.style.borderColor = 'var(--border)';
          btn.style.color = 'var(--text-high)';
        }, 2000);
      });
    }
  </script>

  <!-- 联系卡片 -->
  <div class="msg-card" style="margin-bottom: 0;">
    <div class="contact-grid">
      <div class="contact-card">
        <div class="contact-icon">📧</div>
        <div class="contact-title">邮箱</div>
        <div class="contact-info">mr.he2002@foxmail.com</div>
      </div>
      <div class="contact-card">
        <div class="contact-icon">⏱️</div>
        <div class="contact-title">回复时间</div>
        <div class="contact-info">一般 1~3 天</div>
      </div>
      <div class="contact-card">
        <div class="contact-icon">💬</div>
        <div class="contact-title">公开留言</div>
        <div class="contact-info">所有人可见</div>
      </div>
    </div>
  </div>

  <!-- 分割区 -->
  <div class="msg-divider">写下你的足迹</div>

  <!-- 友链规范（可折叠） -->
  <details style="margin-bottom: 24px;">
    <summary style="cursor: pointer; font-size: 0.85rem; opacity: 0.55; padding: 8px 0; list-style: none; display: flex; align-items: center; gap: 6px;">
      <span>📋 友链交换规范（点击展开）</span>
    </summary>
    <div style="background: var(--card-bg); border: 1px solid var(--border); border-radius: 0.625rem; padding: 16px 20px; margin-top: 10px; font-size: 0.85rem; line-height: 1.8; opacity: 0.8;">
      <p style="margin: 0 0 8px;">在交换友链前，请先确认以下几点：</p>
      <ul style="margin: 0; padding-left: 20px;">
        <li>内容原创，文章多为亲手撰写</li>
        <li>保持更新频率，不接受死链或长期不更新的站点</li>
        <li>不接受商业广告、恶意推广等内容</li>
        <li>请先在贵站添加本站信息后再留言申请</li>
      </ul>
    </div>
  </details>

  <!-- Twikoo 留言区 -->
  <div id="twikoo-wrap" style="max-width:700px;margin:0 auto;"></div>

</div>

<!-- 留言输入区锚点（友链页跳转会定位到这里） -->
<span id="msg-write" style="display:block;height:1px;"></span>

<!-- 浮动回顶部 -->
<div class="msg-gotop" id="msgGotop" onclick="document.querySelector('.msg-form').scrollIntoView({behavior:'smooth'})">↑</div>

<script>
// 浮动按钮显示逻辑
const gotop = document.getElementById('msgGotop');
window.addEventListener('scroll', () => {
  gotop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
</script>

<script>
/* ============================================================
   友链申请模板自动填入
   ------------------------------------------------------------
   来源：/link/ 页面点「复制申请模板」时，会把模板写进
   sessionStorage['linkApplyTemplate']，然后跳到 /message/。
   这里把它读出来，塞进 Twikoo（Element UI）的文本域。

   为什么要轮询：Twikoo 是异步渲染的，DOM 出现时间不确定，
   而且它可能重渲染（比如登录态变化），所以监听 + 轮询双保险。
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'linkApplyTemplate';
  var FORM_SELECTOR = '.el-textarea__inner';
  var applied = false;

  function readTemplate() {
    var v = null;
    try { v = sessionStorage.getItem(KEY); } catch (e) { return null; }
    return v && v.trim() ? v : null;
  }

  function clearTemplate() {
    try { sessionStorage.removeItem(KEY); } catch (e) { }
  }

  // 用原生 setter 写值，Element UI 才能感知到（直接改 .value 它收不到）
  function setNativeValue(el, value) {
    var proto = Object.getPrototypeOf(el);
    var desc = Object.getOwnPropertyDescriptor(proto, 'value');
    if (desc && desc.set) {
      desc.set.call(el, value);
    } else {
      el.value = value;
    }
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function tryFill() {
    if (applied) return true;

    var text = readTemplate();
    if (!text) return true;   // 没有待填内容，视为完成

    var ta = document.querySelector(FORM_SELECTOR);
    if (!ta) return false;

    // 用户已经自己写了东西就不覆盖
    if (ta.value && ta.value.trim().length > 0) {
      applied = true;
      clearTemplate();
      return true;
    }

    setNativeValue(ta, text);
    ta.focus();

    // 光标放到「网站名称：」后面，方便直接输入
    var idx = text.indexOf('网站名称：');
    if (idx >= 0) {
      var pos = idx + '网站名称：'.length;
      try { ta.setSelectionRange(pos, pos); } catch (e) { }
    }

    // 滚到输入区
    var wrap = document.getElementById('twikoo-wrap');
    var anchor = document.getElementById('msg-write');
    var target = anchor || wrap || ta;
    try {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (e) {
      target.scrollIntoView();
    }

    applied = true;
    clearTemplate();
    return true;
  }

  // 轮询 + MutationObserver 双保险
  function boot() {
    if (!readTemplate()) return;

    var tries = 0;
    var timer = setInterval(function () {
      tries++;
      if (tryFill() || tries > 60) {   // 最多等 60 次 × 250ms = 15s
        clearInterval(timer);
      }
    }, 250);

    if (window.MutationObserver && document.body) {
      var mo = new MutationObserver(function () {
        if (tryFill()) mo.disconnect();
      });
      mo.observe(document.body, { childList: true, subtree: true });
      setTimeout(function () { mo.disconnect(); }, 20000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
</script>
