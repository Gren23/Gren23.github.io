/* ================== 留言板页面脚本 ================== */

document.addEventListener('DOMContentLoaded', function() {
  /* ===== 浮动回顶部按钮 ===== */
  var gotop = document.getElementById('msgGotop');
  if (gotop) {
    window.addEventListener('scroll', function() {
      gotop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    gotop.addEventListener('click', function() {
      var target = document.querySelector('.msg-form') || document.querySelector('#twikoo-wrap');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ===== 复制博客信息 ===== */
  var copyBtn = document.getElementById('copyBtn');
  var copyHTMLBtn = document.getElementById('copyHTMLBtn');

  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      var info = "网站名称：G/ren的小破站\n网址：https://www.hehehey.top/";
      navigator.clipboard.writeText(info).then(function() {
        copyBtn.textContent = '已复制 ✓';
        copyBtn.style.borderColor = 'var(--accent)';
        copyBtn.style.color = 'var(--accent)';
        setTimeout(function() {
          copyBtn.textContent = '复制站名和链接';
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2000);
      });
    });
  }

  if (copyHTMLBtn) {
    copyHTMLBtn.addEventListener('click', function() {
      var html = '<a href="https://www.hehehey.top/">G/ren的小破站</a>';
      navigator.clipboard.writeText(html).then(function() {
        copyHTMLBtn.textContent = '已复制 ✓';
        copyHTMLBtn.style.borderColor = 'var(--accent)';
        copyHTMLBtn.style.color = 'var(--accent)';
        setTimeout(function() {
          copyHTMLBtn.textContent = '复制 HTML 链接';
          copyHTMLBtn.style.borderColor = '';
          copyHTMLBtn.style.color = '';
        }, 2000);
      });
    });
  }
});
