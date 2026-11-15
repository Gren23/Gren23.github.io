# 备份脚本（双站）
#
# 用法（每次改动前执行）：
#   powershell -NoProfile -ExecutionPolicy Bypass -File .backup\blog_backup.ps1 -Reason "改首页布局"
#   powershell -File .backup\blog_backup.ps1 -Reason "xxx" -Site old    只备份旧站
#   powershell -File .backup\blog_backup.ps1 -Reason "xxx" -Site new    只备份新站
#   powershell -File .backup\blog_backup.ps1 -Reason "xxx" -Site both   两个都备份（默认）
#
# 做四件事：
#   1. 旧站：创建 git 快照标签 backup/<时间戳>（可随时 checkout 回去）
#   2. 两个站：把易碎文件整包复制到 .backup\snapshots\<时间戳>\{old,new}\
#   3. 追加一行到 .backup\HISTORY.md
#   4. 显示备份结果
#
# 不复制 node_modules / public / .deploy_git（可重建，体量大）
#
# 站点定义：
#   旧站  D:\blog           Butterfly  -> www.hehehey.top
#   新站  D:\blog-eurkon    Eurkon     -> hehey.top

param(
    [string]$Reason = "未标注",

    [ValidateSet('old', 'new', 'both')]
    [string]$Site = 'both'
)

$ErrorActionPreference = 'Stop'
$env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User')

# --- 站点定义 ---
$OLD_ROOT = 'D:\blog'
$NEW_ROOT = 'D:\blog-eurkon'

# --- 每个站要备份的易碎文件（相对路径）---
$TARGETS = @(
    'source',
    'scripts',
    'themes\butterfly\layout',
    '_config.yml',
    '_config.butterfly.yml',
    'package.json'
)

# 旧站独有的额外文件
$OLD_ONLY = @(
    'tailwind.config.js',
    '.tailwind-entry.css',
    '.gitignore'
)

# 新站独有的额外文件
$NEW_ONLY = @()

# ============================================================

$stamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$snapBase = Join-Path $OLD_ROOT ".backup\snapshots\$stamp"
New-Item -ItemType Directory -Force -Path $snapBase | Out-Null

Write-Host '============================================================'
Write-Host " 备份  Site=$Site"
Write-Host " 原因: $Reason"
Write-Host '============================================================'
Write-Host ''

$summary = @()

# --- 备份单个站 ---
function Backup-OneSite {
    param(
        [string]$Name,
        [string]$Root,
        [string[]]$ExtraFiles,
        [string]$SnapDir
    )

    if (-not (Test-Path $Root)) {
        Write-Host "  [$Name] SKIP 目录不存在: $Root" -ForegroundColor Yellow
        return $null
    }

    Write-Host "  [$Name] $Root"

    $targets = $TARGETS + $ExtraFiles
    $copied = 0
    $missing = @()

    foreach ($t in $targets) {
        $src = Join-Path $Root $t
        if (-not (Test-Path $src)) {
            $missing += $t
            continue
        }
        $dst = Join-Path $SnapDir $t
        $parent = Split-Path -Parent $dst
        if (-not (Test-Path $parent)) {
            New-Item -ItemType Directory -Force -Path $parent | Out-Null
        }
        if ((Get-Item $src).PSIsContainer) {
            Copy-Item $src $dst -Recurse -Force
        }
        else {
            Copy-Item $src $dst -Force
        }
        $copied++
    }

    $files = @(Get-ChildItem $SnapDir -Recurse -File -ErrorAction SilentlyContinue)
    $sizeMb = 0
    if ($files.Count -gt 0) {
        $sizeMb = [math]::Round(($files | Measure-Object Length -Sum).Sum / 1MB, 2)
    }

    Write-Host "    OK $copied/$($targets.Count) 项, $($files.Count) 文件, $sizeMb MB"

    if ($missing.Count -gt 0) {
        Write-Host "    跳过不存在的: $($missing -join ', ')" -ForegroundColor DarkGray
    }

    # 该站的 git 信息（只有旧站是 git 仓库）
    $gitInfo = $null
    Push-Location $Root
    try {
        $gitCheck = git rev-parse --git-dir 2>$null
        if ($LASTEXITCODE -eq 0) {
            $head = (git rev-parse HEAD).Trim()
            $headShort = $head.Substring(0, 8)
            $dirty = @(git status --porcelain).Count
            $branch = (git rev-parse --abbrev-ref HEAD).Trim()
            $gitInfo = @{
                Head   = $head
                Short  = $headShort
                Dirty  = $dirty
                Branch = $branch
            }
            Write-Host "    git HEAD = $headShort ($branch), dirty=$dirty"
        }
        else {
            Write-Host '    (非 git 仓库)'
        }
    }
    catch {
        Write-Host '    (非 git 仓库)'
    }
    finally {
        Pop-Location
    }

    return @{
        Name    = $Name
        Root    = $Root
        Files   = $files.Count
        SizeMb  = $sizeMb
        Copied  = $copied
        Missing = $missing
        Git     = $gitInfo
    }
}

# ============================================================
# 主流程
# ============================================================

# --- 旧站 ---
if ($Site -eq 'old' -or $Site -eq 'both') {
    $oldSnap = Join-Path $snapBase 'old'
    New-Item -ItemType Directory -Force -Path $oldSnap | Out-Null
    $r = Backup-OneSite -Name 'old' -Root $OLD_ROOT -ExtraFiles $OLD_ONLY -SnapDir $oldSnap
    if ($r) { $summary += $r }
    Write-Host ''
}

# --- 新站 ---
if ($Site -eq 'new' -or $Site -eq 'both') {
    $newSnap = Join-Path $snapBase 'new'
    New-Item -ItemType Directory -Force -Path $newSnap | Out-Null
    $r = Backup-OneSite -Name 'new' -Root $NEW_ROOT -ExtraFiles $NEW_ONLY -SnapDir $newSnap
    if ($r) { $summary += $r }
    Write-Host ''
}

# --- 旧站 git 标签 ---
$tagName = ''
$oldSummary = $summary | Where-Object { $_.Name -eq 'old' } | Select-Object -First 1
if ($oldSummary -and $oldSummary.Git) {
    $tagName = 'backup/' + $stamp
    Push-Location $OLD_ROOT
    try {
        git tag -f $tagName $oldSummary.Git.Head 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  git tag: $tagName" -ForegroundColor Green
        }
        else {
            Write-Host '  git tag skipped' -ForegroundColor DarkGray
            $tagName = ''
        }
    }
    catch {
        Write-Host '  git tag skipped' -ForegroundColor DarkGray
        $tagName = ''
    }
    finally {
        Pop-Location
    }
}

# --- 写 HISTORY.md ---
$historyFile = Join-Path $OLD_ROOT '.backup\HISTORY.md'
if (-not (Test-Path $historyFile)) {
    $header = @(
        '# 备份历史',
        '',
        '> 由 .backup/blog_backup.ps1 自动追加。回滚见 .backup/README.md',
        '',
        '| 时间 | 原因 | 站点 | 旧站 commit | 旧站 dirty | 标签 | 快照 |',
        '|---|---|---|---|---|---|---|'
    )
    $header | Set-Content $historyFile -Encoding UTF8
}

$now = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'

$oldHead = '-'
$oldDirty = '-'
if ($oldSummary -and $oldSummary.Git) {
    $oldHead = $oldSummary.Git.Short
    $oldDirty = $oldSummary.Git.Dirty
}

$tagCell = if ($tagName) { $tagName } else { '-' }

$line = '| ' + $now + ' | ' + $Reason + ' | ' + $Site + ' | ' + $oldHead + ' | ' + $oldDirty + ' | ' + $tagCell + ' | ' + $stamp + ' |'
Add-Content $historyFile -Value $line -Encoding UTF8

# --- 汇总 ---
Write-Host '============================================================'
Write-Host ' 备份完成' -ForegroundColor Green
Write-Host '============================================================'
Write-Host ''

foreach ($s in $summary) {
    $label = if ($s.Name -eq 'old') { '旧站' } else { '新站' }
    Write-Host ("  {0}  {1,-20} {2,4} 文件  {3,7} MB" -f $label, $s.Root, $s.Files, $s.SizeMb)
}

$totalFiles = 0
$totalMbRaw = 0.0
foreach ($s in $summary) {
    $totalFiles += [int]$s.Files
    $totalMbRaw += [double]$s.SizeMb
}
$totalMb = [math]::Round($totalMbRaw, 2)
Write-Host ''
Write-Host "  合计: $totalFiles 文件, $totalMb MB"
Write-Host ''
Write-Host "  快照: .backup\snapshots\$stamp"
if ($tagName) {
    Write-Host "  标签: $tagName"
}
Write-Host ''
Write-Host '  恢复:'
Write-Host "    powershell -File .backup\blog_restore.ps1 -List"
if ($Site -eq 'both' -or $Site -eq 'new') {
    Write-Host "    powershell -File .backup\blog_restore.ps1 -Snapshot $stamp -Site new"
}
if ($Site -eq 'both' -or $Site -eq 'old') {
    Write-Host "    powershell -File .backup\blog_restore.ps1 -Snapshot $stamp -Site old"
}
