# hehehey.top — 待修复漏洞清单

- 检测时间：2026-11-15
- 资产：`hehehey.top` / `www.hehehey.top` / `images.hehehey.top` → **Cloudflare → Vercel**（104.21.29.144 / 172.67.149.68 均为 CF 边缘 IP，源站不可直连）
- 站点性质：`hehey.top` 的**镜像/备份站**，Hexo 静态生成，部署在 Vercel
- 与 `hehey.top` 的关系：两站内容同源，**凭据各存一份**（salt 不同、密码相同、解密后明文完全相同）。**修复必须两边都做**，只改一边等于没改。

---

## 一、清单总表

| # | 等级 | 问题 | 位置 | 谁能利用 | 状态 |
|---|---|---|---|---|---|
| H1 | 🔴 高危 | 搜索索引与 RSS 绕过前端脱敏，明文泄露 VNC 与控制器凭据 | `/search.json`、`/atom.xml` | 任何人，无需密码 | 已实测复现 |
| H2 | 🔴 高危 | 脱敏解锁密码硬编码在 JS 注释里，`secrets.json` 密文可离线解密 | `/js/secret-unlock.js`、`/data/secrets.json` | 任何人 | 已实测复现，已解出明文 |
| M1 | 🟡 中危 | `/data/secrets.json` 响应 `access-control-allow-origin: *`，任意站点可跨域读取密文 | `/data/secrets.json` | 任何恶意网页 | 已实测确认（hehey.top 没有这个问题） |
| M2 | 🟡 中危 | 缺少 DMARC / CAA 记录（有 TXT 但只有 Google 验证，无 SPF） | DNS | 任意发信人 / 任意 CA | 已实测确认 |
| M3 | 🟡 中危 | 大量安全响应头缺失（X-Frame-Options、X-Content-Type-Options、Referrer-Policy 全无） | 全站响应头 | 点击劫持、MIME 嗅探 | 已实测确认（hehey.top 有、这里没有） |
| L1 | 🟢 低危 | `/data/` 目录可直读文件（Vercel 静态托管无目录保护概念） | `/data/secrets.json`、`/data/links.json` | 任何人 | 已实测复现 |
| L2 | 🟢 低危 | 缺少 CSP 与 Permissions-Policy | 全站响应头 | — | 已实测确认 |
| I1 | ℹ️ 信息 | 内网拓扑泄露（文章正文含内网地址） | `/search.json`、文章正文 | 任何人 | 已实测复现 |

> **本靶标不存在的项目**（与 hehey.top 的关键差异，别照抄那边的清单）：
> - ❌ 无开放递归 DNS —— 源站在 Vercel，53 端口是 Cloudflare 边缘的，不属于本站
> - ❌ 无 888 端口、无 SSH 暴露 —— 无自建主机
> - ❌ 无源站 IP 暴露问题 —— Vercel 本身就是托管平台，`x-vercel-id` 可看出走的是托管
>
> 但**多了 M1（CORS `*`）和 M3（安全头大面积缺失）**，这是 hehey.top 没有而这里有的。

---

## 二、逐条详情

### H1 🔴 搜索索引与 RSS 明文泄露凭据

**根因**：与 hehey.top 相同 —— `secret-unlock.js` 只改 DOM 渲染结果，不改源文件；Hexo 搜索索引插件和 RSS 生成器读 Markdown 原文，把 `[[secret:...|明文]]` 原样输出。

**复现**：

```bash
curl -s https://www.hehehey.top/search.json | grep -o '\[\[secret:[^]]*\]\]' | sort | uniq -c
#   2 [[secret:vnc-pwd|ERC654321]]
#   2 [[secret:ctl-user|estun]]
#   1 [[secret:ctl-pwd|estun]]

curl -s https://www.hehehey.top/atom.xml | grep -o '\[\[secret:[^]]*\]\]' | sort | uniq -c
#   同上 5 处
```

- `/search.json`：148,340 字节，命中 5 处
- `/atom.xml`：301,724 字节，命中 5 处

**泄露的凭据**：

| 用途 | 用户名 | 密码 |
|---|---|---|
| VNC 远程连接 | — | `ERC654321` |
| ESTUN TOOL SERVER 后台 | `estun` | `estun` |

**修复**：
1. 含 secret 的文章加 front-matter `search: false`。
2. RSS 只输出摘要（Hexo `feed` / Butterfly `rss` 配置 `content: false`）。
3. **Vercel 部署后必须重新自检**：`curl -s https://www.hehehey.top/search.json | grep -c 'secret:'` 必须为 0。改了源文件不重新部署等于没改。

---

### H2 🔴 解锁密码写在 JS 注释里，密文可离线解密

**根因**：纯前端加密。密文挂在 Vercel 上对所有人可下载，解锁密码写在注释里。注意：**本站的 salt 与 hehey.top 不同，但密码相同，解密后明文完全相同** —— 说明两站是同一份源文件分别构建的。

**复现**：

```bash
curl -s https://www.hehehey.top/js/secret-unlock.js | grep -n "密码"
#  - 密码 hehehey 是 7 位字典词，PBKDF2 60 万次迭代能挡住普通访客，
#    但挡不住有针对性的字典攻击。真正敏感的凭据不该用这种方式保护。

curl -s https://www.hehehey.top/data/secrets.json
# {"iter":600000,"salt":"eYdWjE8BiI6dKoi2Mp1Gwg==","secrets":{...}}   ← salt 与 hehey.top 不同

python runs/hehey-top/decrypt_both.py
# === https://www.hehehey.top ===
#   vnc-pwd    = ERC654321
#   ctl-user   = estun
#   ctl-pwd    = estun
```

**修复**：
1. **删掉 JS 注释里的真实密码**（直接泄露）。
2. **Vercel 上没有 nginx 可以拦路径**，所以只能靠构建侧解决：
   - 把 `source/data/secrets.json` 从构建产物里排除（`vercel.json` 的 `rewrites` / `redirects` 拦掉 `/data/secrets.json` 返回 404），或
   - 根目录加 `_headers` / `vercel.json`：
     ```json
     {
       "headers": [{ "source": "/data/secrets.json", "headers": [{ "key": "Content-Disposition", "value": "attachment; filename=none" }] }],
       "redirects": [{ "source": "/data/secrets.json", "destination": "/404", "permanent": false },
                     { "source": "/data/(.*).json", "destination": "/404", "permanent": false }]
     }
     ```
   - 注意：**静态托管下 redirect 只是跳转，文件本身仍然能通过直链拿到**。最可靠的做法是**构建时就不把 secrets.json 写进产物**（在 `hexo generate` 后加一步 `rm -f public/data/secrets.json`）。
3. **根治**：凭据不放在站点上，文档只写"如需请联系 1955561070@qq.com"。

---

### M1 🟡 CORS `access-control-allow-origin: *` —— 任意站点可跨域读取密文

**这条是 hehehey.top 独有的**（hehey.top 的 `secrets.json` **没有** CORS 头）。

**实测**：

```bash
curl -i -H "Origin: https://evil.example" https://www.hehehey.top/data/secrets.json
# HTTP/1.1 200 OK
# Content-Type: application/json; charset=utf-8
# access-control-allow-origin: *
# content-disposition: inline; filename="secrets.json"

# 对照 hehey.top
curl -i -H "Origin: https://evil.example" https://hehey.top/data/secrets.json
# HTTP/1.1 200 OK
# Content-Type: application/json
# （无 access-control-allow-origin）
```

**危害**：任何恶意网页里一段 `fetch('https://www.hehehey.top/data/secrets.json').then(r=>r.json())` 就能把密文读走。配合 H2 里已知的密码 `hehehey`，**访客只要打开攻击者的页面，攻击者就能自动拿到 VNC 口令** —— 不需要访客访问本站、不需要访客做任何操作。这比 H1 更隐蔽（H1 是攻击者自己主动去取）。

**修复**：Vercel 里去掉通配 CORS。如果不需要跨域读，直接不发这个头：

```json
// vercel.json
{
  "headers": [{
    "source": "/(.*)",
    "headers": [{ "key": "Access-Control-Allow-Origin", "value": "https://www.hehehey.top" }]
  }]
}
```

或者在 `_headers` 文件里：
```
/*
  Access-Control-Allow-Origin: https://www.hehehey.top
```

> 确认一下这个 `*` 是哪来的 —— Vercel 默认不会加，多半是源站配置或某个插件加的。

---

### M2 🟡 缺 DMARC / CAA / SPF

**实测**：

```
TXT  hehehey.top         -> 只有 google-site-verification=ORhAHxiu1wNs...  （无 SPF）
TXT  _dmarc.hehehey.top  -> 无记录
MX   hehehey.top         -> 无记录
CAA  hehehey.top         -> 无记录（ancount=0）
DS   hehehey.top         -> 无（DNSSEC 未启用）
```

**危害**：任何人可伪造 `admin@hehehey.top` 发钓鱼邮件；任意 CA 都能为 `hehehey.top` 签证书。

> 注意：`hehey.top` 的 TXT 是**完全空的**，`hehehey.top` 至少有 Google 验证记录 —— 两站都缺 SPF/DMARC，但配置状态不一样。

**修复**（Cloudflare DNS，`hehehey.top` 也在 CF）：

```
TXT  @              "v=spf1 -all"                                       ← 保留原有 google-site-verification
TXT  _dmarc         "v=DMARC1; p=reject; rua=mailto:1955561070@qq.com"
CAA  @              0 issue "letsencrypt.org"
CAA  @              0 issue "pki.goog"                                  ← Vercel 常配 Google CA
```

> Vercel 签证书会用 Let's Encrypt 或 Google Trust Services，CAA 里两个都加上，否则 HTTPS 会挂。

---

### M3 🟡 安全响应头大面积缺失

**实测对比**（`www.hehehey.top` 响应头）：

| 响应头 | hehehey.top | hehey.top |
|---|---|---|
| Strict-Transport-Security | ✅ `max-age=63072000` | ✅ `max-age=31536000; includeSubDomains` |
| X-Frame-Options | ❌ **缺失** | ✅ `SAMEORIGIN` |
| X-Content-Type-Options | ❌ **缺失** | ✅ `nosniff` |
| Referrer-Policy | ❌ **缺失** | ✅ `strict-origin-when-cross-origin` |
| Content-Security-Policy | ❌ 缺失 | ❌ 缺失 |
| Permissions-Policy | ❌ 缺失 | ❌ 缺失 |

**危害**：
- 无 `X-Frame-Options` → 可被 iframe 嵌入做**点击劫持**（把本站套在攻击者页面里，诱导访客点"解锁密码"按钮）
- 无 `X-Content-Type-Options` → MIME 嗅探，配合上传类内容更容易触发 XSS

**修复**（Vercel `vercel.json`）：

```json
{
  "headers": [{
    "source": "/(.*)",
    "headers": [
      { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
      { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" },
      { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'self'" }
    ]
  }]
}
```

更省事的做法：根目录建 `_headers` 文件（Vercel 支持）：

```
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

### L1 🟢 `/data/` 下文件可直读

**实测**：

```
/data/              -> 404（Vercel 无目录索引）
/data/secrets.json  -> 200  (286 字节)
/data/links.json    -> 200  (187 字节)
```

Vercel 是纯静态托管，**没有 nginx 那种"关目录但开文件"的中间态** —— 这里 404 是因为 Vercel 不生成目录页，不是因为做了访问控制。**只要文件在产物里，就一定可下载。**

**修复**：构建时剔除敏感文件，这是唯一可靠的做法：

```bash
# package.json / 构建脚本里，hexo generate 之后加
rm -f public/data/secrets.json
```

或者干脆把 `source/data/secrets.json` 从仓库删掉，只保留 `secrets.example.json`。

---

### L2 🟢 缺 CSP / Permissions-Policy

与 hehey.top 相同问题，修复见 M3 的 `_headers` / `vercel.json` 配置（M3 一并解决）。

---

### I1 ℹ️ 内网拓扑泄露

`/search.json` 与文章正文里可读到内网地址（与 hehey.top 同源内容）：

```
192.168.60.63     ← ESTUN 控制器（VNC 目标）
192.168.60.1
192.168.60.161
192.168.170.22
192.168.100.169
192.168.0.56
192.168.100.2
```

**修复**：文章里把现场 IP 改成 `192.168.60.x` 占位。技术博客贴现场 IP + 默认口令 = **供应链风险**（这些网段可能属于客户现场）。

---

## 三、处置顺序

| 顺序 | 动作 | 耗时 | 关闭条目 |
|---|---|---|---|
| 1 | 改掉 `ERC654321` 和 `estun/estun`（设备在用就立刻改） | 10 min | 止损 |
| 2 | **构建时删掉 `public/data/secrets.json`**，重新部署（Vercel 没有路径拦截，这是唯一可靠手段） | 20 min | H2、L1 |
| 3 | 删 JS 注释里的密码，重新部署 | 10 min | H2 |
| 4 | 文章加 `search: false` + RSS 改摘要，重新部署后自检 `grep -c 'secret:'` 为 0 | 30 min | H1 |
| 5 | 去掉 CORS `*`，改成只允许自身域名 | 10 min | M1 |
| 6 | 加 `_headers`（X-Frame-Options / X-Content-Type-Options / Referrer-Policy / CSP / Permissions-Policy） | 20 min | M3、L2 |
| 7 | Cloudflare 加 SPF / DMARC / CAA（CAA 记得带 pki.goog） | 10 min | M2 |
| 8 | 文章内网 IP 脱敏 | 按篇数 | I1 |

> ⚠️ **Vercel 站的铁律**：所有源文件改动都要**重新构建 + 重新部署**才生效。改完必须用 `curl` 验证线上，不要看本地文件。

---

## 四、测过是干净的（别重复测）

- 子域枚举：只有 `www` 和 `images`，无其他暴露面
- `images.hehehey.top`：只有一张 robots.txt（从别处抄来的 content-signals 模板），`/data/*` `/search.json` 全部 404
- 目录探测：`/admin/`、`/.env`、`/.git/HEAD`、`/config.json`、`/api/*`、`/twikoo` 全 404（Vercel 的 `x-vercel-error: NOT_FOUND`）
- SQLi / 文件上传 / 反序列化 / 命令注入：**纯静态站，无动态后端**
- 端口：**无自建主机**，扫的是 CF 边缘 IP，与本靶标无关
- 开放递归 DNS：**不存在**（53 是 CF 的）
- TLS：Cloudflare 托管，协议与证书由 CF 管理
