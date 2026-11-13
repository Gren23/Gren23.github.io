---
title: 标签
date: 2024-01-01 12:00:00
type: custom-tags
comments: false
---

<style>
#page-site-info { text-align: left !important; }

/* 加载提示 */
.tag-card-loading {
  font-family: var(--c-font-mono);
  font-size: 13px;
  color: #94a3b8;
  padding: 20px 4px;
  letter-spacing: 1px;
}
</style>

{% raw %}
<div class="tag-card-page" id="tagCardPage">
  <div class="tag-card-title">// 3D_POINT_CLOUD_CLUSTERS //</div>

  <div class="tag-card-grid" id="tagGrid">
    <!-- 正交投影 X-Y 双轴准星 -->
    <div id="point-cloud-axis-x"></div>
    <div id="point-cloud-axis-y"></div><div id="point-cloud-axis-y"></div>

    <!-- 卡片由 JS 从 /api/tags.json 动态生成，增删文章自动同步 -->
    <div class="tag-card-loading" id="tagLoading">加载中…</div>
  </div>
</div>
{% endraw %}

<style>
/* ================== 标签页卡片网格样式 ================== */

/* 主面板 */
.tag-card-page {
  width: 100%;
  padding: 20px 10px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}
.tag-card-title {
  text-align: left;
  font-size: 15px;
  margin-bottom: 30px;
  color: #64748b;
  font-family: var(--c-font-mono);
  letter-spacing: 1px;
}

/* 标签云网格 */
.tag-card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}

/* 正交投影轴 */
#point-cloud-axis-x {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  border-top: 1px dashed rgba(239, 68, 68, 0.25);
  pointer-events: none;
  z-index: 0;
  display: none;
}
#point-cloud-axis-y {
  position: absolute;
  top: 0;
  height: 100%;
  width: 1px;
  border-left: 1px dashed rgba(16, 185, 129, 0.25);
  pointer-events: none;
  z-index: 0;
  display: none;
}

/* 胶囊气泡特征块卡片 */
.tag-card-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
  color: #334155 !important;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.35s ease,
              box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
  z-index: 1;
}

/* 悬停微动：向上抬起 + 淡蓝发光阴影 */
.tag-card-item:hover {
  transform: translateY(-4px) scale(1.03) !important;
  border-color: rgba(59, 130, 246, 0.45) !important;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.08) !important;
  color: #3b82f6 !important;
}

/* 计数气泡 */
.tag-card-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 10px;
  background: rgba(59, 130, 246, 0.06);
  font-size: 10.5px;
  font-weight: bold;
  color: #3b82f6;
  font-family: var(--c-font-mono);
  border: 1px solid rgba(59, 130, 246, 0.12);
  transition: all 0.3s ease;
}
.tag-card-item:hover .tag-card-count {
  background: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
}

/* OSD 点云聚类参数悬浮显示 */
.tag-point-telemetry {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: 5px;
  padding: 2px 6px;
  font-family: var(--c-font-mono);
  font-size: 8.5px;
  color: #3b82f6;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 5;
}
.tag-card-item:hover .tag-point-telemetry {
  top: -16px;
  opacity: 1;
}

/* 暗黑模式 */
[data-theme="dark"] .tag-card-item {
  background: rgba(15, 23, 42, 0.5) !important;
  border-color: rgba(255, 255, 255, 0.04) !important;
  color: #f1f5f9 !important;
}
[data-theme="dark"] .tag-card-item:hover {
  color: #49b1f5 !important;
  box-shadow: 0 8px 24px rgba(22, 119, 179, 0.12) !important;
}
[data-theme="dark"] .tag-card-count {
  background: rgba(22, 119, 179, 0.08);
  color: #49b1f5;
  border-color: rgba(22, 119, 179, 0.15);
}
[data-theme="dark"] .tag-card-count:hover {
  background: #49b1f5;
  color: #0f172a;
}
[data-theme="dark"] .tag-point-telemetry {
  background: rgba(0, 0, 0, 0.4);
  border-color: rgba(22, 119, 179, 0.2);
  color: #49b1f5;
}
</style>

<script>
(function () {
  'use strict';

  // ===== 字体大小分档（按文章数）=====
  // 保持原有的视觉层级：12+ 篇最大，3+ 次之，2+ 再次，1 最小
  function fontSizeOf(count) {
    if (count >= 10) return 1.50;
    if (count >= 5) return 1.30;
    if (count >= 3) return 1.27;
    if (count >= 2) return 1.25;
    return 1.22;
  }

  // ===== 遥测坐标（纯装饰，用稳定伪随机保证刷新不变）=====
  function telemetryOf(name, index) {
    // 用标签名做种子，保证同一标签每次显示相同数值
    var seed = 0;
    for (var i = 0; i < name.length; i++) {
      seed = (seed * 31 + name.charCodeAt(i)) % 100000;
    }
    var z = (seed % 4000) / 10 + 40;          // 40.0 ~ 440.0
    var code = String(index + 1).padStart(2, '0');
    return '[C:' + code + '] [Z:' + z.toFixed(1) + 'mm] [LOCK]';
  }

  // ===== 渲染卡片 =====
  function render(tags) {
    var grid = document.getElementById('tagGrid');
    var loading = document.getElementById('tagLoading');
    if (!grid) return;
    if (loading) loading.remove();

    // 按文章数降序，同数量按名称排
    tags.sort(function (a, b) {
      if (b.length !== a.length) return b.length - a.length;
      return a.name.localeCompare(b.name, 'zh');
    });

    var frag = document.createDocumentFragment();
    tags.forEach(function (tag, idx) {
      var a = document.createElement('a');
      a.href = '/tags/' + encodeURIComponent(tag.name) + '/';
      a.className = 'tag-card-item';
      a.style.fontSize = fontSizeOf(tag.length) + 'em';

      var nameSpan = document.createElement('span');
      nameSpan.textContent = tag.name;
      a.appendChild(nameSpan);

      var countSpan = document.createElement('span');
      countSpan.className = 'tag-card-count';
      countSpan.textContent = tag.length;
      a.appendChild(countSpan);

      var tele = document.createElement('div');
      tele.className = 'tag-point-telemetry';
      tele.textContent = telemetryOf(tag.name, idx);
      a.appendChild(tele);

      frag.appendChild(a);
    });

    grid.appendChild(frag);

    // 绑定准星追踪（原有效果）
    var axisX = document.getElementById('point-cloud-axis-x');
    var axisY = document.getElementById('point-cloud-axis-y');
    if (!axisX || !axisY) return;

    grid.querySelectorAll('.tag-card-item').forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        var cx = item.offsetLeft + item.offsetWidth / 2;
        var cy = item.offsetTop + item.offsetHeight / 2;
        axisX.style.top = cy + 'px';
        axisY.style.left = cx + 'px';
        axisX.style.display = 'block';
        axisY.style.display = 'block';
      });
      item.addEventListener('mouseleave', function () {
        axisX.style.display = 'none';
        axisY.style.display = 'none';
      });
    });
  }

  // ===== 加载数据 =====
  function load() {
    fetch('/api/tags.json')
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (tags) {
        if (!Array.isArray(tags) || tags.length === 0) throw new Error('空数据');
        render(tags);
      })
      .catch(function (err) {
        var loading = document.getElementById('tagLoading');
        if (loading) {
          loading.textContent = '标签加载失败：' + err.message;
          loading.style.color = '#ef4444';
        }
        console.error('[tags] 加载失败', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
</script>
