---
title: 关于
---
{% raw %}
<style>
.about-wrap {
  max-width: 820px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;
  font-family: 'Noto Sans SC', -apple-system, sans-serif;
}
.about-card {
  background: var(--trans-light);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 24px;
  padding: 2.5rem 3rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 24px rgba(22, 119, 179,0.08);
  transition: box-shadow 0.3s ease;
}
.about-card:hover {
  box-shadow: 0 8px 36px rgba(22, 119, 179,0.14);
}
.about-card h2 {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--primary, #1677B3);
  margin: 0 0 1.2rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid rgba(22, 119, 179,0.15);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.about-card h2::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 1.1em;
  background: var(--primary, #1677B3);
  border-radius: 2px;
}
.about-card p {
  margin: 0 0 0.9rem;
  line-height: 1.85;
  color: var(--font-color, #333);
}
.about-card p:last-child { margin-bottom: 0; }
.about-welcome {
  text-align: center;
  padding: 2rem 3rem 1.5rem;
}
.about-welcome h1 {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--primary, #1677B3);
  margin: 0 0 1rem;
}
.about-welcome .subtitle {
  font-size: 1rem;
  color: #666;
  line-height: 1.8;
  margin: 0 auto;
  max-width: 600px;
}
.about-me-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
}
.about-mini-card {
  background: rgba(255,255,255,0.5);
  border-radius: 14px;
  padding: 1rem 1.2rem;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--font-color, #333);
  border: 1px solid rgba(22, 119, 179,0.1);
  transition: transform 0.2s ease;
}
.about-mini-card:hover { transform: translateY(-2px); }
.about-mini-card strong { color: var(--primary, #1677B3); }
.about-faq-item {
  margin-bottom: 1.2rem;
}
.about-faq-item:last-child { margin-bottom: 0; }
.about-faq-q {
  font-weight: 600;
  color: var(--primary, #1677B3);
  margin-bottom: 0.3rem;
  font-size: 0.95rem;
}
.about-faq-a {
  color: #555;
  line-height: 1.75;
  padding-left: 1rem;
  border-left: 3px solid rgba(22, 119, 179,0.2);
}
.about-resource-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
}
.about-resource-list li {
  padding: 0.5rem 0;
  color: #555;
  line-height: 1.7;
  border-bottom: 1px dashed rgba(22, 119, 179,0.12);
}
.about-resource-list li:last-child { border-bottom: none; }
.about-resource-list li strong { color: var(--primary, #1677B3); }
.about-resource-list li a { color: var(--primary, #1677B3); text-decoration: underline; }
.about-closing {
  text-align: center;
  padding: 2rem 3rem;
}
.about-closing p {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 0.5rem;
}
.about-closing .big-text {
  font-size: 1.05rem;
  color: #444;
}
[data-theme="dark"] .about-card {
  background: rgba(30,40,35,0.6);
  border-color: rgba(255,255,255,0.08);
}
[data-theme="dark"] .about-mini-card {
  background: rgba(255,255,255,0.05);
  border-color: rgba(255,255,255,0.08);
}
@media (max-width: 600px) {
  .about-wrap { padding: 1rem 0.5rem 3rem; }
  .about-card { padding: 1.5rem 1.2rem; border-radius: 18px; }
  .about-welcome, .about-closing { padding: 1.5rem 1.2rem; }
}
</style>

<div class="about-wrap">

  <!-- 欢迎卡片 -->
  <div class="about-card about-welcome">
    <h1>欢迎来到我的博客 👋</h1>
    <p class="subtitle">这是一个出于"折腾"的冲动而诞生的个人空间，也是我为自己开辟的一块小天地。因为工作占据了大部分精力，曾经热爱的游戏也很少碰了，于是琢磨着找点别的事做——就这样，我开始写博客了。</p>
    <p class="subtitle" style="margin-top:0.8rem;">这里没有宏大的愿景，更多的是关于技术学习的记录、一些折腾心得，以及生活中的碎碎念。博客也曾荒废过一段时间，最近又把它捡了回来，顺便把一些之前写好的教程也整理了进来。更新不一定频繁，但会坚持下去。</p>
  </div>

  <!-- 我是谁 -->
  <div class="about-card">
    <h2>我是谁？</h2>
    <div class="about-me-grid">
      <div class="about-mini-card">
        <strong>👤 昵称</strong><br>
        G/ren<br>
        叫我何就好
      </div>
      <div class="about-mini-card">
        <strong>💼 工作</strong><br>
        机器人视觉、工业自动化相关<br>
        机器视觉调试工程师
      </div>
      <div class="about-mini-card">
        <strong>🛠️ 技术栈</strong><br>
        Vision Master · Mech-Vision<br>
        海康相机 · 工业机器人通讯
      </div>
      <div class="about-mini-card">
        <strong>🎯 写博客的初衷</strong><br>
        给自己找个地方安放想法<br>
        顺便整理学习笔记
      </div>
    </div>
    <p style="margin-top:1.2rem; font-size:0.93rem; color:#555;">大家好，我是 G/ren。我的本职工作与机器人视觉、工业自动化有些关系，写博客的最初动机就是为了"找点事做"，把脑子里那些乱窜的想法找个地方安放下来。</p>
    <p style="font-size:0.93rem; color:#555;">博客最吸引我的地方，在于它能提供一个自由表达的空间，回答"你最近在折腾什么？"或者"你是怎样一个人？"这样的问题。它是我存在过的证据之一，或许几百年后，还会有怀旧的学者在研究21世纪早期一个普通技术爱好者的数字生活时，能翻到这个页面，发现这个人还挺有意思（笑）。</p>
  </div>

  <!-- 为什么要写博客 -->
  <div class="about-card">
    <h2>为什么要写博客？</h2>
    <p>最初的理由很简单——为了给自己找点事做。因为工作原因游戏不怎么打了，总觉得业余时间缺了点什么。于是我想到了写博客，从折腾怎么搭一个好看的站点开始，慢慢走到了今天。</p>
    <p>这份冲动一直推着我，让我从一个什么都要查的新手，逐渐对建站和写作有了一些自己的理解。我认识了以前从未留意过的东西：CDN、SEO、页面优化……也加深了对数据备份和网络安全的认识。虽然过程偶尔会踩坑，但回头看还挺有收获的。</p>
    <p>这个博客也曾荒废过一段时间。最近把它重新捡起来，一方面是舍不得之前积累的那些内容，另一方面也觉得，折腾了这么久，不该就这么放下。所以现在又把一些教程文章陆续放上来了，就当是给自己的一个交代。</p>
    <p>希望我的博客能成为你闲暇时的一个"云据点"，欢迎常来踩踩！</p>
  </div>

  <!-- 资源与支持 -->
  <div class="about-card">
    <h2>资源与支持</h2>
    <ul class="about-resource-list">
      <li><strong>壁纸来源：</strong>博客中使用的部分壁纸来自网络分享，如有侵权请联系我删除。</li>
      <li><strong>博客头像：</strong>源自网络图片，特别喜欢这种风格，就拿来当头像了。</li>
      <li><strong>博客主题：</strong>基于 <a href="https://butterfly.js.org/" target="_blank" rel="noopener">Hexo Butterfly</a> 修改，在我眼里它是中文社区最好用的个人博客主题之一。</li>
      <li><strong>友链：</strong>欢迎留言交换友链~</li>
    </ul>
  </div>

  <!-- FAQ -->
  <div class="about-card">
    <h2>FAQ</h2>
    <div class="about-faq-item">
      <div class="about-faq-q">Q: 为什么有些技术文章里的代码看着有点眼熟？</div>
      <div class="about-faq-a">A: 因为我本身并非从事相关行业，有些代码是 AI 辅助生成，也有部分来自官方文档的二次整理和注释。如果是参考了其他人的内容，我会尽量在文章中注明出处。</div>
    </div>
    <div class="about-faq-item">
      <div class="about-faq-q">Q: 博客的样式是自己做的吗？</div>
      <div class="about-faq-a">A: 我并非专业前端，博客基于 Butterfly 主题修改而成。如有兴趣，可以参考我的博客搭建记录。</div>
    </div>
    <div class="about-faq-item">
      <div class="about-faq-q">Q: 看到你写了不少视觉引导相关的文章，你是做这个工作的吗？</div>
      <div class="about-faq-a">A: 是的，我的工作与机器人、机器视觉相关。写这些教程既是自我总结，也希望帮助到刚入行的朋友。</div>
    </div>
  </div>

  <!-- 结语 -->
  <div class="about-card about-closing">
    <p class="big-text">感谢每一位偶然或特意来到这个小站的朋友。</p>
    <p>是你们的浏览和留言，让我的"折腾"有了更多意义。</p>
    <p style="margin-top:1rem; font-weight:600; color:#1677B3;">最后，祝大家身体健康，玩得开心！</p>
  </div>

</div>
{% endraw %}