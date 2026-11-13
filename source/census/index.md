---
title: 博客统计
date: 2026-05-20 09:00:00
type: "census"
comments: false
---

## 基础统计

<div id="census-stats"></div>

## 月度趋势

<div id="census-trend"></div>

<style>
/* ===================== 统计卡片 ===================== */
.census-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 14px;
  margin: 22px 0;
}
.stat-card {
  background: rgba(var(--c-primary-rgb), 0.03);
  border: 1px solid rgba(var(--c-primary-rgb), 0.10);
  border-radius: 12px;
  padding: 20px 14px;
  text-align: center;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.3s ease,
              box-shadow 0.3s ease;
}
.stat-card:hover {
  transform: translateY(-3px);
  border-color: rgba(var(--c-primary-rgb), 0.28);
  box-shadow: 0 8px 24px rgba(var(--c-primary-rgb), 0.08);
}
.stat-number {
  font-size: 26px;
  font-weight: 700;
  color: var(--c-primary);
  margin-bottom: 6px;
  font-family: var(--c-font-mono);
  line-height: 1.2;
}
.stat-label {
  font-size: 12px;
  color: var(--c-text-secondary);
  letter-spacing: 0.02em;
}

/* ===================== 数据时间戳 ===================== */
.census-meta {
  font-size: 12px;
  color: var(--c-text-secondary);
  opacity: 0.7;
  font-family: var(--c-font-mono);
  margin: -6px 0 22px;
}

/* ===================== 月度趋势柱状图 ===================== */
.census-trend {
  margin: 22px 0 8px;
  padding: 20px 16px 8px;
  background: rgba(var(--c-primary-rgb), 0.03);
  border: 1px solid rgba(var(--c-primary-rgb), 0.10);
  border-radius: 14px;
}
.census-trend-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 6px;
  height: 160px;
  padding-bottom: 4px;
}
.census-bar-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  min-width: 0;
  position: relative;
}
.census-bar {
  width: 100%;
  max-width: 42px;
  min-height: 3px;
  background: linear-gradient(
    180deg,
    var(--c-primary) 0%,
    rgba(var(--c-primary-rgb), 0.55) 100%
  );
  border-radius: 4px 4px 2px 2px;
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.census-bar-wrap:hover .census-bar {
  opacity: 0.82;
  transform: scaleY(1.02);
  transform-origin: bottom;
}
.census-bar-count {
  font-size: 11px;
  font-weight: 700;
  color: var(--c-primary);
  font-family: var(--c-font-mono);
  margin-bottom: 4px;
  opacity: 0.85;
}
.census-bar-label {
  font-size: 10px;
  color: var(--c-text-secondary);
  font-family: var(--c-font-mono);
  margin-top: 8px;
  opacity: 0.65;
  white-space: nowrap;
}

/* ===================== 深色模式 ===================== */
html[data-theme='dark'] .stat-card,
html[data-theme='dark'] .census-trend {
  background: rgba(100, 181, 246, 0.05);
  border-color: rgba(100, 181, 246, 0.12);
}
html[data-theme='dark'] .stat-card:hover {
  border-color: rgba(100, 181, 246, 0.30);
  box-shadow: 0 8px 24px rgba(100, 181, 246, 0.10);
}
html[data-theme='dark'] .stat-number,
html[data-theme='dark'] .census-bar-count {
  color: #64b5f6;
}
html[data-theme='dark'] .census-bar {
  background: linear-gradient(180deg, #64b5f6 0%, rgba(100, 181, 246, 0.45) 100%);
}

/* ===================== 移动端 ===================== */
@media (max-width: 640px) {
  .census-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .stat-card { padding: 16px 10px; }
  .stat-number { font-size: 22px; }
  .census-trend-bars { height: 120px; gap: 3px; }
  .census-bar-label { font-size: 9px; transform: rotate(-45deg); margin-top: 12px; }
  .census-bar-count { font-size: 9px; }
}
</style>
