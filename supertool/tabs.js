/* ==========================================================================
   超级工作台 — tab 切换绑定
   原页面用 <button onclick="switchTab('xxx')"> 直接调 app.js 里的 switchTab()。
   这里改为事件绑定，仍调用同一个 switchTab，避免两套切换逻辑打架。
   ========================================================================== */

(function () {
  'use strict';

  // ===== tab 切换 =====
  // 原页面靠 <button onclick="switchTab('cover')"> 直接调用原脚本里的 switchTab()。
  // 这里改为事件绑定，仍然调用同一个 switchTab，避免两套切换逻辑打架。
  // 注意：switchTab 会重写 btn.className，所以高亮样式靠 CSS 的 [aria-selected]
  //       和 .st-active 双保险 —— 见下方 patchSwitchTab()。

  var TAB_IDS = ['cover', 'fm', 'markdown', 'compress'];

  function bindTabs() {
    var buttons = document.querySelectorAll('.st-tabs button[data-tab]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');

        // 调用原函数（它会处理面板显隐 + 触发 drawCover）
        if (typeof window.switchTab === 'function') {
          window.switchTab(target);
        } else {
          // 兜底：原函数没就绪时自己切
          TAB_IDS.forEach(function (id) {
            var panel = document.getElementById('panel-' + id);
            if (!panel) return;
            if (id === target) panel.classList.remove('hidden');
            else panel.classList.add('hidden');
          });
        }

        // 维护高亮（原 switchTab 用 className 覆盖，所以这里用 setAttribute 另存）
        buttons.forEach(function (b) {
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });

        // lucide 图标重绘
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          window.lucide.createIcons();
        }
      });
    });

    // 初始激活
    var first = document.querySelector('.st-tabs button[data-tab="cover"]');
    if (first) first.setAttribute('aria-selected', 'true');
  }

  function boot() {
    // 等原脚本的 switchTab 挂到 window 上（它在后一个 <script> 里，已先执行完）
    bindTabs();
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
    // 触发一次封面渲染
    if (typeof window.drawCover === 'function') {
      setTimeout(function () { try { window.drawCover(); } catch (e) { } }, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
