# 博客审计与优化报告

> 生成时间：2026-11-03
> 范围：`D:\blog`（Hexo 8.1.1 + Butterfly 5.5.4）
> 全程未推送公网，本地 `hexo server` 验证

---

## 一、部署链路（已确认）

```
D:\blog (源码)                     GitHub master (构建产物)          Vercel
    │                                    │                            │
    ├─ hexo generate ──▶ public/ ──▶ .deploy_git ──force push──▶      │
    │                                                         自动构建
    │                                                              ▼
    └─ 源码唯一副本                                         www.hehehey.top
                                                          （Cloudflare 代理）
```

关键事实：

| 项目 | 值 |
|---|---|
| 仓库 | `Gren23/Gren23.github.io`（public，默认分支 master） |
| master 内容 | 纯构建产物，无 `_posts` / `themes` |
| 本地 master | Hexo 源码，23 篇 `_posts` |
| 本地与 origin/master | **无共同祖先**，两条独立历史 |
| 线上响应头 | `x-vercel-cache: HIT` + `Server: cloudflare` |
| GitHub Pages | 也开着，但域名不走它（备胎） |

---

## 二、安全修复

### 2.1 已修复

| # | 问题 | 位置 | 处理 |
|---|---|---|---|
| 1 | **Gitalk `client_secret` 明文入库** | `_config.butterfly.yml:597` | 清空。Gitalk 是纯前端 OAuth，只需 `client_id`；secret 会打进入 HTML |
| 2 | **3 个 GitHub PAT 硬编码在 git config** | `.git/config`、`.deploy_git/.git/config` | 全部清除，凭据另存 `~/.blog-credentials/github.txt`（不入库） |
| 3 | **友链卡片 XSS** | `source/link/index.md` `buildCard()` | 原 `escape` 只转义 `<` `>`，双引号能逃出属性；头像 URL 未校验协议，可注入 `javascript:`。已改为完整转义 + `safeUrl()` 白名单 |
| 4 | **公告卡片 XSS 面** | `source/js/notice-loader.js` | 原用 `innerHTML` 拼接 `textContent` 取来的文本。已改为纯 DOM API 构造 |
| 5 | 无效 CSS 变量导致深色模式文字消失 | `design-system.css` | 补 `--sec-text` / `--primary` / `--color-primary-light` 别名（影响 archives + 5 个分类页 + 友链弹窗） |

### 2.2 token 现状

| 位置 | token | 状态 |
|---|---|---|
| `D:\blog\.git\config` | `ghp_dvxe...PgmUo` | ✅ 有效，scope=repo（**已从文件移除**） |
| `.deploy_git` pushurl | 同上 | ✅ 有效（已移除） |
| `.deploy_git` branch.remote | `ghp_5sC8...` | ❌ 401 已废（已移除） |
| `.deploy_git` fetch url | `ghp_ogfB...` | ❌ 401 已废（已移除） |

> 该 token 仍有完整 repo 权限。建议你**在 GitHub 上撤销并重新生成**，因为它在旧提交历史和备份里可能存在过。

### 2.3 `D:\hermes` 检查结论

`D:\hermes` 是 **Hermes Agent（Nous Research）** 的数据快照，两份相同拷贝（`Hermes` / `Hermesworks`，`.env` 与 `config.yaml` SHA 完全相同）：

- `.env` 实际生效仅 11 个变量，全是工具开关（`TERMINAL_TIMEOUT`、`BROWSERBASE_PROXIES` 等）
- `GITHUB_TOKEN` / `VERCEL_TOKEN` / `AI_GATEWAY_API_KEY` **全是注释行**
- `state.db` sessions 0 行、messages 0 行
- 无 hook、无 cron、无脚本引用过 `D:\blog` 或 `hehehey`

**结论：里面没有任何博客部署密钥。** 它当年管博客是直接使用博客仓库 `.git/config` 里的 token。

**Vercel 侧无任何本地凭据**：`~/.vercel`、`.vercel`、`vercel.json`、`VERCEL_*` 环境变量、`cmdline` 凭据全部不存在，CLI 未安装。部署是纯 GitHub 集成自动触发。

---

## 三、死代码清理

### 3.1 移出仓库的陈旧构建产物（33 项，已隔离可回滚）

根目录下这些是**旧版构建产物**（abbrlink 时期），`source/` 重建后会以新路径生成：

`posts/`、`tags/`、`categories/`、`archives/`、`about/`、`census/`、`charts/`、`life/`、`link/`、`message/`、`notice/`、`personal/`、`protocol/`、`site/`、`fcircle/`、`api/`、`page/`、`images/`、`css/`、`comments/`、`social/`、`lib/`、`layout/`、`package/`、`404.html`、`index.html`、`atom.xml`、`sitemap.xml`、`search.json`、`search.xml`、`baidusitemap.xml`、`test-archive.js`、`test-push.txt`

### 3.2 死脚本

| 文件 | 原因 |
|---|---|
| `scripts/generators/charts_page.js` | 与 `source/charts/index.md` 抢同一输出路径，source 胜出，从未生效；且用了废弃 API `new Buffer()` |
| `scripts/fix-category-path.js` | 空实现，注释自己写着「placeholder for future」 |
| `scripts/generators/latest_notice_json.js` | **重写**。原实现只认 `{% raw %}` 包裹，而 `notice/index.md` 用裸 HTML → 永远提前 return，从未生效过 |

### 3.3 死 CSS（47.3 KB）

`page-link.css`、`page-message.css`、`page-about.css`、`page-census.css`、`page-charts.css`、`page-update.css`、`notice.css`、`categories-tags.css`、`tags-categories.css`、`shared.css`

这 10 个文件**从未被任何页面加载**（页面用 md 内联 `<style>`），且经逐条规则比对是**旧版本**——直接接管会丢样式。已隔离。

### 3.4 死 CSS 规则

`custom-notice-tags.css` 4 组规则中 3 组选择器全站 0 命中（`.tag-inline`、`.tag-cloud-anchor`、`.category-item .category-tag`），已删除，只保留有效的 `.notice-item .notice-tag`。

### 3.5 冗余资源

- `source/supertool/tailwind.built.css`（29 KB）+ `tailwind.min.css`（398 KB）—— 无任何引用，已隔离
- `source/images/` 与 `source/img/` 4 个重复图片（`11111.png` 531KB、`wechat.jpg`、`头像.JPG`、`favicon.png`），`images/` 版从未被引用

---

## 四、功能 Bug 修复

### 4.1 `/tools/frontmatter-generator/` 被套进主题壳

`skip_render` 缺 `tools/*/*.html`，导致这个独立工具页被 Hexo 当普通页面渲染，套上 sidebar/GLOBAL_CONFIG 外壳，Tailwind 全部失效。

**修复**：`_config.yml` 补 `tools/*/*.html` 和 `Gallery/*.html`。修复前产物 95393 字节，修复后 = 源码 63494 字节，完全一致。

### 4.2 `/supertool/` 整页无样式

页面用 `<script src="https://cdn.tailwindcss.com">` 运行时生成样式。该域名在国内常拉不到 → `tailwind is not defined` → 整页白板。

**修复**：用项目自带 tailwindcss 3.4.17 CLI 预编译 `source/supertool/tailwind.build.css`（22 KB，覆盖 236 个类），页面改引本地文件，`lucide` / `marked` 也换成本地版。

**效果**：`/supertool/` 加载 8341ms → **808ms**，FCP 6460ms → **216ms**。

### 4.3 Front Matter 生成器一打开就报错

`document.getElementById('fm-draft').checked` —— 这两个复选框在 HTML 里根本不存在，直接抛 `TypeError: Cannot read properties of null`，整个生成器失效。两个工具页都有。已加空值保护。

### 4.4 统计图表全部画不出来

`source/charts/index.md` 从 `https://img.hehey.top/echarts.min.js` 加载（实测该域名 SSL 报错），且生成的三个内联脚本直接调 `echarts.init()`，没有就绪检查 → `ReferenceError: echarts is not defined`。

**修复**：
- echarts 6.1.0 落地到 `source/lib/echarts.min.js`
- `scripts/charts.js` 改为把绘制逻辑 push 进 `__chartsReady`，由统一调度器等 echarts 就绪后执行，缺失就安静跳过
- 顺手修掉图表标题重复（外层 `.chart-title` + echarts 内部 `title.text` 都写了一遍）

### 4.5 友链页永远空白

`link.hehey.top/api/links` 实测返回 **502**，后端已挂。页面每次空等失败。

**修复**：新增 `scripts/generators/links_json.js`，构建期把 `_data/link.yml` 转成 `/data/links.json`。前端先渲染静态快照（几乎 0 延迟），再尝试远程 API 覆盖，失败则保留静态列表。

### 4.6 侧边栏公告日期丢了时分

`source/data/latest-notice.json` 是**手工维护**的静态文件，日期写成 `2026-06-14`（缺 `01:30`）；而 `latest_notice_json.js` 生成器因匹配不到 `{% raw %}` 从未生效。

**修复**：重写生成器（不再依赖 raw 标签），删掉手工 JSON，由构建接管。现在正确输出 `2026-06-14 01:30`。

### 4.7 `tag-cloud.js` 在几乎所有页面空转

`#tag-cloud` 容器全站不存在，但脚本每 100ms 轮询等 `window.posts`，**永不停**。已改为：先查容器，没有就直接退出（零开销）；有则 rAF 等待并设 5 秒上限。

### 4.8 `scroll-reveal.js` 让内容可见性依赖装饰脚本

原实现先给所有卡片写 `opacity:0`，脚本一挂整页文章全部不可见。已改为 CSS 类驱动 + 2 秒兜底强制显示。

### 4.9 7 个页面标题重复

Butterfly `page.pug` 自动渲染 `.page-title = page.title`，而 md 正文又写了 `# 同名标题`。

**修复**：删掉 md 里的重复 h1（census / charts / fcircle / protocol×2），`update` / `link` 的 h1 降级为 h2（它们是真正的内容标题）。

### 4.10 友链申请按钮位置错乱

`link-apply.js` 把按钮插在 `.page-title` 后面，被挤成「标题右边一个悬空按钮」。改为挂在友链列表之后。

### 4.11 申请弹窗输入框看不清

背景 `var(--secondary)` = `#6B7280`（中灰），文字 `var(--primary)` = `#1677B3`（蓝）——灰底蓝字。改为浅色背景 + 深色文字，并补 placeholder 样式。

---

## 五、性能优化

### 5.1 资源体积

| 项目 | 优化前 | 优化后 | 变化 |
|---|---|---|---|
| 首页总传输 | 723 KB | **472 KB** | −35% |
| FontAwesome 字体 | 237 KB（3 份全量） | **11.5 KB**（子集） | **−95%** |
| `/supertool/` 加载 | 8341 ms | **808 ms** | −90% |
| `/link/` 加载 | 12600~18800 ms | **2772~3150 ms** | −75% |
| 首页加载 | 6809 ms | **1707 ms** | −75% |
| 构建产物 | 180 文件 | 173 文件 | — |

### 5.2 FontAwesome 子集化

`all.min.css` 声明 **2612 个图标**，实际只用到 **51 个**。用 fontTools 按调用点裁剪：

```
fa-solid-900.woff2    113152 →  4736 bytes  (44 字形,  4.2%)
fa-brands-400.woff2   101224 →  1984 bytes  ( 7 字形,  2.0%)
fa-regular-400.woff2   18988 →  1012 bytes  ( 2 字形,  5.3%)
合计                  237 KB →  7.7 KB      (−96.8%)
```

> 原 4.6% 时曾漏掉 `far fa-calendar-alt` / `far fa-hand-scissors`，已补齐。

### 5.3 移除无用第三方脚本

| 脚本 | 问题 |
|---|---|
| `talk.hyvor.com/embed/embed.js` | 全站 104 页注入，**但没有任何 hyvor 宿主元素**（评论用的是 Twikoo）。实测 6.6 秒。已移除 |
| `hm.baidu.com/hm.js` | 原为 `defer`，改 `async`，不再阻塞 load 事件 |

### 5.4 本地化外部依赖

| 资源 | 原来 | 现在 |
|---|---|---|
| Twikoo | jsdelivr，实测 **7.4 s** | `/lib/twikoo.min.js`（499 KB） |
| echarts | `img.hehey.top`（SSL 报错） | `/lib/echarts.min.js` |
| Tailwind | `cdn.tailwindcss.com` | 预编译 `/supertool/tailwind.build.css` |
| Lucide / marked | unpkg / jsdelivr | 本地 |

### 5.5 渲染优化

**`vision-network.js`**（55 粒子 O(n²) 连线，每帧执行）：
- 配色只在主题切换时算一次（原来每帧读 DOM attribute）
- 距离用平方比较避免开方
- 连线按 alpha 分 5 档批量 stroke，把 stroke 调用从 O(n²) 降到 5 次
- `visibilitychange` 后台自动暂停
- 尊重 `prefers-reduced-motion`

**`notice-loader.js`**：原来 fetch 整份 `/notice/`（33.7 KB）只为抠第一条，改读 `/data/latest-notice.json`（130 B）。

### 5.6 构建

```
Files loaded in  2.45 s
173 files generated in  1.94 s
```

---

## 六、界面布局优化

| # | 页面 | 问题 | 处理 |
|---|---|---|---|
| 1 | 分类页 | `.cat-grid` 用 CSS 多列，5 个分类时第二列只有 2 张卡，下方留大半屏空白，列间高度永不对齐 | 改自适应网格 `repeat(auto-fill, minmax(260px,1fr))`；卡片等高、行自动补齐、窄屏自动降列 |
| 2 | 分类页 | `.cat-card-tag` 用 `opacity:0` 隐藏但仍在文档流里，撑出约 60px 隐形空白 | 改绝对定位贴底，不占高度，悬停淡入。卡片高 117px → **88px**，网格总高 383px → **296px** |
| 3 | 友链页 | 申请按钮挤在标题右侧 | 挂到友链列表之后 |
| 4 | 友链弹窗 | 灰底蓝字输入框 | 浅底深字 + placeholder 样式 |
| 5 | 7 个页面 | 标题重复 | 见 4.9 |

---

## 七、验证结果

### 7.1 全站审计（32 个页面）

| 项目 | 修复前 | 修复后 |
|---|---|---|
| JS 运行时错误 | 4 个页面（echarts×2、tailwind×2） | **0** |
| 空指针异常 | 2 个页面（`checked` of null） | **0** |
| 本地资源 404 | 4 处（favicon、pushcode、marker-icon、marker-shadow、assets） | **0** |
| 剩余 console 报错 | — | 仅外链图片 `ERR_SSL_BAD_RECORD_MAC_ALERT`（被墙，非代码问题） |

### 7.2 响应式（3 种视口 × 30 个页面）

| 视口 | 横向溢出页面数 |
|---|---|
| 390×844（手机） | 0 |
| 768×1024（平板） | 0 |
| 1440×900（桌面） | 0 |

### 7.3 视觉复核

逐页截图比对（21 个页面 × 3 轮），确认：

- 首页卡片、封面、侧边栏、公告卡正常
- 分类页网格对齐、无空白
- 标签页云图正常
- 图表页三张图全部渲染、无重复标题
- 友链页列表 + 申请按钮 + 弹窗全部可用
- `/supertool/` 与 `/tools/frontmatter-generator/` 样式完整、封面渲染器工作
- 移动端布局正常，汉堡菜单可用

---

## 八、未处理项（需你决定）

### 8.1 网络层：GitHub HTTPS 被掐

```
github.com:443      TCP 握手 → True（20.205.243.166）
git ls-remote       → Empty reply / Connection reset / timeout 26s
https://github.com  → 200 正常
api.github.com      → 200 正常
ssh.github.com:443  → 可达，SSH 握手能过（无公钥）
```

TCP 通、Web 通、API 通，唯独 `git` 走 443 的 TLS 长连接被 reset。**当前这台机器推不上去**，需要代理或 SSH key。

### 8.2 源码无备份

本地 13 个提交从未推到 GitHub 源码分支。`origin/hexo` 停在 2026-06-07 的旧架构。硬盘挂了 23 篇 md 就没了。

### 8.3 失效的外部服务

| 服务 | 状态 | 影响 |
|---|---|---|
| `link.hehey.top/api/links` | 502 | 友链改读静态快照，功能正常但无法在线提交 |
| `img.hehey.top/js/infinitegrid.min.js` | 配置中，未实际使用 | 无 |

### 8.4 token 建议轮换

见 2.2。

---

## 九、回滚方式

所有改动前的原件都在：

```
D:\blog\.scratch\quarantine_20261103\
D:\blog\.scratch\backup_pre_refactor_20261103_022712\
D:\blog\.scratch\fontsub\original\        （原始字体）
```

字体子集化可单独回滚：

```powershell
Copy-Item .scratch\fontsub\original\*.woff2 source\webfonts\ -Force
```

---

## 十、本地运行

系统 PATH 里没有 node。用 DSH 自带的：

```powershell
$node='C:\Users\Administrator\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe'
$env:Path = Split-Path $node
cd D:\blog
& $node node_modules\hexo-cli\bin\hexo server -p 4000
```

改动工具页样式后需重编 Tailwind：

```powershell
& $node node_modules\tailwindcss\lib\cli.js -c tailwind.config.js -i .tailwind-entry.css -o source\supertool\tailwind.build.css --minify
```

或（装好 node 后）：

```bash
npm run tw        # 只重编 tailwind
npm run build:all # tw + clean + generate
```

---

## 附录：第二轮补充修复（深色模式专项）

第一轮只验证了浅色模式。补测深色模式后，又发现 4 个真实问题并修复：

| # | 问题 | 根因 | 修复 |
|---|---|---|---|
| A | **全站配色被绿色污染** | 根配置 \_config.butterfly.yml\ 的 \	heme_color\ 整段被注释，Hexo 回退到主题默认值 \#2d5a3b\（早期绿色）。链接色、分页器、文字选中、滚动条、引用块、代码高亮全是绿的 | 在根配置显式声明一套对齐 \#1677B3\ 的 \	heme_color\。产物里绿色计数 3→0，\#1677b3\ 出现 53 次 |
| B | **深色下表格奇数行白底白字** | 主题的 \	body td\ 在亮色下是 \#fff\；\inject-fix.css\ 只给 \even\ 行写了深色覆盖，\odd\ 行漏了 | 补 th-child(odd)\ 规则 + 强制 \	d\ 背景透明。像素采样实测单元格对比度 4.52（OK） |
| C | **深色下 GitHub 图标消失** | 品牌色 \#24292e\ 在深色卡片 \#1a2332\ 上融进背景 | 深色模式统一 \ilter: brightness(1.9)\，GitHub 单独提亮到 \#e8eef4\ |
| D | **图表坐标轴深色下不可读** | \charts.js\ 的 \echarts.init(..., 'light')\ 硬编码亮色主题；切换 \data-theme\ 后图表不重绘，坐标轴/单位仍是 \#4c4948\ | 实例注册进 \window.__chartsInstances\，\MutationObserver\ 监听 \data-theme\ 触发重绘。验证：切深色后 axisLabel 变为 gba(255,255,255,0.75)\ |

另修：深色模式引用块底色（主题硬编码 \#2c2c2c\ 纯灰）改为 gba(100,181,246,0.10)\ 主色块；
公告卡「查看全部公告」链接（内联写死 \#666\）改为 \--c-primary-light\。

### 验证方式补充

写了一个 PNG 像素级对比度检测器（\pixelcontrast.js\，自带最小 PNG 解码），
直接采样渲染后的真实像素，避开 CSS alpha 计算的误差：

`
分类计数徽标       实测对比度=4.23  OK
表格单元格         实测对比度=4.52  OK
`

### 一个容易踩的坑（记录备查）

\hexo server\ **只在启动时加载 \scripts/\ 目录**。改了 \scripts/charts.js\ 后
只跑 \hexo generate\ 是不会生效的，必须重启 server，否则调试会一直看到旧行为。
本次因此浪费了一轮排查。
