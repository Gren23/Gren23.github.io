class VisionNetwork {
  constructor() {
    this.canvas = document.getElementById('vision-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 130 };
    this.config = {
      particleCount: 55,
      connectionDistance: 110,
      speedMultiplier: 0.45
    };

    this._animId = null;
    this._resizeTimer = null;
    this._mousemoveThrottle = null;

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
    // 只改尺寸，保留粒子当前位置（避免 resize 时粒子跳变）
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
    // resize 防抖，避免频繁触发
    window.addEventListener('resize', () => {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(() => this.resize(), 150);
    });

    // mousemove 节流，16ms ≈ 60fps
    window.addEventListener('mousemove', (e) => {
      if (this._mousemoveThrottle) return;
      this._mousemoveThrottle = setTimeout(() => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this._mousemoveThrottle = null;
      }, 16);
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    const { ctx, particles, config, mouse } = this;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const theme = this.getColorTheme();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // 碰边反弹
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // 绘制粒子
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = theme.particleColor;
      ctx.fill();

      // 粒子间连线
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy); // Math.hypot 兼容写法

        if (dist < config.connectionDistance) {
          const alpha = (1 - dist / config.connectionDistance) * 0.4;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = theme.lineColor.replace(/[\d.]+\)$/, `${alpha})`);
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // 鼠标吸附
      if (mouse.x !== null && mouse.y !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const mDist = Math.sqrt(dx * dx + dy * dy);

        if (mDist < mouse.radius) {
          const mAlpha = (1 - mDist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = theme.interactiveLineColor.replace(/[\d.]+\)$/, `${mAlpha})`);
          ctx.lineWidth = 0.8;
          ctx.stroke();

          p.x += (mouse.x - p.x) * 0.015;
          p.y += (mouse.y - p.y) * 0.015;
        }
      }
    }

    this._animId = requestAnimationFrame(() => this.animate());
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new VisionNetwork();
});
