# 备份与回滚

## 每次改动前先备份

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File D:\blog\.backup\blog_backup.ps1 -Reason "改首页卡片布局"
```

会做三件事：

1. 打 git 标签 `backup/<时间戳>`
2. 把易碎文件复制到 `.backup\snapshots\<时间戳>\`（约 4.5 MB / 265 文件）
3. 在 `.backup\HISTORY.md` 追加一行记录

**备份内容**：

```
source/                    全部源码（_posts / css / js / 各页面 md / 图片）
scripts/                   构建期脚本
themes/butterfly/layout/   Pug 模板
_config.yml                Hexo 配置
_config.butterfly.yml      主题配置
package.json
tailwind.config.js
.tailwind-entry.css
.gitignore
```

**不备份**：`node_modules`、`public`、`.deploy_git`（都能重建，体量大）

---

## 查看 / 回滚

```powershell
# 列出所有备份
powershell -File D:\blog\.backup\blog_restore.ps1 -List

# 从快照恢复（会自动先备份当前状态）
powershell -File D:\blog\.backup\blog_restore.ps1 -Snapshot 20261103_101336

# 从 git 标签恢复
powershell -File D:\blog\.backup\blog_restore.ps1 -Tag backup/20261103_101336
```

恢复后需要重新构建：

```powershell
$node='C:\Users\Administrator\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe'
$env:Path = Split-Path $node
cd D:\blog
& $node node_modules\hexo-cli\bin\hexo clean
& $node node_modules\hexo-cli\bin\hexo generate
```

---

## 三层保险

| 层 | 位置 | 用途 |
|---|---|---|
| 1. git 提交 | 本地 `.git` + 远端 `hexo` 分支 | 完整历史，可 diff |
| 2. git 标签 | `backup/<时间戳>` | 快速 checkout 到某个时点 |
| 3. 文件快照 | `.backup\snapshots\` | 不依赖 git，脚本也能读 |

---

## 注意

- `.backup/snapshots/` 已在 `.gitignore` 里，不会进仓库
- 快照会累积，定期清理旧的：删 `.backup\snapshots` 下不要的目录即可
- `_config.butterfly.yml` 和 `themes/butterfly/layout/` 是最常改的两处，务必确认它们在备份清单里（已包含）
