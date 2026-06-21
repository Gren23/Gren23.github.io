// 滚动时卡片依次由浅到深渐显
(function () {
  const cards = document.querySelectorAll('#recent-posts .recent-post-item');
  if (!cards.length) return;

  // 初始状态：全部透明
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = Array.from(cards).indexOf(card);
          // 每个卡片延迟 80ms，依次出现
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 80);
          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach(card => observer.observe(card));
})();
