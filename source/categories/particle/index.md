---
title: 分类 - 粒子连线
date: 2026-05-22 02:37:00
---

<style>
.categories-page { width: 100%; min-height: calc(100vh - 200px); padding: 40px 20px; }
.cat-desc { text-align: center; font-size: 14px; color: var(--sec-text); margin-bottom: 20px; }
.cat-particle-wrap { width: 100%; height: 420px; position: relative; border-radius: 12px; overflow: hidden; }
#cat-particle-canvas { width: 100%; height: 100%; display: block; background: var(--card-bg); }
.cat-particle-hint { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); font-size: 12px; color: var(--sec-text); opacity: 0.5; pointer-events: none; }
</style>

<div class="categories-page">
  <p class="cat-desc">✨ 粒子连线样式</p>
  <div class="cat-particle-wrap">
    <canvas id="cat-particle-canvas"></canvas>
    <div class="cat-particle-hint">移动鼠标与粒子互动</div>
  </div>
</div>

<script>
(function(){
  const canvas = document.getElementById('cat-particle-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -9999, y: -9999 };
  const COLORS = ['#6C5CE7','#74b9ff','#a29bfe','#fd79a8','#fdcb6e','#55efc4'];
  const DEPTH = 600;

  const DATA = [
    { name: '前端', count: 4, icon: '🎨' },
    { name: '视觉', count: 4, icon: '👁️' }
  ];

  function resize() { const r = canvas.parentElement.getBoundingClientRect(); W = canvas.width = r.width; H = canvas.height = r.height; }
  class P {
    constructor(idx) {
      const cat = DATA[idx % DATA.length];
      this.baseX = (Math.random()-0.5)*800; this.baseY = (Math.random()-0.5)*400; this.baseZ = (Math.random()-0.5)*600;
      this.size = Math.random()*3+1.5 + cat.count * 0.3;
      this.color = COLORS[idx % COLORS.length];
      this.angleX = Math.random()*Math.PI*2; this.angleY = Math.random()*Math.PI*2;
      this.rotSpeedX = (Math.random()-0.5)*0.006; this.rotSpeedY = (Math.random()-0.5)*0.006;
      this.opacity = Math.random()*0.5+0.5;
      this.cat = cat;
    }
    update() {
      this.angleX += this.rotSpeedX; this.angleY += this.rotSpeedY;
      let x=this.baseX,y=this.baseY,z=this.baseZ,t;
      t=y*Math.cos(this.angleX)-z*Math.sin(this.angleX); z=y*Math.sin(this.angleX)+z*Math.cos(this.angleX); y=t;
      t=x*Math.cos(this.angleY)-z*Math.sin(this.angleY); z=x*Math.sin(this.angleY)+z*Math.cos(this.angleY); x=t;
      const sx=(x/(DEPTH+z+DEPTH))*W*0.7+W/2, sy=(y/(DEPTH+z+DEPTH))*H*0.7+H/2;
      const dx=sx-mouse.x, dy=sy-mouse.y, dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120){ const f=(120-dist)/120; this.baseX+=dx*f*0.04; this.baseY+=dy*f*0.04; }
      this.x=x; this.y=y; this.z=z;
    }
    draw() {
      const sx=(this.x/(DEPTH+this.z+DEPTH))*W*0.7+W/2, sy=(this.y/(DEPTH+this.z+DEPTH))*H*0.7+H/2;
      const scale=DEPTH/(DEPTH+this.z+DEPTH), r=this.size*scale*1.5;
      if(scale<0.05)return;
      ctx.globalAlpha=this.opacity*Math.min(scale*2,1);
      ctx.fillStyle=this.color; ctx.beginPath(); ctx.arc(sx,sy,r,0,Math.PI*2); ctx.fill();
    }
  }
  function draw() {
    ctx.clearRect(0,0,W,H);
    particles.sort((a,b)=>b.z-a.z);
    ctx.lineWidth=0.5;
    for(let i=0;i<particles.length;i++){
      particles[i].update();
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y, dz=particles[i].z-particles[j].z;
        const d=Math.sqrt(dx*dx+dy*dy+dz*dz);
        if(d<180){
          const sx1=(particles[i].x/(DEPTH+particles[i].z+DEPTH))*W*0.7+W/2, sy1=(particles[i].y/(DEPTH+particles[i].z+DEPTH))*H*0.7+H/2;
          const sx2=(particles[j].x/(DEPTH+particles[j].z+DEPTH))*W*0.7+W/2, sy2=(particles[j].y/(DEPTH+particles[j].z+DEPTH))*H*0.7+H/2;
          ctx.globalAlpha=(1-d/180)*0.12; ctx.strokeStyle='#a29bfe'; ctx.beginPath(); ctx.moveTo(sx1,sy1); ctx.lineTo(sx2,sy2); ctx.stroke();
        }
      }
    }
    ctx.globalAlpha=1;
    particles.forEach(p=>p.draw());
    requestAnimationFrame(draw);
  }
  resize();
  particles=Array.from({length:80},(_,i)=>new P(i));
  canvas.addEventListener('mousemove',e=>{ const r=canvas.getBoundingClientRect(); mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top; });
  canvas.addEventListener('mouseleave',()=>{ mouse.x=-9999; mouse.y=-9999; });
  draw();
})();
</script>