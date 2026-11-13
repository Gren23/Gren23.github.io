---
title: 文章统计
date: 2021-04-01 01:00:00
type: "charts"
comments: false
---

<style>
/* 图表懒加载占位提示（echarts 到位前显示） */
.chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 320px;
  color: var(--c-text-secondary, #6b7280);
  font-size: 13px;
  font-family: var(--c-font-mono);
  letter-spacing: 1px;
}
</style>

<script>
/* ==========================================================================
   echarts 按需加载
   --------------------------------------------------------------------------
   原来用 <script defer>，defer 虽然不阻塞 HTML 解析，但仍会立刻下载 1.1 MB。
   改成：第一个图表容器进入视口时才注入脚本。

   注意：charts.js 注入的 chartBootstrapper 只轮询 5 秒（wait(50) x 100ms）。
   如果用户很久之后才滚到图表，那个等待窗口早就过了，图表不会绘制。
   所以这里加载完成后主动触发一次 chartsBoot 重跑。
   ========================================================================== */
(function () {
  'use strict';

  var ECHARTS_SRC = '/lib/echarts.min.js';
  var loaded = false;
  var loading = false;

  function whenReady() {
    // chartBootstrapper 里的 run() 逻辑：执行所有 __chartsReady 回调
    var list = window.__chartsReady || [];
    for (var i = 0; i < list.length; i++) {
      try { list[i](); } catch (e) { }
    }
  }

  function loadEcharts() {
    if (loaded || loading) return;
    loading = true;

    var s = document.createElement('script');
    s.src = ECHARTS_SRC;
    s.async = true;
    s.onload = function () {
      loaded = true;
      loading = false;
      // 等一帧，确保 echarts 完成初始化
      setTimeout(whenReady, 50);
    };
    s.onerror = function () {
      loading = false;
      console.error('[charts] echarts 加载失败');
    };
    document.head.appendChild(s);
  }

  function init() {
    var targets = [
      document.getElementById('posts-chart'),
      document.getElementById('tags-chart'),
      document.getElementById('categories-chart')
    ].filter(Boolean);

    if (!targets.length) return;

    // 不支持 IntersectionObserver 就直接加载（老浏览器兜底）
    if (!('IntersectionObserver' in window)) {
      loadEcharts();
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          loadEcharts();
          io.disconnect();
          return;
        }
      }
    }, {
      // 不做提前量：echarts 有 1.1MB，实测图表位置在首屏内时
      // rootMargin 会让它照样立即加载，失去懒加载意义。
      // 改成真正进入视口才加载，配合下面的占位提示避免白屏。
      threshold: 0.01
    });

    targets.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>

<style>
.chart-wrapper {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.chart-title {
  text-align: center;
  font-size: 1.1em;
  color: var(--text-highlight-color);
  margin-bottom: 16px;
  font-weight: 600;
}
</style>

<center>

> 自 2025-01 开始统计 · 数据随构建自动更新

</center>

<div class="chart-wrapper">
  <div class="chart-title"><i class="fas fa-file-alt" style="margin-right:6px"></i>文章发布统计图</div>
  <div id="posts-chart" data-start="2025-01" style="height:320px;width:100%;"></div>
</div>

<div class="chart-wrapper">
  <div class="chart-title"><i class="fas fa-tags" style="margin-right:6px"></i>标签统计图</div>
  <div id="tags-chart" data-length="10" style="height:320px;width:100%;"></div>
</div>

<div class="chart-wrapper">
  <div class="chart-title"><i class="fas fa-folder-open" style="margin-right:6px"></i>分类统计图</div>
  <div id="categories-chart" data-parent="false" style="height:320px;width:100%;"></div>
</div>