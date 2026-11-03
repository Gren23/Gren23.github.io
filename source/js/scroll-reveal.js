// scroll-reveal.js
// 首页卡片滚动渐显。
// 旧实现的两个问题：
//   1. 先给所有卡片写 opacity:0，如果这个脚本因为任何原因没跑完（网络、报错、JS 被拦），
//      整页文章全部不可见——内容可见性依赖装饰脚本；
//   2. 每张卡自己 setTimeout，index*80ms，页面越长最后一张等越久。
// 现在：只在 IntersectionObserver 可用时启用；用 CSS 类驱动，初始就用 requestAnimationFrame
// 打标记而不是写内联 style；延迟按「同一批可见」而非全局 index 排。
(function () {
  'use strict';

  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var cards = document.querySelectorAll('#recent-posts .recent-post-item');
  if (!cards.length) return;

  // 先加标记类，让 CSS 接管初始透明态；万一后面出错，body 上的 reveal-ready
  // 会被移除，CSS 里对应回退规则保证内容依然可见
  document.body.classList.add('reveal-ready');

  var observer = new IntersectionObserver(function (entries) {
    var shown = 0;
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var card = entry.target;
      card.style.transitionDelay = (shown * 80) + 'ms';
      card.classList.add('is-revealed');
      shown++;
      observer.unobserve(card);
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  Array.prototype.forEach.call(cards, function (card) { observer.observe(card); });

  // 兜底：2 秒后无论观察结果如何，强制显示所有卡片
  setTimeout(function () {
    Array.prototype.forEach.call(cards, function (card) {
      card.classList.add('is-revealed');
    });
  }, 2000);
})();
