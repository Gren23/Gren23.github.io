# 博客配置与界面映射手册

> 每次改界面/布局/样式前先查这份表，定位到具体文件。
> 最后核对时间：2026-11-03（对照线上 v`c5dbd352` 实测）

---

## 〇、三句话总览

1. **配置分两层**：根 `_config.yml`（Hexo 本体）+ 根 `_config.butterfly.yml`（主题）。
   `themes/butterfly/_config.yml` 是主题**默认值**，根配置没写的键会回退到它——改它等于改所有没显式覆盖的地方。
2. **界面结构在** `themes/butterfly/layout/`（Pug 模板），**样式在** `source/css/`（自定义）+ 主题编译产物 `css/index.css`。
3. **单个页面的内容在** `source/<页面>/index.md`，页面用 `type:` 决定套哪个模板。

---

## 一、配置文件职责

| 文件 | 管什么 | 改动影响面 |
|---|---|---|
| `_config.yml` | 站点 URL、标题、作者、permalink、deploy、`skip_render`、feed/sitemap | 全站 |
| `_config.butterfly.yml` | **主题所有开关**：菜单、头像、配色、侧边栏卡片、评论、搜索、注入脚本 | 全站 |
| `themes/butterfly/_config.yml` | 主题**默认值**（当前 `theme_color` 是绿色系 `#2d5a3b`，已被根配置覆盖） | 所有根配置没写的键 |
| `package.json` | 依赖 + npm scripts（`build` / `tw` / `build:all`） | 构建 |
| `tailwind.config.js` | 只有两个独立工具页用的 Tailwind 预编译配置 | `/supertool/`、`/tools/frontmatter-generator/` |
| `.tailwind-entry.css` | Tailwind 编译入口（三行 `@tailwind` 指令） | 同上 |

### ⚠️ 容易踩的坑

- **`skip_render` 在根 `_config.yml`**，不是主题配置。加独立 HTML 页必须在这里登记，否则会被套上主题外壳。
  当前已登记：`supertool/*.html`、`tools/*/*.html`、`Gallery/*.html`
- 改 `scripts/` 下的脚本后**必须重启 `hexo server`**，只跑 `generate` 不生效。

---

## 二、界面元素 → 文件对照表

### 2.1 全局骨架

| 界面元素 | 文件 | 备注 |
|---|---|---|
| 整页骨架 / `body` 包装 | `themes/butterfly/layout/includes/layout.pug` | 所有页面的父模板 |
| `<head>` 全部内容 | `themes/butterfly/layout/includes/head.pug` | 引入 CSS/JS/字体 |
| 页面顶部区域（含头图判断） | `themes/butterfly/layout/includes/header/index.pug` | `disable_top_img` 在这里判断 |
| 底部页脚 | `themes/butterfly/layout/includes/footer.pug` | 版权、框架信息、footer nav |
| 右下角悬浮按钮组 | `themes/butterfly/layout/includes/rightside.pug` | 暗色切换、阅读模式、目录、回到顶部 |
| 右键菜单 | `themes/butterfly/layout/includes/rightmenu.pug` | |
| 加载动画 | `themes/butterfly/layout/includes/loading/*` | `preloader.enable` 控制 |
| 分页器 | `themes/butterfly/layout/includes/pagination.pug` | |

### 2.2 顶部导航栏（`#nav`）

| 元素 | 文件 / 配置 |
|---|---|
| 导航结构 | `themes/butterfly/layout/includes/header/nav.pug` |
| 菜单项渲染 | `themes/butterfly/layout/includes/header/menu_item.pug` |
| **菜单数据** | `_config.butterfly.yml` → `menu:`（第 20 行起） |
| 站点名 / logo | `_config.butterfly.yml` → `nav.display_title` / `nav.logo` |
| 是否固定顶栏 | `_config.butterfly.yml` → `nav.fixed` |
| 移动端汉堡菜单 | `nav.pug` 的 `#toggle-menu` |

当前菜单结构：
```
内容 → 分类/标签/归档/更新
统计 → 文章统计/博客统计
互动 → 动态/信箱/友链
工具 → 超级工作台
关于 → 关于/公告
```

### 2.3 侧边栏（`#aside-content`）

**卡片渲染顺序在这个文件里硬编码**：`themes/butterfly/layout/includes/widget/index.pug`

| 卡片 | 模板文件 | 开关（`_config.butterfly.yml`） |
|---|---|---|
| 作者卡（头像+昵称+文章数） | `includes/widget/card_author.pug` | `aside.card_author.enable` |
| 公告卡 | `includes/widget/card_announcement.pug` | `aside.card_announcement.enable` |
| 目录 TOC | `includes/widget/card_post_toc.pug` | `toc.post` |
| 最近文章 | `includes/widget/card_recent_post.pug` | `aside.card_recent_post.enable` |
| 最新评论 | `includes/widget/card_newest_comment.pug` | `aside.card_newest_comments.enable` |
| 分类 | `includes/widget/card_categories.pug` | `aside.card_categories.enable` |
| 标签云 | `includes/widget/card_tags.pug` | `aside.card_tags.enable` |
| 归档 | `includes/widget/card_archives.pug` | `aside.card_archives.enable` |
| 网站资讯（字数/PV） | `includes/widget/card_webinfo.pug` | `aside.card_webinfo.enable` |
| 文章系列 | `includes/widget/card_post_series.pug` | `aside.card_post_series.enable` |

侧边栏容器本身：`themes/butterfly/layout/includes/sidebar.pug`（含移动端抽屉）

> 注意：**文章页**和**其它页**的卡片顺序是两套分支，都在 `widget/index.pug` 里。

### 2.4 首页

| 元素 | 文件 |
|---|---|
| 首页入口 | `themes/butterfly/layout/index.pug` |
| 文章列表 UI | `themes/butterfly/layout/includes/mixins/indexPostUI.pug` ← **首页实际渲染的就是这个** |
| 文章卡片结构 | `themes/butterfly/layout/includes/mixins/post-ui.pug` |
| ~~首页特有能力（技能卡、分类列表）~~ | `themes/butterfly/layout/includes/home.pug` ← **整块已确认不渲染，见第五节死模板说明** |
| 首页布局模式 | `_config.butterfly.yml` → `index_layout`（当前 `4` = 封面在上、信息在下） |
| 摘要长度 | `_config.butterfly.yml` → `index_post_content.length`（当前 500） |
| 每页文章数 | `_config.yml` → `index_generator.per_page`（当前 10） |
| 封面 | `_config.butterfly.yml` → `cover.default_cover` |

**首页卡片样式在** `source/css/custom-index.css`
（`.recent-post-item`、`.post_cover`、`#recent-posts` 等）

### 2.5 文章页

| 元素 | 文件 |
|---|---|
| 文章页入口 | `themes/butterfly/layout/post.pug` |
| 文章元信息（日期/分类/标签） | `themes/butterfly/layout/includes/header/post-info.pug` |
| 过期提醒 | `themes/butterfly/layout/includes/post/outdate-notice.pug` |
| 打赏 | `themes/butterfly/layout/includes/post/reward.pug` |
| 版权声明 | `themes/butterfly/layout/includes/post/post-copyright.pug` |
| 正文容器 | `#article-container`（CSS 选择器，样式在 `source/css/`） |

### 2.6 独立页面（看 frontmatter 的 `type`）

| 页面 | 文件 | `type` | 对应模板 |
|---|---|---|---|
| 关于 | `source/about/index.md` | *(无)* | `includes/page/default-page.pug` |
| 归档 | `source/archives/index.md` | *(无，靠 archive 生成器)* | `layout/archive.pug` |
| **分类**（主） | `source/categories/index.md` | `custom-tags` | 自己内联全部 HTML+CSS+JS |
| 标签 | `source/tags/index.md` | `custom-tags` | 自己内联 |
| 友链申请 | `source/link/index.md` | *(无，故意不设 type)* | 自己内联全部 HTML+CSS+JS |
| 给我留言 | `source/message/index.md` | `message` | `includes/page/default-page.pug` |
| 网站公告 | `source/notice/index.md` | `notice` | `includes/page/notice.pug` |
| 动态/说说 | `source/moments/index.md` | `shuoshuo` | `includes/page/shuoshuo.pug` |
| 文章统计 | `source/charts/index.md` | `charts` | `includes/page/echarts.pug` + `scripts/charts.js` |
| 博客统计 | `source/census/index.md` | `census` | 自己内联 + `scripts/census_stats.js` |
| 博客更新 | `source/update/index.md` | `update` | 自己内联 |
| 友链订阅 | `source/fcircle/index.md` | `fcircle` | 自己内联 |
| 评论协议 | `source/protocol/comment/index.md` | `protocol` | 自己内联 |
| 版权协议 | `source/protocol/copyright/index.md` | `protocol` | 自己内联 |
| 影院/音乐/图片 | `source/life/{movies,music,photos}/index.md` | *(无)* | 自己内联 |
| 旧时光 | `source/site/time/index.md` | *(无)* | 自己内联 |
| 404 | `source/404.md` | `404` + `layout: false` | **完全自包含**（`{% raw %}` 包裹整页） |

### 2.7 独立工具页（不套主题壳）

| 页面 | 文件 | 说明 |
|---|---|---|
| 超级工作台 | `source/supertool/index.html` | 完整 HTML，靠 `skip_render` 原样输出 |
| Front Matter 生成器 | `source/tools/frontmatter-generator/index.html` | 同上（内容与上面高度重复） |
| 相册 | `source/Gallery/{marvel,wallpaper}.html` | 同上 |

样式：`source/supertool/tailwind.build.css`（预编译）+ `lucide.min.js` + `marked.min.js`

---

## 三、样式文件职责

| 文件 | 管什么 | 加载方式 |
|---|---|---|
| `source/css/design-system.css` | **设计系统**：`--c-*` 变量、暗色模式变量、遗留变量别名 | 全站 `<head>` |
| `source/css/custom-index.css` | 首页文章卡片布局 | 全站 |
| `source/css/inject-fix.css` | 补丁层：侧边栏、暗色修复、社交图标、引用块 | 全站 |
| `source/css/custom-notice-tags.css` | 公告标签字距 | 全站 |
| `source/css/all.min.css` | FontAwesome 图标（已子集化到 51 个） | 全站 |
| `public/css/index.css` | **主题编译产物**（Stylus → CSS，216 KB） | 全站 |
| 各页面 `index.md` 内 `<style>` | 该页专属样式 | 仅该页 |
| `source/webfonts/*.woff2` | FA 字体（已子集 237KB → 11.5KB） | |

### 改配色的正确姿势

**改 `_config.butterfly.yml` 的 `theme_color` 段**（第 791 行起），不要改 `themes/butterfly/_config.yml`。
当前值全部对齐 `--c-primary: #1677B3`。

改完要同步 `source/css/design-system.css` 里的 `--c-*` 变量，否则两套色系会打架。

### 变量体系

```
--c-primary       主色      #1677B3
--c-primary-light 主色浅    #49b1f5
--c-primary-dark  主色深    #134e75
--c-bg            背景      #F8FAFC  / 暗色 #0f1419
--c-surface       卡片      #FFFFFF  / 暗色 #1a2332
--c-text          正文      #374151  / 暗色 #e8eef4
--c-text-secondary 次要     #6B7280  / 暗色 #8b9db5
```

遗留别名（`--border` `--secondary` `--primary` `--sec-text` 等）都在
`design-system.css` 的 `:root` 别名层，页面内联样式用这些也能生效。

---

## 四、JavaScript 职责

| 文件 | 作用 | 加载范围 |
|---|---|---|
| `source/js/vision-network.js` | 特征点连线背景（`#vision-canvas`） | 全站 |
| `source/js/scroll-reveal.js` | 首页卡片滚动渐显 | 全站 |
| `source/js/notice-loader.js` | 侧边栏公告卡（读 `/data/latest-notice.json`） | 全站 |
| ~~`source/js/link-apply.js`~~ | **已移除**（2026-11-03），新友链页自带申请逻辑 | — |
| `source/js/tag-cloud.js` | 标签云（当前无容器，直接退出） | 全站 |
| `source/js/page-link.js` | 友链页随机高亮 | **未加载**（死文件） |
| `source/js/page-message.js` | 留言板回顶/复制 | **未加载**（死文件） |
| `public/js/main.js` | 主题主脚本（32 KB） | 全站 |
| `public/js/utils.js` | 主题工具函数 | 全站 |
| `public/js/search/local-search.js` | 本地搜索 | 全站 |

### 构建期脚本（`scripts/`）

| 文件 | 作用 |
|---|---|
| `scripts/asset_version.js` | **给 14 个核心 CSS/JS 加内容哈希**（绕开 CDN 31 天缓存） |
| `scripts/charts.js` | 把 echarts 图表注入统计页（含主题切换重绘） |
| `scripts/census_stats.js` | 博客统计页数字计算 |
| `scripts/searchdb-pinyin.js` | 搜索索引加拼音 |
| `scripts/generators/*.js` | 生成 `api/*.json`、`data/*.json` |

> `asset_version.js` 的清单在文件顶部的 `CUSTOM_ASSETS` 数组。
> **新增自定义 CSS/JS 后要加进去**，否则会继续被 CDN 缓存卡住。

---

## 五、数据文件

| 文件 | 内容 | 谁在用 |
|---|---|---|
| `source/_data/link.yml` | 友链列表（分组/名称/链接/头像/描述） | `scripts/generators/links_json.js` → `/data/links.json` → `/link/` 页 |
| `source/_data/notice.yml` | 公告轮播数据 | `themes/butterfly/layout/includes/swiper-notice.pug`（**但见下方死代码说明**） |
| `source/_data/shuoshuo.yml` | 动态/说说 | `moments/` 页 |
| `source/_data/skill.yml` | 首页技能图标 | `themes/butterfly/layout/includes/home.pug`（**但见下方死代码说明**） |

### ⚠️ 已确认的死模板（`home.pug` 整块不渲染）

`themes/butterfly/layout/includes/home.pug` 里所有内容都包在：

```pug
if config.swiperNotice && config.swiperNotice.enable    ← 配置项不存在
if config.homeCard && config.homeCard.enable            ← 配置项不存在
```

`swiperNotice` / `homeCard` 在 `_config.yml`、`_config.butterfly.yml`、
`themes/butterfly/_config.yml` **三个配置里都没有定义**，所以整块永远是 false。

实测线上首页源码里 `.home-card`、`.skill-card`、`.swiper-notice`、
`.home-post-card`、`.category-lists` **全部不存在**。

**结论**：
- 改 `source/_data/skill.yml` 或 `notice.yml` **在首页不会有任何效果**
- 想在首页加技能卡/公告轮播，得先在配置里补上 `homeCard.enable: true` / `swiperNotice.enable: true`
- 首页真正的文章列表来自 `includes/mixins/indexPostUI.pug`，不是 `home.pug`


---

## 五之二、友链系统（无后端方案）

2026-11-03 重构。原 link.hehey.top 后端已下线，改为**纯静态 + 三通道申请**。

### 数据流

`
source/_data/link.yml
        |  build 时
        v
scripts/generators/links_json.js
        |
        v
/data/links.json  ----fetch---->  /link/ 页面渲染卡片
`

**加友链只需编辑 source/_data/link.yml 后重新 build**，没有任何后端依赖。

### 字段格式

`yaml
- class_name: '朋友们'
  class_desc: 分组说明（页面当前不展示，保留兼容）
  link_list:
  - name: '站点名'          # 必填
    link: 'https://...'     # 必填
    avatar: 'https://...'   # 可选，留空显示首字母
    descr: '一句话描述'      # 可选
`

### 三个申请通道（全部零后端）

| 通道 | 实现 | 需要什么 |
|---|---|---|
| **GitHub Issue**（主） | 预填 	itle + ody + labels=friend-link 的 issues/new 链接 | GitHub 账号 |
| 邮件 | mailto: 预填主题和正文 | 邮箱 |
| 复制模板 | 
avigator.clipboard 复制 Markdown 模板 | 什么都不需要 |

配套的 Issue 表单模板：.github/ISSUE_TEMPLATE/friend-link.yml
（**要同时存在于 master 和 hexo 两个分支**，GitHub 读默认分支的 .github/）

### 改申请方式

编辑 source/link/index.md 里 SITE 对象：

`js
var SITE = {
  name: 'G/ren的小破站',
  url: 'https://www.hehehey.top/',
  avatar: '...',
  desc: '...',
  email: '1955561070@qq.com',        // 改这里换收件邮箱
  issueRepo: 'Gren23/Gren23.github.io'  // 改这里换 Issue 仓库
};
`

### ⚠️ 为什么 link/index.md 不能写 	ype: link

主题的 includes/page/flink.pug 会读 site.data.link，
**在页面内容前面再渲染一遍友链列表**，导致内容重复两遍。

当前做法：不设 	ype，让页面走 default-page.pug，全部内容自己写。

---

## 六、常见改动场景速查

| 你想改… | 动这些文件 |
|---|---|
| 导航菜单项 / 顺序 | `_config.butterfly.yml` → `menu:` |
| 博客标题 / 副标题 / 描述 | `_config.yml` → `title` / `subtitle` / `description` |
| 头像 | `_config.butterfly.yml` → `avatar.img`（文件放 `source/img/`） |
| 主色调 | `_config.butterfly.yml` → `theme_color` **+** `source/css/design-system.css` |
| 首页文章卡片样式 | `source/css/custom-index.css` |
| 首页每页文章数 | `_config.yml` → `index_generator.per_page` |
| 侧边栏显示哪些卡 | `_config.butterfly.yml` → `aside.card_*` |
| 侧边栏卡片**顺序** | `themes/butterfly/layout/includes/widget/index.pug`（改模板） |
| 页脚链接 | `_config.butterfly.yml` → `footer.nav` |
| 底部版权 | `_config.butterfly.yml` → `footer.owner` / `copyright` |
| 分类页布局 | `source/categories/index.md`（内联 `<style>`，`.cat-grid` / `.cat-card`） |
| 标签页样式 | `source/tags/index.md`（内联） |
| 友链页样式 | `source/link/index.md`（内联 `.lp-*` 全套样式与逻辑） |
| 友链数据 | `source/_data/link.yml`（改完 build 即生效，无需后端） |
| 友链申请方式 | `source/link/index.md` 里 `SITE` 对象的 `issueRepo` / `email` |
| 公告内容 | `source/notice/index.md` |
| 评论系统 | `_config.butterfly.yml` → `comments.use`（当前 Twikoo） |
| 搜索 | `_config.butterfly.yml` → `search.use`（当前 local_search） |
| 暗色模式细节 | `source/css/inject-fix.css`（补丁层）+ `design-system.css`（变量） |
| 往全站 `<head>` 加东西 | `_config.butterfly.yml` → `inject.head` |
| 往全站 `</body>` 前加东西 | `_config.butterfly.yml` → `inject.bottom` |
| 加一个独立 HTML 页 | 放 `source/xxx/index.html` **+** 在 `_config.yml` 的 `skip_render` 登记 |
| 图标 | `source/css/all.min.css`（FA7，已子集）。**加新图标要重跑子集脚本** |

---

## 七、图标子集化（改图标时必看）

`source/webfonts/` 里的三份 woff2 **已被裁剪**（237KB → 约 9.8KB）。
solid 71 字形 / brands 7 / regular 2。

如果新页面用了之前没用过的 `fa-*` 图标，字体里没有对应字形 → 显示空白。

### 重跑方法

```powershell
$py='C:\Users\Administrator\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe'
& $py -X utf8 D:\blog\.scratch\tools\refont3.py
# 然后把 .scratch/fontsub/ 下的 woff2 拷到 source/webfonts/
```

原始字体备份在 `.scratch/fontsub/original/`。

### 三个坑（都是实际踩过的）

**坑 1：`.notdef` 不是缺字标志**

用 fontTools 查 cmap 时，字形名全是 `.notdef.xxx`。这不是字体坏了 ——
FA 官方 woff2 本身就剥离了字形名，原始字体也是 1993 个 `.notdef`。
不能用字形名判断有没有该字形。

**坑 2：按宽度检测会误判**

用 `measureText` 比对宽度时，`fa-arrow-up`、`fa-times` 的字形宽度
恰好等于缺字方块宽度（都是 12px），被误判为缺失。
正确做法是**逐像素比对 alpha 通道**（见 `.scratch/tools/fullcheck.js`）。

**坑 3：改了字形但用户看不到（最坑）**

字体文件名固定为 `fa-solid-900.woff2`，浏览器按 URL 缓存，换字体不重下。
所以补了字形也白补，用户端还是旧字体。

**已通过 `asset_version.js` 解决**：字体现在带内容哈希
（`fa-solid-900.38bcece5.woff2`），内容一变文件名就变。
**新增图标只需重跑 refont3.py + 重新构建，不用再管缓存。**

### 验证图标是否真的渲染

```powershell
cd D:\blog\.scratch\tools
& $node fullcheck.js http://127.0.0.1:4100      # 本地（静态服务器）
& $node fullcheck.js https://www.hehehey.top    # 线上
```

会报告全站每个页面上未渲染的图标。

### 验证构建产物必须用静态服务器

`hexo server` **不读 `public/` 目录**，它在内存里自己渲染。
所以 `asset_version.js` 的哈希改写对 `hexo server` 完全无效。

验证 `public/` 里的真实产物要用：

```powershell
$py -m http.server 4100 --bind 127.0.0.1 --directory D:\blog\public
```

这个坑导致两次误判「字体已修好」，实际线上还是旧的。

---

## 八、部署

> ⚠️ **构建前必须先加载环境变量**，否则脱敏内容（`[[secret:...]]`）解不开。
> 见下方「环境变量（必读）」。

```powershell
# 0) 加载构建环境变量（必做，否则密码解锁功能失效）
#    用 .env 读取，不依赖 PowerShell 执行策略
Get-Content D:\blog\.scratch\build-env.env -Encoding UTF8 |
  Where-Object { $_ -match '^\s*BLOG_SECRET_PASSWORD=(.+)$' } |
  ForEach-Object { $env:BLOG_SECRET_PASSWORD = $Matches[1].Trim() }

# 1) 改完先备份
powershell -NoProfile -ExecutionPolicy Bypass -File .backup\blog_backup.ps1 -Reason "改xxx"

# 2) 构建
$deps='C:\Users\Administrator\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies'
$node="$deps\node\bin\node.exe"
$py="$deps\python\python.exe"
$env:Path = (Split-Path $node) + ';' + [Environment]::GetEnvironmentVariable('Path','Machine')
& $node D:\blog\node_modules\hexo-cli\bin\hexo clean
& $node D:\blog\node_modules\hexo-cli\bin\hexo generate
# 产物里应出现：INFO  secret_lock: 加密 N 条 [...] -> data/secrets.json

# 3) 同步产物到 .deploy_git
Get-ChildItem D:\blog\.deploy_git -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force
Copy-Item D:\blog\public\* D:\blog\.deploy_git -Recurse -Force
# ISSUE_TEMPLATE 会被清掉，要补回
New-Item -ItemType Directory -Force -Path D:\blog\.deploy_git\.github\ISSUE_TEMPLATE | Out-Null
Copy-Item D:\blog\.github\ISSUE_TEMPLATE\*.yml D:\blog\.deploy_git\.github\ISSUE_TEMPLATE\ -Force

# 4) 推送（github.com:443 的 git 协议被墙，走 API）
& $py -X utf8 D:\blog\.scratch\tools\gh_push.py site      # 推产物到 master（触发 Vercel）
& $py -X utf8 D:\blog\.scratch\tools\gh_push_src2.py      # 推源码到 hexo 分支
```

### 环境变量（必读）

**`BLOG_SECRET_PASSWORD`** 是脱敏内容密码解锁功能的密钥。

| 位置 | 说明 |
|---|---|
| `.scratch\build-env.ps1` | 本地存放（已 gitignore），内容是 `$env:BLOG_SECRET_PASSWORD = '...'` |
| `scripts\secret_lock.js` | 构建时读这个变量，用 PBKDF2 派生密钥加密 |
| `public\data\secrets.json` | 生成的密文（286 字节），**不含任何明文** |

**没设置变量会怎样**：构建照常成功，但 `secret_lock` 会输出
`BLOG_SECRET_PASSWORD 未设置，脱敏内容将无法解锁`，页面上仍显示 `******`，
访客输任何密码都解不开。

**换密码**：改 `.scratch\build-env.ps1` 里的值 → 重新 `hexo generate` →
重新推送。密文会重新生成，旧密码自动失效。

**验证密文正确**：
```powershell
# 应该不含明文
Select-String -Path D:\blog\public\data\secrets.json -Pattern 'ERC654321|hehehey|estun'
# 应该输出 iter=600000 和 3 个 key
Get-Content D:\blog\public\data\secrets.json -Raw | ConvertFrom-Json | Select-Object iter, salt
```

**注意**：`source\data\secrets.json` 也可能存在（旧库遗留），实际生效的是
`public\data\secrets.json`。前者如果存在会被 `asset_version` 一并处理，无害。

### CDN 缓存注意

Vercel 给静态资源 `max-age=2678400`（31 天），Cloudflare 忽略 query string。
**只有换路径才会刷新**——这就是 `asset_version.js` 存在的原因。

新增/修改自定义 CSS/JS 后，记得把它加进 `asset_version.js` 的 `CUSTOM_ASSETS`。

---

## 九、目录速查

```
D:\blog
├─ _config.yml                   Hexo 配置
├─ _config.butterfly.yml         主题配置（改界面的主要入口）
├─ package.json                  npm scripts
├─ tailwind.config.js            工具页 Tailwind
├─ .tailwind-entry.css           工具页 Tailwind 入口
├─ .backup/                      ★ 备份（备份脚本+快照+历史）
├─ .scratch/                     临时：工具脚本、截图、隔离的旧文件
├─ scripts/                      构建期脚本
│   ├─ asset_version.js          ★ 资源哈希版本化
│   ├─ charts.js                 统计图
│   └─ generators/               JSON 生成器
├─ source/
│   ├─ _posts/                   23 篇文章（Markdown）
│   ├─ _data/                    数据（友链/说说/技能图标）
│   ├─ css/                      ★ 自定义样式
│   ├─ js/                       自定义脚本
│   ├─ img/                      图片（头像/封面/favicon）
│   ├─ webfonts/                 FontAwesome（已子集）
│   ├─ lib/                      echarts / twikoo 本地库
│   ├─ <页面>/index.md            各独立页
│   ├─ supertool/ tools/         独立 HTML 工具页
│   └─ Gallery/                  独立相册页
├─ themes/butterfly/
│   ├─ layout/                   ★ Pug 模板（界面结构）
│   └─ _config.yml               主题默认值（谨慎改）
└─ public/                       构建产物（不手动改）
```

---

## 十、验证清单（改完必跑）

```powershell
# 真浏览器全站检查：错误/404/性能/溢出
cd D:\blog\.scratch\tools
& $node audit.js

# 深色模式对比度
& $node darkmode.js

# 线上验证（部署后）
& $node prodcheck.js
```
