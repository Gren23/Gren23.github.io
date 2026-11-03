# 备份脚本
# 用法（每次改动前执行）：
#   powershell -NoProfile -ExecutionPolicy Bypass -File .backup\blog_backup.ps1 -Reason "改首页布局"
#
# 做三件事：
#   1. 创建 git 快照标签 backup/<时间戳>（可随时 checkout 回去）
#   2. 把易碎文件整包复制到 .backup\snapshots\<时间戳>\（不依赖 git）
#   3. 追加一行到 .backup\HISTORY.md
#
# 不复制 node_modules / public / .deploy_git（可重建，体量大）

param(
    [string]$Reason = "未标注"
)

$ErrorActionPreference = 'Stop'
$env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User')

$root = Split-Path -Parent $PSScriptRoot
if (-not $root) { $root = 'D:\blog' }
Set-Location $root

$stamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$snapDir = Join-Path (Join-Path $root '.backup\snapshots') $stamp
New-Item -ItemType Directory -Force -Path $snapDir | Out-Null

# 1. git 状态
$head = (git rev-parse HEAD).Trim()
$headShort = $head.Substring(0, 8)
$dirty = @(git status --porcelain).Count
$branch = (git rev-parse --abbrev-ref HEAD).Trim()
Write-Host "[1/3] git HEAD = $headShort ($branch), dirty=$dirty"

# 2. 复制易碎文件
$targets = @(
    'source',
    'scripts',
    'themes\butterfly\layout',
    '_config.yml',
    '_config.butterfly.yml',
    'package.json',
    'tailwind.config.js',
    '.tailwind-entry.css',
    '.gitignore'
)

foreach ($t in $targets) {
    $src = Join-Path $root $t
    if (-not (Test-Path $src)) { continue }
    $dst = Join-Path $snapDir $t
    $parent = Split-Path -Parent $dst
    if (-not (Test-Path $parent)) { New-Item -ItemType Directory -Force -Path $parent | Out-Null }
    if ((Get-Item $src).PSIsContainer) {
        Copy-Item $src $dst -Recurse -Force
    } else {
        Copy-Item $src $dst -Force
    }
}

$fileCount = (Get-ChildItem $snapDir -Recurse -File | Measure-Object).Count
$mb = [math]::Round((Get-ChildItem $snapDir -Recurse -File | Measure-Object Length -Sum).Sum / 1MB, 2)
Write-Host "[2/3] snapshot: $fileCount files / $mb MB -> .backup\snapshots\$stamp"

# 3. git 标签 + 历史
$tagName = 'backup/' + $stamp
$tagOk = $false
try {
    git tag -f $tagName $head 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) { $tagOk = $true }
} catch {
    $tagOk = $false
}
if ($tagOk) {
    Write-Host "[3/3] git tag: $tagName"
} else {
    Write-Host "[3/3] git tag skipped (snapshot still usable)"
}

$historyFile = Join-Path $root '.backup\HISTORY.md'
if (-not (Test-Path $historyFile)) {
    $header = @(
        '# 备份历史',
        '',
        '> 由 .backup/blog_backup.ps1 自动追加。回滚见 .backup/README.md',
        '',
        '| 时间 | 原因 | commit | dirty | 标签 | 快照 |',
        '|---|---|---|---|---|---|'
    )
    $header | Set-Content $historyFile -Encoding UTF8
}

$now = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
$tagCell = '-'
if ($tagOk) { $tagCell = $tagName }
$line = '| ' + $now + ' | ' + $Reason + ' | ' + $headShort + ' | ' + $dirty + ' | ' + $tagCell + ' | ' + $stamp + ' |'
Add-Content $historyFile -Value $line -Encoding UTF8

Write-Host ""
Write-Host "backup done: $Reason"
Write-Host "  snapshot: .backup\snapshots\$stamp"
Write-Host "  restore : powershell -File .backup\blog_restore.ps1 -Snapshot $stamp"
