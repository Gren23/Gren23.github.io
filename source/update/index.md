---
title: 博客更新
date: 2026-05-20 09:00:00
type: "update"
comments: false
---

## 🔄 博客更新日志

---

## 📋 更新历史

<style>
.timeline { position: relative; padding-left: 24px; margin: 20px 0; }
.timeline::before { content: ''; position: absolute; left: 6px; top: 0; bottom: 0; width: 2px; background: var(--border); }
.timeline-item { position: relative; margin-bottom: 28px; }
.timeline-item::before { content: ''; position: absolute; left: -22px; top: 6px; width: 10px; height: 10px; border-radius: 50%; background: var(--text-highlight); }
.timeline-date { font-size: 12px; opacity: 0.6; margin-bottom: 2px; }
.timeline-version { font-weight: 600; margin-bottom: 4px; }
.timeline-content { font-size: 13px; opacity: 0.8; line-height: 1.7; }
.timeline-section { margin-top: 20px; }
.timeline-section-title { font-size: 12px; font-weight: 600; color: var(--text-highlight); margin-bottom: 8px; }
.timeline-section ul { margin: 0; padding-left: 20px; }
.timeline-section li { margin-bottom: 4px; }
</style>

### 2026-06-19

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">2026-06-19</div>
    <div class="timeline-version">⚡ 性能优化 v2.0</div>
    <div class="timeline-content">
      <div class="timeline-section">
        <div class="timeline-section-title">修复隐藏 Bug</div>
        <ul>
          <li>Font Awesome 的 key 名写错（fontawesomeV6），主题实际一直走 unpkg CDN，现已修复为 R2 CDN</li>
        </ul>
      </div>
      <div class="timeline-section">
        <div class="timeline-section-title">移除冗余资源</div>
        <ul>
          <li>删除全局 ECharts（~1MB）+ Element UI（~200KB），共约 1.2MB</li>
        </ul>
      </div>
      <div class="timeline-section">
        <div class="timeline-section-title">加载优化</div>
        <ul>
          <li>jQuery 改为 defer 异步加载</li>
          <li>第三方 CDN 统一换为 cdnjs / jsdelivr（替换 tianli0、npm.elemecdn 等不稳定源）</li>
          <li>删除未使用的 Noto Sans SC Google Fonts 同步链接</li>
        </ul>
      </div>
      <div class="timeline-section">
        <div class="timeline-section-title">性能提升</div>
        <ul>
          <li>桌面得分 71 → 87，移动端得分 78 → 89</li>
          <li>LCP 桌面 2.5s → 1.4s，移动端 3.7s → 2.7s</li>
        </ul>
      </div>
      <div class="timeline-section">
        <div class="timeline-section-title">Bug 修复</div>
        <ul>
          <li>Font Awesome Android 图标方块：R2 CSS font-display:block 改为 swap，相对路径改为绝对路径</li>
        </ul>
      </div>
    </div>
  </div>
</div>

### 2026-06-17

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">2026-06-17</div>
    <div class="timeline-version">🎨 归档/分类/标签页全新改版</div>
    <div class="timeline-content">
      <div class="timeline-section">
        <div class="timeline-section-title">归档页</div>
        <ul>
          <li>颜色从紫色改为蓝色</li>
          <li>加 <code>// TIMELINE_ARCHIVES //</code> 标题，monospace 字体风格</li>
          <li>统计数字改 Courier New 字体</li>
          <li>暗黑模式细节完善</li>
        </ul>
      </div>
      <div class="timeline-section">
        <div class="timeline-section-title">分类/标签子页</div>
        <ul>
          <li>蓝色卡片风格（hover 上浮 + 阴影）</li>
          <li>日期用 Courier New 字体</li>
          <li>暗黑模式适配</li>
        </ul>
      </div>
      <div class="timeline-section">
        <div class="timeline-section-title">分类首页</div>
        <ul>
          <li>恢复瀑布流卡片布局</li>
          <li>关闭评论区</li>
        </ul>
      </div>
      <div class="timeline-section">
        <div class="timeline-section-title">标签页</div>
        <ul>
          <li>胶囊卡片网格布局</li>
          <li>悬停动画优化</li>
          <li>关闭评论区</li>
        </ul>
      </div>
      <div class="timeline-section">
        <div class="timeline-section-title">Bug 修复</div>
        <ul>
          <li>footer 暗黑模式背景仍为白色问题</li>
        </ul>
      </div>
    </div>
  </div>
</div>

### 2026-05-23

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">2026-05-23</div>
    <div class="timeline-version">🚀 博客整体重构</div>
    <div class="timeline-content">
      <ul>
        <li>清理历史残留文件</li>
        <li>删除旧 node_modules，优化项目结构</li>
        <li>修复 supertool 中封面生成器跳转链接错误</li>
      </ul>
    </div>
  </div>
</div>

### 2026-06-12

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">2026-06-12</div>
    <div class="timeline-version">🧭 导航栏精简</div>
    <div class="timeline-content">
      <ul>
        <li>主导航去掉「工具」「文章」「统计」「博客」四个嵌套子菜单，保留简洁一级导航</li>
        <li>工具类页面收到 Footer 导航栏下</li>
      </ul>
    </div>
  </div>
</div>

### 2026-06-10

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">2026-06-10</div>
    <div class="timeline-version">⬆️ 基础框架升级</div>
    <div class="timeline-content">
      <ul>
        <li>Hexo 升级到 8.1.1</li>
        <li>Butterfly 主题升级到 5.5.4</li>
        <li>新增 sitemap.xml / robots.txt</li>
      </ul>
    </div>
  </div>
</div>

### 2026-06-01 ~ 2026-06-13

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">2026-06-01 ~ 2026-06-13</div>
    <div class="timeline-version">🛠️ 超级工作台</div>
    <div class="timeline-content">
      <ul>
        <li>新增 <code>/tools/frontmatter-generator/</code>（文章属性生成器）</li>
        <li>整合到 supertool 目录下，菜单 → "创作助手"（封面生成器 / Front Matter 生成器两个 Tab）</li>
        <li>工具页背景统一改为浅色 #f5f5f5</li>
        <li>完整梳理 blog/ 目录结构</li>
      </ul>
    </div>
  </div>
</div>

### 2026-05-31

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">2026-05-31</div>
    <div class="timeline-version">🖼️ 封面生成器</div>
    <div class="timeline-content">
      <ul>
        <li>实现 HTML/CSS + Canvas 本地化封面生成方案</li>
        <li>与博客风格完全统一</li>
      </ul>
    </div>
  </div>
</div>

### 2026-05-29

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">2026-05-29</div>
    <div class="timeline-version">💬 Twikoo 升级</div>
    <div class="timeline-content">
      <ul>
        <li>评论系统从 1.6.44 升级到 1.7.9</li>
      </ul>
    </div>
  </div>
</div>

### 2026-05-26

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">2026-05-26</div>
    <div class="timeline-version">🐛 评论系统修复</div>
    <div class="timeline-content">
      <ul>
        <li>修复 <code>comments.use: Utterances</code> 配置错误</li>
        <li>评论系统从 Utterances 切回 Twikoo，解决评论框消失问题</li>
      </ul>
    </div>
  </div>
</div>

### 2026-05-25

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">2026-05-25</div>
    <div class="timeline-version">🧹 博客大清理</div>
    <div class="timeline-content">
      <ul>
        <li>删除多余 highlight.js 主题、themes/butterfly_old、主题 zip 文件</li>
        <li>共释放约 500MB+ 空间</li>
        <li>评论系统从 Hyvor Talk 切换为 Twikoo（Netlify Functions 部署）</li>
      </ul>
    </div>
  </div>
</div>

### 2026-05-23

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">2026-05-23</div>
    <div class="timeline-version">🎯 导航栏全新改版</div>
    <div class="timeline-content">
      <ul>
        <li>仿 Eurkon 主题风格，二级菜单："文章 → 分类/标签"、"统计 → 文章统计/博客统计"、"博客 → 更新/公告/信箱/关于"</li>
        <li>新建页面全部卡片化 + emoji 风格：文章统计、博客统计、友链、公告、博客更新、留言板、友链订阅、评论协议、版权协议</li>
        <li>Footer 导航加入 emoji 图标</li>
      </ul>
    </div>
  </div>
</div>

### 2026-05-20

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">2026-05-20</div>
    <div class="timeline-version">⬆️ 框架升级 + 评论系统切换</div>
    <div class="timeline-content">
      <ul>
        <li>Hexo 升级到 8.1.1，Butterfly 主题升级到 5.5.4</li>
        <li>博客统计脚本整理（census_stats.js、charts.js、fix-category-path.js）</li>
        <li>新增 sitemap.xml 和 robots.txt</li>
        <li>对比 Gitalk、Valine、Waline、Disqus，最终选择 Twikoo</li>
        <li>域名切换到新域名</li>
      </ul>
    </div>
  </div>
</div>

---
