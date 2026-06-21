class VisionNetwork {
  constructor() {
    this.canvas = document.getElementById('vision-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 130 };
    this.config = {
      particleCount: 55,       // 轻量特征点
      connectionDistance: 110,  // 缩短连线，紧凑高级
      speedMultiplier: 0.45    // 舒适平缓的飘移阻尼
    };
    
    this.init();
    this.animate();
    this.bindEvents();
  }

  init() {
    this.resize();
    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.config.speedMultiplier,
        vy: (Math.random() - 0.5) * this.config.speedMultiplier,
        radius: Math.random() * 1.5 + 1
      });
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  getColorTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      particleColor: isDark ? 'rgba(147, 197, 253, 0.25)' : 'rgba(59, 130, 246, 0.18)',
      lineColor: isDark ? 'rgba(147, 197, 253, 0.05)' : 'rgba(59, 130, 246, 0.04)',
      interactiveLineColor: isDark ? 'rgba(96, 165, 250, 0.15)' : 'rgba(59, 130, 246, 0.12)'
    };
  }

  bindEvents() {
    window.addEventListener('resize', () => this.init());
    
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const theme = this.getColorTheme();

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = theme.particleColor;
      this.ctx.fill();

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

        if (dist < this.config.connectionDistance) {
          const alpha = (1 - dist / this.config.connectionDistance) * 0.4;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = theme.lineColor.replace(/[\d.]+\)$/, `${alpha})`);
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }

      if (this.mouse.x !== null && this.mouse.y !== null) {
        const mDist = Math.hypot(p.x - this.mouse.x, p.y - this.mouse.y);
        if (mDist < this.mouse.radius) {
          const mAlpha = (1 - mDist / this.mouse.radius) * 0.35;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = theme.interactiveLineColor.replace(/[\d.]+\)$/, `${mAlpha})`);
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
          
          p.x += (this.mouse.x - p.x) * 0.015;
          p.y += (this.mouse.y - p.y) * 0.015;
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new VisionNetwork();
});
