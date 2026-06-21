---
title: 归档
date: 2026-05-20 09:00:00
comments: false
---

<style>
.archive-wrap {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 20px 60px;
  --brand: #3b82f6;
  --brand-light: rgba(59, 130, 246, 0.18);
  --brand-glow: rgba(59, 130, 246, 0.35);
}

/* 页面标题 */
.archive-header {
  text-align: left;
  font-size: 15px;
  margin-bottom: 30px;
  color: #64748b;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
}

/* 统计横幅 */
.archive-stats {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  padding: 14px 24px;
  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.85);
  border-radius: 18px;
  margin-bottom: 28px;
  font-size: 13px;
  color: #64748b;
  font-family: 'Courier New', monospace;
}
.archive-stats .num {
  font-weight: 700;
  color: var(--brand);
  font-size: 15px;
}

/* 搜索过滤区 */
.archive-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 24px;
}
.archive-search {
  flex: 1;
  min-width: 180px;
  position: relative;
}
.archive-search input {
  width: 100%;
  padding: 10px 16px 10px 38px;
  border-radius: 50px;
  border: 1px solid rgba(108,92,231,0.15);
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(8px);
  font-size: 13px;
  color: var(--font-color);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}
.archive-search input:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px var(--brand-light);
}
.archive-search::before {
  content: '🔍';
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  pointer-events: none;
}
.filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.filter-pill {
  padding: 7px 16px;
  border-radius: 50px;
  background: rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.6);
  font-size: 12px;
  font-weight: 500;
  color: var(--sec-text);
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}
.filter-pill:hover {
  background: var(--brand-light);
  border-color: var(--brand);
}
.filter-pill.active {
  background: var(--brand);
  border-color: var(--brand);
  color: #fff;
  box-shadow: 0 4px 14px var(--brand-glow);
}

/* 年份快捷锚点 */
.archive-year-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(108,92,231,0.1);
}
.year-nav-dot {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 50px;
  background: rgba(108,92,231,0.06);
  border: 1px solid rgba(108,92,231,0.12);
  color: var(--sec-text);
  cursor: pointer;
  transition: all 0.2s;
}
.year-nav-dot:hover,
.year-nav-dot.active {
  background: var(--brand);
  border-color: var(--brand);
  color: #fff;
}

/* 时间线主区 */
.archive-timeline {
  position: relative;
  padding-left: 28px;
}
.archive-timeline::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, var(--brand), rgba(108,92,231,0.15));
  opacity: 0.25;
}

/* 年份卡片 */
.year-card {
  margin-bottom: 20px;
  border-radius: 20px;
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.5);
  box-shadow: 0 2px 12px rgba(108,92,231,0.07);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}
.year-card:hover {
  box-shadow: 0 6px 24px rgba(108,92,231,0.13);
}
.year-card.old {
  opacity: 0.75;
}
.year-card.ancient {
  opacity: 0.55;
}
.year-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s;
}
.year-card-header:hover {
  background: rgba(255,255,255,0.3);
}
.year-card-title {
  display: flex;
  align-items: center;
  gap: 10px;
}
.year-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--brand);
  box-shadow: 0 0 8px var(--brand-glow);
  flex-shrink: 0;
}
.year-label {
  font-size: 22px;
  font-weight: 800;
  color: var(--brand);
  letter-spacing: -0.02em;
}
.year-count {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 50px;
  background: var(--brand-light);
  color: var(--brand);
  font-weight: 600;
}
.year-arrow {
  font-size: 16px;
  color: var(--sec-text);
  transition: transform 0.3s ease;
}
.year-card.open .year-arrow {
  transform: rotate(180deg);
}
.year-card-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.45s cubic-bezier(0.34, 1.2, 0.64, 1);
}
.year-card.open .year-card-body {
  max-height: 20000px;
}

/* 月份标签 */
.month-section {
  padding: 0 24px 8px 24px;
}
.month-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--sec-text);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 10px;
  padding-left: 2px;
  opacity: 0.8;
}

/* 文章卡片 */
.post-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 16px;
  border-radius: 14px;
  margin-bottom: 8px;
  background: rgba(255,255,255,0.45);
  border: 1px solid rgba(255,255,255,0.4);
  transition: transform 0.22s cubic-bezier(.34,1.3,.64,1),
              box-shadow 0.22s ease,
              background 0.22s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.post-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--brand), #a29bfe, #74b9ff);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s cubic-bezier(.34,1.2,.64,1);
}
.post-item:hover {
  transform: translateY(-3px);
  background: rgba(255,255,255,0.82);
  box-shadow: 0 6px 20px rgba(108,92,231,0.18);
}
.post-item:hover::after {
  transform: scaleX(1);
}
.post-date {
  font-size: 12px;
  color: var(--sec-text);
  min-width: 44px;
  text-align: center;
  font-weight: 500;
}
.post-title {
  flex: 1;
  font-size: 14px;
  color: var(--font-color);
  font-weight: 500;
  line-height: 1.4;
  transition: color 0.2s;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.post-item:hover .post-title {
  color: var(--brand);
}
.post-tag {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 50px;
  background: var(--brand-light);
  color: var(--brand);
  font-weight: 600;
  white-space: nowrap;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 40px;
  color: var(--sec-text);
  font-size: 13px;
  opacity: 0.6;
}

/* 底部加载更多 */
.load-more-btn {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 32px auto 0;
  padding: 13px 24px;
  text-align: center;
  border-radius: 50px;
  background: rgba(255,255,255,0.55);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(108,92,231,0.2);
  font-size: 13px;
  font-weight: 500;
  color: var(--brand);
  cursor: pointer;
  transition: all 0.25s ease;
}
.load-more-btn:hover {
  background: var(--brand);
  color: #fff;
  box-shadow: 0 6px 20px var(--brand-glow);
  transform: translateY(-2px);
}

/* 过滤状态隐藏 */
.post-item.hidden {
  display: none;
}
.year-card.hidden {
  display: none;
}
.no-result {
  text-align: center;
  padding: 60px 20px;
  color: var(--sec-text);
  font-size: 14px;
  display: none;
}
.no-result.show {
  display: block;
}

/* 暗色模式 */
[data-theme="dark"] .archive-header {
  color: #94a3b8;
}
[data-theme="dark"] .archive-stats,
[data-theme="dark"] .year-card,
[data-theme="dark"] .post-item {
  background: rgba(15, 23, 42, 0.55);
  border-color: rgba(255,255,255,0.05);
}
[data-theme="dark"] .year-card:hover {
  border-color: rgba(96, 165, 250, 0.3) !important;
  box-shadow: 0 8px 24px rgba(96, 165, 250, 0.12) !important;
}
[data-theme="dark"] .archive-search input {
  background: rgba(15, 23, 42, 0.7);
  color: var(--font-color);
  border-color: rgba(59, 130, 246, 0.15);
}
[data-theme="dark"] .filter-pill {
  background: rgba(255,255,255,0.06);
  border-color: rgba(255,255,255,0.1);
  color: var(--sec-text);
}
[data-theme="dark"] .filter-pill:hover {
  background: rgba(59, 130, 246, 0.12);
  border-color: rgba(59, 130, 246, 0.3);
}
[data-theme="dark"] .filter-pill.active {
  background: #60a5fa;
  border-color: #60a5fa;
  color: #0f172a;
}
[data-theme="dark"] .year-card-header:hover {
  background: rgba(255,255,255,0.05);
}
[data-theme="dark"] .post-item:hover .post-title {
  color: #60a5fa;
}
[data-theme="dark"] .year-card {
  border-color: rgba(255,255,255,0.04);
}

/* 移动端 */
@media screen and (max-width: 600px) {
  .archive-stats { font-size: 12px; gap: 10px; }
  .archive-filter { flex-direction: column; }
  .archive-search { width: 100%; }
  .archive-year-nav { gap: 6px; }
  .year-card-header { padding: 14px 16px; }
  .month-section { padding: 0 16px 8px; }
  .post-item { padding: 12px; }
}
</style>

<div class="archive-wrap">
  <!-- 统计横幅 -->
  <div class="archive-header">// TIMELINE_ARCHIVES //</div>
  <div class="archive-stats" id="archive-stats"></div>

  <!-- 搜索与过滤 -->
  <div class="archive-filter">
    <div class="archive-search">
      <input type="text" id="archive-search-input" placeholder="搜索文章标题…" autocomplete="off" />
    </div>
    <div class="filter-pills" id="filter-pills"></div>
  </div>

  <!-- 年份快捷锚点 -->
  <div class="archive-year-nav" id="archive-year-nav"></div>

  <!-- 时间线 -->
  <div class="archive-timeline" id="archive-timeline"></div>

  <div class="no-result" id="no-result">没有找到符合条件的文章</div>
  <button class="load-more-btn" id="load-more-btn" style="display:none;">查看更早的文章 ↓</button>
</div>

<script>
(function() {
  var allData = [];
  var renderedYears = [];
  var visibleCount = 0;
  var searchKeyword = '';
  var activeCategory = 'all';
  var INITIAL_YEARS = 2;

  var MONTHS = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

  function getAge(year) {
    var currentYear = new Date().getFullYear();
    return currentYear - year;
  }

  function getWeightClass(year) {
    var age = getAge(year);
    if (age >= 3) return 'ancient';
    if (age >= 1) return 'old';
    return '';
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr);
    return d.getDate();
  }

  function getMonthStr(dateStr) {
    var d = new Date(dateStr);
    return MONTHS[d.getMonth()];
  }

  function getCategory(post) {
    if (!post.categories || post.categories.length === 0) return '';
    return post.categories[0];
  }

  function getCategories(data) {
    var cats = {};
    data.forEach(function(post) {
      if (post.categories && post.categories.length > 0) {
        cats[post.categories[0]] = true;
      }
    });
    return Object.keys(cats).sort();
  }

  function buildStats(data) {
    var years = {};
    var total = data.length;
    var allTags = {};
    data.forEach(function(post) {
      var y = new Date(post.date).getFullYear();
      years[y] = true;
      if (post.tags) {
        post.tags.forEach(function(t) { allTags[t] = true; });
      }
    });
    var yearCount = Object.keys(years).length;
    var tagCount = Object.keys(allTags).length;
    document.getElementById('archive-stats').innerHTML =
      '共 <span class="num">' + yearCount + ' 年</span> · <span class="num">' + total + ' 篇文章</span> · <span class="num">' + tagCount + ' 个标签</span>';
  }

  function buildFilterPills(data) {
    var cats = getCategories(data);
    var container = document.getElementById('filter-pills');
    var html = '<span class="filter-pill active" data-cat="all">全部</span>';
    cats.forEach(function(cat) {
      html += '<span class="filter-pill" data-cat="' + cat + '">' + cat + '</span>';
    });
    container.innerHTML = html;

    container.querySelectorAll('.filter-pill').forEach(function(pill) {
      pill.addEventListener('click', function() {
        container.querySelectorAll('.filter-pill').forEach(function(p) { p.classList.remove('active'); });
        this.classList.add('active');
        activeCategory = this.getAttribute('data-cat');
        searchKeyword = document.getElementById('archive-search-input').value.trim().toLowerCase();
        rerender();
      });
    });
  }

  function buildYearNav(data) {
    var years = {};
    data.forEach(function(post) {
      years[new Date(post.date).getFullYear()] = true;
    });
    var sorted = Object.keys(years).sort(function(a,b){ return b-a; });
    var nav = document.getElementById('archive-year-nav');
    nav.innerHTML = sorted.map(function(y) {
      return '<span class="year-nav-dot' + (y == sorted[0] ? ' active' : '') + '" data-year="' + y + '">' + y + '</span>';
    }).join(' · ');

    nav.querySelectorAll('.year-nav-dot').forEach(function(dot) {
      dot.addEventListener('click', function() {
        var year = this.getAttribute('data-year');
        nav.querySelectorAll('.year-nav-dot').forEach(function(d) { d.classList.remove('active'); });
        this.classList.add('active');
        document.getElementById('year-card-' + year).scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function buildTimeline(data) {
    var byYear = {};
    data.forEach(function(post) {
      var y = new Date(post.date).getFullYear();
      if (!byYear[y]) byYear[y] = {};
      var m = new Date(post.date).getMonth() + 1;
      if (!byYear[y][m]) byYear[y][m] = [];
      byYear[y][m].push(post);
    });
    var years = Object.keys(byYear).sort(function(a,b){ return b-a; });
    var tl = document.getElementById('archive-timeline');
    tl.innerHTML = '';
    allData = data;
    renderedYears = years;
    visibleCount = 0;

    years.forEach(function(year) {
      var months = Object.keys(byYear[year]).sort(function(a,b){ return b-a; });
      var totalPosts = 0;
      months.forEach(function(m) { totalPosts += byYear[year][m].length; });

      var card = document.createElement('div');
      card.className = 'year-card ' + getWeightClass(year);
      card.id = 'year-card-' + year;
      if (visibleCount >= INITIAL_YEARS) card.classList.add('hidden');
      if (visibleCount < INITIAL_YEARS) visibleCount++;

      var bodyHtml = '';
      months.forEach(function(m) {
        var posts = byYear[year][m];
        totalPosts += 0;
        bodyHtml += '<div class="month-section"><div class="month-label">' + MONTHS[m-1] + '</div>';
        posts.forEach(function(post) {
          var tag = getCategory(post);
          var tagHtml = tag ? '<span class="post-tag">' + tag + '</span>' : '';
          bodyHtml += '<div class="post-item" onclick="location.href=\'/' + post.path + '\'">' +
            '<span class="post-date">' + formatDate(post.date) + '日</span>' +
            '<span class="post-title">' + post.title + '</span>' + tagHtml +
            '</div>';
        });
        bodyHtml += '</div>';
      });

      card.innerHTML =
        '<div class="year-card-header" onclick="toggleYear(\'' + year + '\')">' +
          '<div class="year-card-title">' +
            '<span class="year-dot"></span>' +
            '<span class="year-label">' + year + '</span>' +
            '<span class="year-count">' + totalPosts + ' 篇</span>' +
          '</div>' +
          '<span class="year-arrow">▾</span>' +
        '</div>' +
        '<div class="year-card-body" id="year-body-' + year + '">' + bodyHtml + '</div>';

      // 默认展开最近一年
      if (visibleCount === 1) {
        card.classList.add('open');
      }

      tl.appendChild(card);
    });

    // 加载更多按钮
    var btn = document.getElementById('load-more-btn');
    if (visibleCount < years.length) {
      btn.style.display = 'block';
      btn.style.display = '';
    }
  }

  function rerender() {
    var filtered = allData.filter(function(post) {
      var matchKw = !searchKeyword || post.title.toLowerCase().includes(searchKeyword);
      var matchCat = activeCategory === 'all' || (post.categories && post.categories.indexOf(activeCategory) !== -1);
      return matchKw && matchCat;
    });

    if (filtered.length === 0) {
      document.getElementById('archive-timeline').style.display = 'none';
      document.getElementById('no-result').classList.add('show');
      document.getElementById('load-more-btn').style.display = 'none';
      return;
    }
    document.getElementById('archive-timeline').style.display = '';
    document.getElementById('no-result').classList.remove('show');

    var byYear = {};
    filtered.forEach(function(post) {
      var y = new Date(post.date).getFullYear();
      if (!byYear[y]) byYear[y] = {};
      var m = new Date(post.date).getMonth() + 1;
      if (!byYear[y][m]) byYear[y][m] = [];
      byYear[y][m].push(post);
    });
    var years = Object.keys(byYear).sort(function(a,b){ return b-a; });

    var tl = document.getElementById('archive-timeline');
    tl.innerHTML = '';

    years.forEach(function(year) {
      var months = Object.keys(byYear[year]).sort(function(a,b){ return b-a; });
      var totalPosts = 0;
      months.forEach(function(m) { totalPosts += byYear[year][m].length; });

      var card = document.createElement('div');
      card.className = 'year-card ' + getWeightClass(year);
      card.id = 'year-card-' + year;

      var bodyHtml = '';
      months.forEach(function(m) {
        var posts = byYear[year][m];
        bodyHtml += '<div class="month-section"><div class="month-label">' + MONTHS[m-1] + '</div>';
        posts.forEach(function(post) {
          var tag = getCategory(post);
          var tagHtml = tag ? '<span class="post-tag">' + tag + '</span>' : '';
          bodyHtml += '<div class="post-item" onclick="location.href=\'/' + post.path + '\'">' +
            '<span class="post-date">' + formatDate(post.date) + '日</span>' +
            '<span class="post-title">' + post.title + '</span>' + tagHtml +
            '</div>';
        });
        bodyHtml += '</div>';
      });

      card.innerHTML =
        '<div class="year-card-header" onclick="toggleYear(\'' + year + '\')">' +
          '<div class="year-card-title">' +
            '<span class="year-dot"></span>' +
            '<span class="year-label">' + year + '</span>' +
            '<span class="year-count">' + totalPosts + ' 篇</span>' +
          '</div>' +
          '<span class="year-arrow">▾</span>' +
        '</div>' +
        '<div class="year-card-body" id="year-body-' + year + '">' + bodyHtml + '</div>';

      card.classList.add('open');
      tl.appendChild(card);
    });
  }

  window.toggleYear = function(year) {
    var card = document.getElementById('year-card-' + year);
    var body = document.getElementById('year-body-' + year);
    if (!card || !body) return;
    var isOpen = card.classList.contains('open');
    if (isOpen) {
      card.classList.remove('open');
    } else {
      card.classList.add('open');
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  document.getElementById('archive-search-input').addEventListener('input', function() {
    searchKeyword = this.value.trim().toLowerCase();
    rerender();
  });

  document.getElementById('load-more-btn').addEventListener('click', function() {
    var cards = document.querySelectorAll('.year-card.hidden');
    var count = 0;
    cards.forEach(function(card) {
      if (count < 1) {
        card.classList.remove('hidden');
        count++;
      }
    });
    if (cards.length <= 1) this.style.display = 'none';
  });

  fetch('/api/archives.json').then(function(r){ return r.json(); })
    .then(function(data) {
      // 按日期降序
      data.sort(function(a,b){ return new Date(b.posts[0].date) - new Date(a.posts[0].date); });
      // 拍平
      var flat = [];
      data.forEach(function(y) {
        y.posts.forEach(function(p) {
          flat.push({
            title: p.title,
            url: p.url,
            date: p.date,
            path: p.url.replace(/^\//, ''),
            categories: p.categories || [],
            tags: p.tags || []
          });
        });
      });
      buildStats(flat);
      buildFilterPills(flat);
      buildYearNav(flat);
      buildTimeline(flat);
    });
})();
</script>