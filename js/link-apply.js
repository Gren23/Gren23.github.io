
/**
 * 友链申请入口 - 通过 JS 注入到 /link/ 页面
 * 绕过 hexo markdown 渲染器对 HTML id 属性的处理
 */
(function() {
  // 只在 /link/ 页面执行
  if (!window.location.pathname.includes('/link/')) return;

  // 如果静态按钮已存在（index.md 自带），跳过 JS 注入避免重复
  if (document.getElementById('open-apply-form')) return;

  // 等待 DOM 就绪
  function init() {
    injectApplySection();
    attachEvents();
  }

  // 注入申请入口按钮和模态框 HTML
  function injectApplySection() {
    // 按钮
    var btn = document.createElement('div');
    btn.style.cssText = 'text-align:center; margin:28px 0 20px;';
    btn.innerHTML = '<button id="js-open-apply" style="background:linear-gradient(135deg,oklch(0.65 0.18 260),oklch(0.55 0.20 280));color:#fff;border:none;padding:12px 32px;border-radius:2rem;font-size:0.95rem;font-weight:600;cursor:pointer;box-shadow:0 4px 14px oklch(0.55 0.20 280 / 0.35);transition:transform .2s,box-shadow .2s;" onmouseover="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 6px 20px oklch(0.55 0.20 280 / 0.45)\'" onmouseout="this.style.transform=\'translateY(0)\';this.style.boxShadow=\'0 4px 14px oklch(0.55 0.20 280 / 0.35)\'">&#x1F4E4; 申请交换友链</button>';
    var target = document.querySelector('.page-title') || document.querySelector('#article-container h1') || document.querySelector('#article-container');
    if (target) target.parentNode.insertBefore(btn, target.nextSibling);

    // 模态框
    var modal = document.createElement('div');
    modal.id = 'js-apply-modal';
    modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);align-items:center;justify-content:center;';
    modal.setAttribute('onclick', "if(event.target===this)this.style.display='none'");
    modal.innerHTML = '<div style="background:var(--card-bg,#fff);border-radius:1.2rem;padding:32px;width:min(520px,92vw);max-height:90vh;overflow-y:auto;box-shadow:0 24px 60px rgba(0,0,0,0.25);position:relative;">' +
      '<button onclick="document.getElementById(\'js-apply-modal\').style.display=\'none\'" style="position:absolute;top:16px;right:16px;background:none;border:none;font-size:1.4rem;cursor:pointer;opacity:0.5;line-height:1;">&#x2715;</button>' +
      '<h3 style="margin:0 0 6px;font-size:1.15rem;">&#x1F4E4; 申请交换友链</h3>' +
      '<p style="margin:0 0 20px;opacity:0.55;font-size:0.82rem;">填写以下信息，我会尽快审核并添加</p>' +
      '<form id="js-apply-form" onsubmit="return false">' +
        '<div style="display:flex;flex-direction:column;gap:12px;">' +
          '<label style="font-size:0.85rem;font-weight:600;">网站名称 <span style="color:#e05050">*</span><input name="site_name" required placeholder="如：鹿话博客" style="width:100%;padding:10px 14px;border-radius:0.7rem;border:1.5px solid var(--border);font-size:0.9rem;background:var(--secondary);color:var(--primary);box-sizing:border-box;outline:none;margin-top:4px;" onfocus="this.style.borderColor=\'oklch(0.65 0.18 260)\'" onblur="this.style.borderColor=\'var(--border)\'" /></label>' +
          '<label style="font-size:0.85rem;font-weight:600;">网站地址 <span style="color:#e05050">*</span><input name="site_url" type="url" required placeholder="https://your-blog.com" style="width:100%;padding:10px 14px;border-radius:0.7rem;border:1.5px solid var(--border);font-size:0.9rem;background:var(--secondary);color:var(--primary);box-sizing:border-box;outline:none;margin-top:4px;" onfocus="this.style.borderColor=\'oklch(0.65 0.18 260)\'" onblur="this.style.borderColor=\'var(--border)\'" /></label>' +
          '<label style="font-size:0.85rem;font-weight:600;">头像 URL <span style="color:#e05050">*</span><input name="site_avatar" type="url" required placeholder="https://your-blog.com/avatar.png" style="width:100%;padding:10px 14px;border-radius:0.7rem;border:1.5px solid var(--border);font-size:0.9rem;background:var(--secondary);color:var(--primary);box-sizing:border-box;outline:none;margin-top:4px;" onfocus="this.style.borderColor=\'oklch(0.65 0.18 260)\'" onblur="this.style.borderColor=\'var(--border)\'" /></label>' +
          '<label style="font-size:0.85rem;font-weight:600;">网站简介 <span style="color:#e05050">*</span><textarea name="site_intro" required placeholder="简单介绍一下你的博客（10-100字）" rows="3" style="width:100%;padding:10px 14px;border-radius:0.7rem;border:1.5px solid var(--border);font-size:0.9rem;background:var(--secondary);color:var(--primary);box-sizing:border-box;outline:none;resize:vertical;margin-top:4px;font-family:inherit;" onfocus="this.style.borderColor=\'oklch(0.65 0.18 260)\'" onblur="this.style.borderColor=\'var(--border)\'"></textarea></label>' +
          '<label style="font-size:0.85rem;font-weight:600;">分组（可选）<input name="group" placeholder="默认分组" style="width:100%;padding:10px 14px;border-radius:0.7rem;border:1.5px solid var(--border);font-size:0.9rem;background:var(--secondary);color:var(--primary);box-sizing:border-box;outline:none;margin-top:4px;" onfocus="this.style.borderColor=\'oklch(0.65 0.18 260)\'" onblur="this.style.borderColor=\'var(--border)\'" /></label>' +
        '</div>' +
        '<div id="js-apply-msg" style="margin-top:14px;display:none;border-radius:0.7rem;padding:10px 14px;font-size:0.85rem;text-align:center;"></div>' +
        '<button type="button" id="js-apply-submit" style="margin-top:20px;width:100%;padding:12px;border-radius:2rem;background:linear-gradient(135deg,oklch(0.65 0.18 260),oklch(0.55 0.20 280));color:#fff;border:none;font-size:0.95rem;font-weight:600;cursor:pointer;box-shadow:0 4px 14px oklch(0.55 0.20 280 / 0.35);transition:transform .2s,box-shadow .2s;" onmouseover="this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.transform=\'translateY(0)\'">&#x2709; 提交申请</button>' +
      '</form>' +
    '</div></div>';
    document.body.appendChild(modal);
  }

  // 绑定事件
  function attachEvents() {
    var btn = document.getElementById('js-open-apply');
    var modal = document.getElementById('js-apply-modal');
    var submitBtn = document.getElementById('js-apply-submit');
    var form = document.getElementById('js-apply-form');
    var msg = document.getElementById('js-apply-msg');

    if (!btn || !modal) return;

    btn.addEventListener('click', function() {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });

    submitBtn.addEventListener('click', async function() {
      var fd = new FormData(form);
      if (!fd.get('site_name') || !fd.get('site_url') || !fd.get('site_avatar') || !fd.get('site_intro')) {
        msg.style.display = 'block';
        msg.style.background = 'oklch(0.60 0.20 25 / 0.12)';
        msg.style.color = '#e05050';
        msg.textContent = '请填写完整信息（网站名称、地址、头像、简介）';
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = '提交中...';
      msg.style.display = 'none';
      try {
        var apiBase = window.__LINK_API_BASE__ || 'https://link.hehey.top';
        var res = await fetch(apiBase + '/api/links', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            site_name: fd.get('site_name'),
            site_url: fd.get('site_url'),
            site_avatar: fd.get('site_avatar'),
            site_intro: fd.get('site_intro'),
            group: fd.get('group') || '\u9e7f\u8bdd\u5206\u7ec4',
          }),
        });
        var json = await res.json();
        if (json.code === 200) {
          msg.style.display = 'block';
          msg.style.background = 'oklch(0.70 0.18 145 / 0.15)';
          msg.style.color = 'oklch(0.55 0.15 145)';
          msg.textContent = '\u2713 \u63d0\u4ea4\u6210\u529f\uff01\u7f51\u7ad9\u300a' + fd.get('site_name') + '\u300b\u5df2\u52a0\u5165\u53cb\u94fe\u5217\u8868\uff0c\u5237\u65b0\u9875\u9762\u53ef\u89c1\u3002';
          form.reset();
          setTimeout(function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
          }, 2500);
        } else {
          throw new Error(json.detail || '\u63d0\u4ea4\u5931\u8d25');
        }
      } catch(err) {
        msg.style.display = 'block';
        msg.style.background = 'oklch(0.60 0.20 25 / 0.12)';
        msg.style.color = '#e05050';
        msg.textContent = '\u63d0\u4ea4\u5931\u8d25\uff1a' + err.message;
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '\u2709; \u63d0\u4ea4\u7533\u8bf7';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
