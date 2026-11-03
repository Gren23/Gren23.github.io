// vision-network.js
// 特征点连线背景。旧实现的问题：
//   1. 每帧都调 getColorTheme()，每帧读一次 DOM attribute
//   2. 每帧对 55 个粒子做 O(n²) 两两连线，每条线都 new 一个 strokeStyle（还带正则 replace）
//   3. 页面切到后台仍满速跑 rAF
//   4. 不尊重系统的「减少动态效果」
// 现在：配色只在主题切换时算一次；距离用平方比较避免开方；连线按 alpha 分档批量 stroke；
// 后台自动暂停；prefers-reduced-motion 时直接不启动。
(function () {
  'use strict';

  var canvas = document.getElementById('vision-canvas');
  if (!canvas) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  var CFG = {
    count: 55,
    maxDist: 110,
    maxDistSq: 110 * 110,
    speed: 0.45,
    mouseRadius: 130,
    mouseRadiusSq: 130 * 130
  };

  var particles = [];
  var mouse = { x: null, y: null };
  var rafId = null;
  var palette = null;

  function buildPalette() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    palette = isDark
      ? { dot: 'rgba(147,197,253,0.25)', line: '147,197,253', lineMax: 0.05, mouseLine: '96,165,250', mouseMax: 0.15 }
      : { dot: 'rgba(59,130,246,0.18)', line: '59,130,246', lineMax: 0.04, mouseLine: '59,130,246', mouseMax: 0.12 };
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initParticles() {
    particles = [];
    for (var i = 0; i < CFG.count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * CFG.speed,
        vy: (Math.random() - 0.5) * CFG.speed,
        r: Math.random() * 1.5 + 1
      });
    }
  }

  function draw() {
    var w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    var i, j, p, p2, dx, dy, d2;

    ctx.fillStyle = palette.dot;
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx = -p.vx;
      if (p.y < 0 || p.y > h) p.vy = -p.vy;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.fill();
    }

    // 粒子间连线：按 alpha 分成 5 档，每档合并成一条 path，
    // 把 stroke 调用从 O(n²) 降到 5 次
    ctx.lineWidth = 0.6;
    var buckets = 5;
    for (var b = 0; b < buckets; b++) {
      var lo = b / buckets, hi = (b + 1) / buckets;
      ctx.beginPath();
      var drew = false;
      for (i = 0; i < particles.length; i++) {
        p = particles[i];
        for (j = i + 1; j < particles.length; j++) {
          p2 = particles[j];
          dx = p.x - p2.x;
          dy = p.y - p2.y;
          d2 = dx * dx + dy * dy;
          if (d2 >= CFG.maxDistSq) continue;
          var ratio = 1 - Math.sqrt(d2) / CFG.maxDist;
          if (ratio < lo || ratio >= hi) continue;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          drew = true;
        }
      }
      if (drew) {
        var a = ((lo + hi) / 2) * palette.lineMax;
        ctx.strokeStyle = 'rgba(' + palette.line + ',' + a.toFixed(3) + ')';
        ctx.stroke();
      }
    }

    if (mouse.x !== null && mouse.y !== null) {
      ctx.beginPath();
      var any = false;
      for (i = 0; i < particles.length; i++) {
        p = particles[i];
        dx = p.x - mouse.x;
        dy = p.y - mouse.y;
        d2 = dx * dx + dy * dy;
        if (d2 >= CFG.mouseRadiusSq) continue;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        p.x += (mouse.x - p.x) * 0.015;
        p.y += (mouse.y - p.y) * 0.015;
        any = true;
      }
      if (any) {
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = 'rgba(' + palette.mouseLine + ',' + palette.mouseMax + ')';
        ctx.stroke();
        ctx.lineWidth = 0.6;
      }
    }

    rafId = requestAnimationFrame(draw);
  }

  function start() {
    if (rafId === null) rafId = requestAnimationFrame(draw);
  }
  function stop() {
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
  }

  buildPalette();
  resize();
  initParticles();
  start();

  new MutationObserver(buildPalette)
    .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      initParticles();
    }, 150);
  }, { passive: true });

  var pending = null;
  window.addEventListener('mousemove', function (e) {
    if (pending) return;
    pending = setTimeout(function () {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      pending = null;
    }, 16);
  }, { passive: true });

  window.addEventListener('mouseleave', function () {
    mouse.x = null;
    mouse.y = null;
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });
})();
