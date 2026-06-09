---
title: 分类 - 星球轨道
date: 2026-05-22 02:39:00
---

<style>
.categories-page { width: 100%; min-height: calc(100vh - 200px); padding: 40px 20px; }
.cat-desc { text-align: center; font-size: 14px; color: var(--sec-text); margin-bottom: 20px; }
.cat-orbit-wrap { width: 100%; height: 420px; position: relative; }
#cat-orbit-canvas { width: 100%; height: 100%; display: block; }
</style>

<div class="categories-page">
  <p class="cat-desc">🌍 星球轨道样式</p>
  <div class="cat-orbit-wrap">
    <canvas id="cat-orbit-canvas"></canvas>
  </div>
</div>

<script>
(function(){
  const canvas = document.getElementById('cat-orbit-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, mouse = { x: -9999, y: -9999 };
  function resize() { const r = canvas.parentElement.getBoundingClientRect(); W = canvas.width = r.width; H = canvas.height = r.height; }

  const DATA = [
    { name: '前端', count: 4, icon: '🎨' },
    { name: '视觉', count: 4, icon: '👁️' }
  ];
  const PLANETS = DATA.map((c, i) => ({
    name: c.name, icon: c.icon,
    orbitR: 90 + i * 80,
    angle: (i / Math.max(DATA.length, 1)) * Math.PI * 2,
    speed: 0.008 + i * 0.003,
    size: 16 + Math.min(c.count * 2, 20),
    color: ['#6C5CE7','#74b9ff','#fd79a8','#fdcb6e','#55efc4'][i % 5]
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2;
    PLANETS.forEach(p => {
      p.angle += p.speed;
      const px = cx + Math.cos(p.angle) * p.orbitR;
      const py = cy + Math.sin(p.angle) * p.orbitR * 0.5;
      const dx = px - mouse.x, dy = py - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      p.x = dist < 120 ? px + dx * 0.12 : px;
      p.y = dist < 120 ? py + dy * 0.12 : py;

      ctx.strokeStyle = '#a29bfe22'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, p.orbitR, 0, Math.PI * 2); ctx.stroke();

      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      grd.addColorStop(0, p.color + 'aa'); grd.addColorStop(1, p.color + '00');
      ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = `${p.size}px serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(p.icon, p.x, p.y);
      ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '12px sans-serif';
      ctx.fillText(p.name, p.x, p.y + p.size + 14);
    });

    ctx.fillStyle = '#fdcb6e'; ctx.beginPath(); ctx.arc(cx, cy, 12, 0, Math.PI * 2); ctx.fill();
    const sunGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
    sunGrd.addColorStop(0, '#fdcb6e55'); sunGrd.addColorStop(1, '#fdcb6e00');
    ctx.fillStyle = sunGrd; ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2); ctx.fill();

    requestAnimationFrame(draw);
  }

  resize();
  canvas.addEventListener('mousemove', e => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  draw();
})();
</script>