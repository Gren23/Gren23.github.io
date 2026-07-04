/* ================== 友链申请页脚本 ================== */

document.addEventListener('DOMContentLoaded', function() {
  // 随机高亮一张卡片
  const cards = document.querySelectorAll('.friend-card:not(#link-empty .friend-card)');
  if (cards.length > 0) {
    const idx = Math.floor(Math.random() * cards.length);
    cards[idx].classList.add('featured');
  }

  // 活跃光点：手动维护数组（友链名称放这里即为"活跃"）
  const activeFriends = []; // 例如：['博客名A', '博客名B']
  cards.forEach(function(card) {
    const name = card.querySelector('.friend-name').textContent.trim();
    if (activeFriends.includes(name)) {
      card.classList.add('has-active');
    }
  });
});
