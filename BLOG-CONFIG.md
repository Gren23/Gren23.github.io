# 博客配置说明文档

---

## 一、首页（index）

| 项目 | 内容 |
|------|------|
| 入口文件 | `layout/index.pug` |
| 内容渲染 | `layout/includes/home.pug` |
| 文章列表 | `pagination.pug` |

---

## 二、文章页（post）

| 项目 | 内容 |
|------|------|
| 入口文件 | `layout/post.pug` |

**文章页包含的组件：**

| 组件文件 | 作用 |
|----------|------|
| `includes/post/post-info.pug` | 文章标题、日期、分类、标签 |
| `includes/post/outdate-notice.pug` | 文章过期提醒 |
| `includes/post/reward.pug` | 打赏按钮 |
| `includes/post/post-copyright.pug` | 文章版权信息 |

---

## 三、独立页面（page）

| 页面 | 入口文件 |
|------|----------|
| 关于页 | `includes/page/about.pug` |
| 友链页 | `includes/page/flink.pug` |
| 标签页 | `includes/page/tags.pug` |
| 分类页 | `includes/page/categories.pug` |
| 公告页 | `includes/page/notice.pug` |
| 说说 | `includes/page/shuoshuo.pug` |
| 收藏 | `includes/page/stars.pug` |
| 404 | `includes/post/404.pug` |

---

## 四、顶部导航栏（nav）

**文件：** `layout/includes/header/nav.pug`

**导航栏结构：**

| 元素 | 作用 |
|------|------|
| `#blog-info` | 博客名称 + 首页图标 |
| `#page-title` | 文章标题（已注释） |
| `#menus` | 菜单项（内容来自配置） |
| `#search-button` | 搜索按钮 |
| `#comment-button` | 前往评论（已注释） |
| `#setting-button` | 设置（已注释） |
| `#top-button` | 回到顶部（已注释） |
| `#toggle-menu` | 移动端菜单 |

**菜单内容来源：** `theme.menu` → `includes/header/menu_item.pug`

---

## 五、右下角按钮（rightside）

**文件：** `layout/includes/rightside.pug`

| 按钮 | 作用 |
|------|------|
| `#go-up` | 回到顶部（已注释） |
| `#darkmode` | 日/夜间切换 |
| `#hide-aside-btn` | 显示/隐藏侧边栏 |
| `#readmode` | 阅读模式 |
| `#translateLink` | 翻译 |
| `#mobile-toc-button` | 文章目录 |
| `#to_comment` | 前往评论 |
| `#rightside-config` | 设置齿轮 |

**显示控制：** `theme.rightside_item_order`

---

## 六、右键菜单（rightmenu）

**文件：** `layout/includes/rightmenu.pug`

控制博客内右键点击时弹出的菜单。

---

## 七、页脚（footer）

**文件：** `layout/includes/footer.pug`

包含统计、导航、友链、版权、备案号等。

---

## 八、侧边栏（sidebar）

**文件：** `layout/includes/sidebar.pug`

包含最新文章、评论、标签云、分类等。

---

## 九、全局头部（head）

**文件：** `layout/includes/head.pug`

引入 CSS、JS、字体等资源。

---

## 十、全局配置

**文件：** `博客/blog/_config.butterfly.yml`

所有页面配置的根配置文件。

---

## 十一、自定义 JS

| 文件 | 作用 |
|------|------|
| `source/js/main.js` | 主脚本，含 adjustMenu 等全局逻辑 |
| `source/js/eurkon/refresh.js` | 页面刷新时初始化 |
| `source/js/eurkon/eurkon.js` | 主题核心功能 |
| `source/js/eurkon/color-thief.min.js` | 提取封面主色调 |
| `source/js/eurkon/rgbaster.min.js` | 备用颜色提取 |
| `source/js/utils.js` | 工具函数 |

---

## 十二、通用组件目录

| 目录 | 作用 |
|------|------|
| `includes/mixins/` | 可复用模板片段 |
| `includes/widget/` | 侧边栏小卡片 |
| `includes/third-party/` | 第三方插件（评论、统计等） |
| `includes/additional-js.pug` | 额外 JS 注入 |
| `includes/loading.pug` | 加载动画 |