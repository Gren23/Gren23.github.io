---
title: 文章统计
date: 2021-04-01 01:00:00
type: "charts"
comments: false
---

<script src="https://cdn.staticfile.org/echarts/5.4.3/echarts.min.js"></script>

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

# <i class="fas fa-chart-bar" style="margin-right:8px"></i>文章统计

> 自 2025-01 开始统计

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