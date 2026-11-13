---
title: 给我留言
date: 2026-05-20 09:00:00
---

{% raw %}
<div class="message-page" id="msgPage">

  <!-- ========== 顶部 ========== -->
  <div class="mp-head">
    <div class="mp-head-label">// LEAVE_A_MESSAGE //</div>
    <p class="mp-head-desc">
      有技术问题想交流、发现了文章里的错误，或者只是想打个招呼 —— 都欢迎留在这里。
      留言公开可见，回复一般在 1~3 天内。
    </p>
    <div class="mp-stats">
      <span class="mp-stat"><b id="msgCount">0</b> 条留言</span>
      <span class="mp-stat mp-stat--muted">公开可见 · 支持回复</span>
    </div>
  </div>

  <!-- ========== 本站信息卡 ========== -->
  <div class="mp-card">
    <div class="mp-section-label">// SITE_INFO //</div>
    <div class="mp-siteinfo">
      <img class="mp-siteinfo-avatar" src="/img/头像.JPG" alt="G/ren" loading="lazy">
      <div class="mp-siteinfo-main">
        <div class="mp-siteinfo-name">G/ren的小破站</div>
        <div class="mp-siteinfo-desc">机器视觉调试工程师 | 技术分享</div>
        <a class="mp-siteinfo-url" href="/" target="_blank" rel="noopener">hehehey.top</a>
      </div>
      <div class="mp-siteinfo-actions">
        <button class="mp-btn" id="copyNameUrl" type="button">复制站名和链接</button>
        <button class="mp-btn" id="copyHtml" type="button">复制 HTML 链接</button>
      </div>
    </div>
  </div>

  <!-- ========== 联系方式 ========== -->
  <div class="mp-card">
    <div class="mp-section-label">// CONTACT //</div>
    <div class="mp-contact-grid">

      <a class="mp-contact" href="mailto:1955561070@qq.com">
        <div class="mp-contact-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m2 7 10 6 10-6"/>
          </svg>
        </div>
        <div class="mp-contact-title">邮箱</div>
        <div class="mp-contact-info">1955561070@qq.com</div>
      </a>

      <div class="mp-contact">
        <div class="mp-contact-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 7v5l3 2"/>
          </svg>
        </div>
        <div class="mp-contact-title">回复时间</div>
        <div class="mp-contact-info">一般 1~3 天</div>
      </div>

      <a class="mp-contact" href="/link/">
        <div class="mp-contact-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/>
            <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>
          </svg>
        </div>
        <div class="mp-contact-title">友链申请</div>
        <div class="mp-contact-info">去友链页看流程</div>
      </a>

    </div>
  </div>

  <!-- ========== 友链规范（折叠） ========== -->
  <details class="mp-details">
    <summary class="mp-details-summary">
      <span class="mp-details-arrow">▸</span>
      友链交换规范
    </summary>
    <div class="mp-details-body">
      <ul>
        <li>站点可正常访问，已稳定运行 <b>3 个月</b>以上</li>
        <li>内容以<b>原创</b>技术、生活记录为主，无违规内容</li>
        <li>已在贵站添加本站友链后再申请</li>
        <li>不接受商业广告、恶意推广、采集站</li>
      </ul>
      <a class="mp-btn mp-btn--inline" href="/link/">前往友链页 →</a>
    </div>
  </details>

  <!-- ========== 留言输入区锚点 ========== -->
  <span id="msg-write" style="display:block;height:1px;"></span>

</div>

<!-- 说明：评论区不在这里写。主题会自动在 #article-container 之后
     渲染标准的 #post-comment > #twikoo-wrap 结构，
     自己再写一个会造成重复 id，Twikoo 只会挂到其中一个。 -->

<!-- 浮动回顶部 -->
<button class="mp-gotop" id="msgGotop" type="button" aria-label="回到输入框">↑</button>

<style>
/* ============================================================
   信箱页 · 对齐全站视觉语言
   与 /link/ 同一套：16px 主圆角 / 12px 次圆角 / 冷蓝高亮
   ============================================================ */

.message-page { width: 100%; padding: 4px 2px; box-sizing: border-box; }

/* ---------- 顶部 ---------- */
.mp-head { margin-bottom: 28px; }

.mp-head-label {
  font-family: var(--c-font-mono);
  font-size: 15px;
  color: #64748b;
  letter-spacing: 1px;
  margin-bottom: 12px;
}
.mp-head-desc {
  font-size: 14px;
  color: var(--c-text-secondary, #6B7280);
  line-height: 1.75;
  margin: 0 0 16px;
}
.mp-stats { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.mp-stat {
  font-family: var(--c-font-mono);
  font-size: 12px;
  color: var(--c-primary, #1677B3);
  background: rgba(var(--c-primary-rgb, 22,119,179), 0.06);
  border: 1px solid rgba(var(--c-primary-rgb, 22,119,179), 0.12);
  border-radius: 10px;
  padding: 3px 10px;
}
.mp-stat b { font-weight: 700; }
.mp-stat--muted {
  color: var(--c-text-secondary, #6B7280);
  background: transparent;
  border-color: transparent;
  padding-left: 2px;
}

/* ---------- 通用卡片 ---------- */
.mp-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
}

.mp-section-label {
  font-family: var(--c-font-mono);
  font-size: 15px;
  color: #64748b;
  letter-spacing: 1px;
  margin-bottom: 18px;
}

/* ---------- 本站信息 ---------- */
.mp-siteinfo {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.mp-siteinfo-avatar {
  flex: 0 0 52px;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  object-fit: cover;
  background: rgba(var(--c-primary-rgb, 22,119,179), 0.08);
}
.mp-siteinfo-main { flex: 1; min-width: 160px; }
.mp-siteinfo-name { font-size: 15px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
.mp-siteinfo-desc { font-size: 12.5px; color: #64748b; margin-bottom: 6px; }
.mp-siteinfo-url {
  font-family: var(--c-font-mono);
  font-size: 11.5px;
  color: var(--c-primary, #1677B3);
  text-decoration: none;
  opacity: 0.75;
}
.mp-siteinfo-url:hover { opacity: 1; text-decoration: underline; }
.mp-siteinfo-actions { display: flex; gap: 8px; flex-wrap: wrap; }

/* ---------- 按钮 ---------- */
.mp-btn {
  font: inherit;
  font-size: 12.5px;
  font-family: var(--c-font-mono);
  color: var(--c-primary, #1677B3);
  background: rgba(var(--c-primary-rgb, 22,119,179), 0.06);
  border: 1px solid rgba(var(--c-primary-rgb, 22,119,179), 0.18);
  border-radius: 10px;
  padding: 8px 16px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background 0.25s ease, border-color 0.25s ease;
}
.mp-btn:hover {
  background: rgba(var(--c-primary-rgb, 22,119,179), 0.12);
  border-color: rgba(var(--c-primary-rgb, 22,119,179), 0.35);
}

/* ---------- 联系方式 ---------- */
.mp-contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}
.mp-contact {
  display: block;
  background: rgba(var(--c-primary-rgb, 22,119,179), 0.03);
  border: 1px solid rgba(var(--c-primary-rgb, 22,119,179), 0.1);
  border-radius: 12px;
  padding: 18px 16px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.35s ease,
              box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
a.mp-contact:hover {
  transform: translateY(-3px);
  border-color: rgba(var(--c-primary-rgb, 22,119,179), 0.3);
  box-shadow: 0 8px 24px rgba(var(--c-primary-rgb, 22,119,179), 0.08);
}
.mp-contact-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: rgba(var(--c-primary-rgb, 22,119,179), 0.08);
  color: var(--c-primary, #1677B3);
  margin-bottom: 10px;
}
.mp-contact-title { font-size: 13.5px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
.mp-contact-info {
  font-size: 11.5px;
  color: #64748b;
  word-break: break-all;
  font-family: var(--c-font-mono);
}

/* ---------- 折叠详情 ---------- */
.mp-details {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
}
.mp-details-summary {
  cursor: pointer;
  padding: 16px 24px;
  font-size: 13.5px;
  font-weight: 600;
  color: #1e293b;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
}
.mp-details-summary::-webkit-details-marker { display: none; }
.mp-details-arrow {
  color: var(--c-primary, #1677B3);
  transition: transform 0.25s ease;
  font-size: 12px;
}
.mp-details[open] .mp-details-arrow { transform: rotate(90deg); }
.mp-details-body {
  padding: 0 24px 20px;
  font-size: 13px;
  color: #64748b;
  line-height: 1.9;
}
.mp-details-body ul { margin: 0 0 14px; padding-left: 18px; }
.mp-details-body b { color: var(--c-primary, #1677B3); font-weight: 600; }
.mp-btn--inline { font-size: 12px; padding: 6px 14px; }

/* ---------- 留言区卡片 ---------- */
.mp-card--comment { padding-bottom: 8px; }

/* ---------- 回到输入框 ---------- */
.mp-gotop {
  position: fixed;
  right: 26px;
  bottom: 96px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.9);
  background: rgba(255, 255, 255, 0.9);
  color: var(--c-primary, #1677B3);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transform: translateY(6px);
  transition: opacity 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
  backdrop-filter: blur(8px);
  z-index: 90;
}
.mp-gotop.is-visible { opacity: 1; pointer-events: auto; transform: translateY(0); }
.mp-gotop:hover { border-color: rgba(var(--c-primary-rgb, 22,119,179), 0.4); }

/* ============================================================
   Twikoo 皮肤
   Twikoo 1.7.9 实际渲染在自建的 #twikoo，
   输入框是 Element UI 的 .el-textarea__inner / .el-input__inner。
   ============================================================ */
/* 主题自带的评论区容器，给它套上同样的卡片语言 */
/* 主题在正文和评论区之间插的分隔虚线（2px dashed + 剪刀图标），
   卡片布局里多余，直接隐藏 */
.custom-hr,
.custom-hr::before {
  display: none !important;
  border: 0 !important;
  content: none !important;
}

#post-comment {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  padding: 24px;
  margin-top: 16px;
}
#post-comment .comment-head {
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  padding-bottom: 14px;
  margin-bottom: 8px;
}
#post-comment .comment-headline {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  font-family: var(--c-font-mono);
  letter-spacing: 1px;
}
#post-comment .comment-headline i { color: var(--c-primary, #1677B3); }

html[data-theme='dark'] #post-comment {
  background: rgba(15, 23, 42, 0.5);
  border-color: rgba(255, 255, 255, 0.06);
}
html[data-theme='dark'] #post-comment .comment-head {
  border-color: rgba(255, 255, 255, 0.08);
}
html[data-theme='dark'] #post-comment .comment-headline { color: #e8eef4; }
html[data-theme='dark'] #post-comment .comment-headline i { color: #64b5f6; }

#twikoo { font-size: 14px; }

#twikoo .tk-comments-title {
  color: #64748b;
  font-size: 12.5px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  padding-bottom: 12px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

#twikoo .tk-comment {
  background: rgba(248, 250, 252, 0.7);
  border: 1px solid rgba(226, 232, 240, 0.7);
  border-radius: 12px;
  padding: 16px 18px;
  margin-bottom: 12px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
#twikoo .tk-comment:hover {
  border-color: rgba(var(--c-primary-rgb, 22,119,179), 0.25);
  box-shadow: 0 4px 16px rgba(var(--c-primary-rgb, 22,119,179), 0.05);
}

#twikoo .tk-avatar {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, 0.9);
}
#twikoo .tk-avatar img { border-radius: 10px; }

#twikoo .tk-nick { color: #1e293b; font-weight: 600; font-size: 13.5px; }
#twikoo .tk-nick a { color: #1e293b; text-decoration: none; }
#twikoo .tk-time { color: #94a3b8; font-size: 11.5px; }

#twikoo .tk-content {
  color: var(--c-text, #374151);
  font-size: 13.5px;
  line-height: 1.8;
}
#twikoo .tk-content p { margin: 4px 0; }

#twikoo .tk-replies { margin-top: 10px; }
#twikoo .tk-replies .tk-comment {
  background: rgba(248, 250, 252, 0.5);
  border-color: rgba(226, 232, 240, 0.5);
}

#twikoo .tk-action-icon { color: #94a3b8; }
#twikoo .tk-action-icon:hover { color: var(--c-primary, #1677B3); }
#twikoo .tk-action-count { color: #94a3b8; font-size: 11.5px; }

/* ---- 输入区 ---- */
#twikoo .tk-input,
#twikoo .el-textarea__inner,
#twikoo .el-input__inner {
  background: #f8fafc !important;
  border: 1px solid rgba(226, 232, 240, 1) !important;
  border-radius: 10px !important;
  color: var(--c-text, #374151) !important;
  font-family: inherit !important;
  font-size: 13.5px !important;
  box-shadow: none !important;
  transition: border-color 0.25s ease, background 0.25s ease;
}
#twikoo .el-textarea__inner { padding: 12px 14px !important; line-height: 1.75; }
#twikoo .el-textarea__inner:focus,
#twikoo .el-input__inner:focus,
#twikoo .tk-input:focus {
  border-color: rgba(var(--c-primary-rgb, 22,119,179), 0.55) !important;
  background: #ffffff !important;
  box-shadow: 0 0 0 3px rgba(var(--c-primary-rgb, 22,119,179), 0.1) !important;
}
#twikoo .el-textarea__inner::placeholder,
#twikoo .el-input__inner::placeholder { color: #94a3b8 !important; }

#twikoo .el-input__count,
#twikoo .el-textarea .el-input__count {
  background: transparent;
  color: #94a3b8;
  font-family: var(--c-font-mono);
  font-size: 10.5px;
}

/* ---- 提交按钮 ---- */
#twikoo .tk-submit .el-button,
#twikoo .el-button--primary {
  background: var(--c-primary, #1677B3) !important;
  border-color: var(--c-primary, #1677B3) !important;
  border-radius: 10px !important;
  color: #fff !important;
  font-size: 13px !important;
  padding: 9px 22px !important;
  transition: opacity 0.25s ease, transform 0.2s ease;
}
#twikoo .el-button--primary:hover { opacity: 0.88; transform: translateY(-1px); }

#twikoo .tk-submit .el-button:not(.el-button--primary) {
  background: rgba(var(--c-primary-rgb, 22,119,179), 0.06) !important;
  border-color: rgba(var(--c-primary-rgb, 22,119,179), 0.18) !important;
  color: var(--c-primary, #1677B3) !important;
}

#twikoo .tk-owo-emotion { border-radius: 6px; }
#twikoo .tk-icon,
#twikoo .tk-submit .tk-owo,
#twikoo .tk-submit .tk-upload { color: #94a3b8; }
#twikoo .tk-icon:hover { color: var(--c-primary, #1677B3); }

/* ============================================================
   深色模式
   ============================================================ */
html[data-theme='dark'] .mp-head-label,
html[data-theme='dark'] .mp-section-label { color: #8b9db5; }

html[data-theme='dark'] .mp-head-desc,
html[data-theme='dark'] .mp-contact-info,
html[data-theme='dark'] .mp-siteinfo-desc,
html[data-theme='dark'] .mp-details-body { color: #8b9db5; }

html[data-theme='dark'] .mp-card,
html[data-theme='dark'] .mp-details {
  background: rgba(15, 23, 42, 0.5);
  border-color: rgba(255, 255, 255, 0.06);
}

html[data-theme='dark'] .mp-siteinfo-name,
html[data-theme='dark'] .mp-contact-title,
html[data-theme='dark'] .mp-details-summary { color: #e8eef4; }

html[data-theme='dark'] .mp-stat {
  color: #64b5f6;
  background: rgba(100, 181, 246, 0.08);
  border-color: rgba(100, 181, 246, 0.16);
}
html[data-theme='dark'] .mp-stat--muted { color: #8b9db5; background: transparent; border-color: transparent; }

html[data-theme='dark'] .mp-contact,
html[data-theme='dark'] .mp-siteinfo-avatar {
  background: rgba(100, 181, 246, 0.06);
  border-color: rgba(100, 181, 246, 0.12);
}
html[data-theme='dark'] a.mp-contact:hover {
  border-color: rgba(100, 181, 246, 0.35);
  box-shadow: 0 8px 24px rgba(100, 181, 246, 0.1);
}
html[data-theme='dark'] .mp-contact-icon {
  background: rgba(100, 181, 246, 0.12);
  color: #64b5f6;
}
html[data-theme='dark'] .mp-siteinfo-url,
html[data-theme='dark'] .mp-details-arrow { color: #64b5f6; }

html[data-theme='dark'] .mp-btn {
  color: #64b5f6;
  background: rgba(100, 181, 246, 0.08);
  border-color: rgba(100, 181, 246, 0.2);
}
html[data-theme='dark'] .mp-btn:hover {
  background: rgba(100, 181, 246, 0.15);
  border-color: rgba(100, 181, 246, 0.4);
}

html[data-theme='dark'] .mp-gotop {
  background: rgba(26, 35, 50, 0.9);
  border-color: rgba(255, 255, 255, 0.08);
  color: #64b5f6;
}

html[data-theme='dark'] #twikoo .tk-comment {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.06);
}
html[data-theme='dark'] #twikoo .tk-replies .tk-comment {
  background: rgba(255, 255, 255, 0.02);
  border-color: rgba(255, 255, 255, 0.04);
}
html[data-theme='dark'] #twikoo .tk-comments-title {
  color: #8b9db5;
  border-color: rgba(255, 255, 255, 0.08);
}
html[data-theme='dark'] #twikoo .tk-nick,
html[data-theme='dark'] #twikoo .tk-nick a { color: #e8eef4; }
html[data-theme='dark'] #twikoo .tk-content { color: #cdd9e5; }
html[data-theme='dark'] #twikoo .tk-time,
html[data-theme='dark'] #twikoo .tk-action-count { color: #6b7f96; }

html[data-theme='dark'] #twikoo .tk-input,
html[data-theme='dark'] #twikoo .el-textarea__inner,
html[data-theme='dark'] #twikoo .el-input__inner {
  background: rgba(255, 255, 255, 0.04) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #e8eef4 !important;
}
html[data-theme='dark'] #twikoo .el-textarea__inner:focus,
html[data-theme='dark'] #twikoo .el-input__inner:focus {
  background: rgba(255, 255, 255, 0.06) !important;
  border-color: rgba(100, 181, 246, 0.55) !important;
  box-shadow: 0 0 0 3px rgba(100, 181, 246, 0.12) !important;
}
html[data-theme='dark'] #twikoo .el-textarea__inner::placeholder,
html[data-theme='dark'] #twikoo .el-input__inner::placeholder { color: #6b7f96 !important; }

html[data-theme='dark'] #twikoo .tk-submit .el-button,
html[data-theme='dark'] #twikoo .el-button--primary {
  background: #1677B3 !important;
  border-color: #1677B3 !important;
}
html[data-theme='dark'] #twikoo .tk-submit .el-button:not(.el-button--primary) {
  background: rgba(100, 181, 246, 0.08) !important;
  border-color: rgba(100, 181, 246, 0.2) !important;
  color: #64b5f6 !important;
}

/* ---------- 移动端 ---------- */
@media (max-width: 640px) {
  .mp-card, .mp-details { padding: 18px; border-radius: 14px; }
  .mp-details-summary { padding: 14px 18px; }
  .mp-details-body { padding: 0 18px 16px; }
  .mp-siteinfo { gap: 12px; }
  .mp-siteinfo-actions { width: 100%; }
  .mp-contact-grid { grid-template-columns: 1fr 1fr; }
  .mp-gotop { right: 14px; bottom: 80px; width: 36px; height: 36px; }
}
</style>

<script>
(function () {
  'use strict';

  var SITE = {
    name: 'G/ren的小破站',
    url: 'https://www.hehehey.top/'
  };

  function toast(msg) {
    var el = document.createElement('div');
    el.textContent = msg;
    el.style.cssText = 'position:fixed;left:50%;bottom:40px;transform:translateX(-50%) translateY(8px);' +
      'background:rgba(22,119,179,0.95);color:#fff;font-size:13px;padding:9px 18px;border-radius:10px;' +
      'z-index:9999;opacity:0;transition:opacity .25s ease,transform .25s ease;pointer-events:none;';
    document.body.appendChild(el);
    requestAnimationFrame(function () {
      el.style.opacity = '1';
      el.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(function () {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-50%) translateY(8px)';
      setTimeout(function () { el.remove(); }, 300);
    }, 2200);
  }

  function copyText(text, okMsg) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;left:-9999px;top:0;';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      toast(ok ? okMsg : '复制失败，请手动选中复制');
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast(okMsg); }).catch(fallback);
    } else {
      fallback();
    }
  }

  var btnName = document.getElementById('copyNameUrl');
  if (btnName) {
    btnName.addEventListener('click', function () {
      copyText('网站名称：' + SITE.name + '\n网址：' + SITE.url, '已复制站名和链接');
    });
  }

  var btnHtml = document.getElementById('copyHtml');
  if (btnHtml) {
    btnHtml.addEventListener('click', function () {
      copyText('<a href="' + SITE.url + '">' + SITE.name + '</a>', '已复制 HTML 链接');
    });
  }

  var gotop = document.getElementById('msgGotop');
  if (gotop) {
    var onScroll = function () {
      gotop.classList.toggle('is-visible', window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    gotop.addEventListener('click', function () {
      var anchor = document.getElementById('msg-write');
      var ta = document.querySelector('#twikoo .el-textarea__inner');
      var target = anchor || ta;
      if (target) {
        try { target.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        catch (e) { target.scrollIntoView(); }
      }
      setTimeout(function () {
        var t = document.querySelector('#twikoo .el-textarea__inner');
        if (t) t.focus();
      }, 450);
    });
  }

  function updateCount() {
    var el = document.getElementById('msgCount');
    if (!el) return;
    var nodes = document.querySelectorAll('#twikoo .tk-comment');
    el.textContent = nodes.length;
  }
  if (window.MutationObserver) {
    var tries = 0;
    var mo = new MutationObserver(function () {
      updateCount();
      if (++tries > 40) mo.disconnect();
    });
    var startObserve = function () {
      var t = document.getElementById('twikoo');
      if (t) { mo.observe(t, { childList: true, subtree: true }); updateCount(); }
      else if (++tries < 60) setTimeout(startObserve, 300);
    };
    setTimeout(startObserve, 600);
  }

  // ================== 友链申请模板自动填入 ==================
  (function autofill() {
    var KEY = 'linkApplyTemplate';
    var SEL = '#twikoo .el-textarea__inner';
    var applied = false;

    function read() {
      try { return sessionStorage.getItem(KEY); } catch (e) { return null; }
    }
    function clear() {
      try { sessionStorage.removeItem(KEY); } catch (e) { }
    }
    function setNative(el, val) {
      var d = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value');
      if (d && d.set) d.set.call(el, val); else el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }
    function fill() {
      if (applied) return true;
      var text = read();
      if (!text || !text.trim()) return true;
      var ta = document.querySelector(SEL);
      if (!ta) return false;
      if (ta.value && ta.value.trim()) { applied = true; clear(); return true; }

      setNative(ta, text);
      ta.focus();
      var i = text.indexOf('网站名称：');
      if (i >= 0) {
        var pos = i + '网站名称：'.length;
        try { ta.setSelectionRange(pos, pos); } catch (e) { }
      }
      var anchor = document.getElementById('msg-write');
      if (anchor) {
        try { anchor.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        catch (e) { anchor.scrollIntoView(); }
      }
      applied = true;
      clear();
      return true;
    }
    function boot() {
      if (!read()) return;
      var n = 0;
      var timer = setInterval(function () {
        if (fill() || ++n > 60) clearInterval(timer);
      }, 250);
      if (window.MutationObserver && document.body) {
        var mo = new MutationObserver(function () { if (fill()) mo.disconnect(); });
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
})();
</script>
{% endraw %}
