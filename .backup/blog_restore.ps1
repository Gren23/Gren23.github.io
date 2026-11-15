# 回滚脚本（双站）
#
# 用法：
#   powershell -File .backup\blog_restore.ps1 -List
#   powershell -File .backup\blog_restore.ps1 -Snapshot 20261103_101500 -Site both
#   powershell -File .backup\blog_restore.ps1 -Snapshot 20261103_101500 -Site old
#   powershell -File .backup\blog_restore.ps1 -Snapshot 20261103_101500 -Site new
#   powershell -File .backup\blog_restore.ps1 -Tag backup/20261103_101500
#
# 恢复流程：先自动备份当前 -> 再覆盖 -> 提示重新构建

param(
    [string]$Snapshot,
    [string]$Tag,

    [ValidateSet('old', 'new', 'both')]
    [string]$Site = 'both',

    [switch]$List
)

$ErrorActionPreference = 'Stop'
$env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User')

$OLD_ROOT = 'D:\blog'
$NEW_ROOT = 'D:\blog-eurkon'

$roots = @{
    old = $OLD_ROOT
    new = $NEW_ROOT
}

Set-Location $OLD_ROOT

$snapRoot = Join-Path $OLD_ROOT '.backup\snapshots'

# ============================================================
# -List
# ============================================================
if ($List) {
    Write-Host '=== snapshots ==='
    if (Test-Path $snapRoot) {
        Get-ChildItem $snapRoot -Directory | Sort-Object Name -Descending | ForEach-Object {
            $stamp = $_.Name

            # 检查是新格式（含 old/new 子目录）还是旧格式（直接放文件）
            $oldDir = Join-Path $_.FullName 'old'
            $newDir = Join-Path $_.FullName 'new'
            $isNewFormat = (Test-Path $oldDir) -or (Test-Path $newDir)

            if ($isNewFormat) {
                $parts = @()
                foreach ($k in 'old', 'new') {
                    $d = Join-Path $_.FullName $k
                    if (Test-Path $d) {
                        $n = @(Get-ChildItem $d -Recurse -File -ErrorAction SilentlyContinue).Count
                        $mb = 0
                        if ($n -gt 0) {
                            $mb = [math]::Round((Get-ChildItem $d -Recurse -File | Measure-Object Length -Sum).Sum / 1MB, 2)
                        }
                        $label = if ($k -eq 'old') { 'old' } else { 'new' }
                        $parts += "$label($n 文件, $mb MB)"
                    }
                }
                '  {0}  {1}' -f $stamp, ($parts -join '  ')
            }
            else {
                # 旧格式（单站）
                $n = @(Get-ChildItem $_.FullName -Recurse -File -ErrorAction SilentlyContinue).Count
                $mb = 0
                if ($n -gt 0) {
                    $mb = [math]::Round((Get-ChildItem $_.FullName -Recurse -File | Measure-Object Length -Sum).Sum / 1MB, 2)
                }
                '  {0}  {1,5} files  {2,7} MB  [旧格式·仅旧站]' -f $stamp, $n, $mb
            }
        }
    }
    else {
        Write-Host '  (none)'
    }

    Write-Host ''
    Write-Host '=== git tags（仅旧站）==='
    Push-Location $OLD_ROOT
    try {
        $tags = git tag -l 'backup/*' 2>$null
        if ($tags) {
            $tags | Sort-Object -Descending | ForEach-Object { '  ' + $_ }
        }
        else {
            Write-Host '  (none)'
        }
    }
    catch {
        Write-Host '  (git 不可用)'
    }
    finally {
        Pop-Location
    }

    Write-Host ''
    Write-Host '=== history ==='
    $h = Join-Path $OLD_ROOT '.backup\HISTORY.md'
    if (Test-Path $h) {
        Get-Content $h -Encoding UTF8 | Select-Object -Last 25
    }
    return
}

# ============================================================
# 恢复前的自动备份
# ============================================================
Write-Host 'auto-backup current state first...'
Write-Host ''
& (Join-Path $PSScriptRoot 'blog_backup.ps1') -Reason 'rollback pre-backup' -Site $Site
Write-Host ''

# ============================================================
# -Snapshot 恢复
# ============================================================
if ($Snapshot) {
    $srcBase = Join-Path $snapRoot $Snapshot
    if (-not (Test-Path $srcBase)) {
        throw "snapshot not found: $srcBase"
    }

    # 判断是哪种格式
    $oldSnap = Join-Path $srcBase 'old'
    $newSnap = Join-Path $srcBase 'new'
    $isNewFormat = (Test-Path $oldSnap) -or (Test-Path $newSnap)

    Write-Host "restoring snapshot: $Snapshot (Site=$Site)"

    $sitesToRestore = @()
    if ($Site -eq 'both') {
        $sitesToRestore = @('old', 'new')
    }
    else {
        $sitesToRestore = @($Site)
    }

    foreach ($key in $sitesToRestore) {
        $label = if ($key -eq 'old') { '旧站' } else { '新站' }
        $root = $roots[$key]

        if ($isNewFormat) {
            $src = Join-Path $srcBase $key
        }
        else {
            # 旧格式：只有旧站内容，新站无法恢复
            if ($key -eq 'new') {
                Write-Host "  [$label] SKIP 旧格式快照不含新站" -ForegroundColor Yellow
                continue
            }
            $src = $srcBase
        }

        if (-not (Test-Path $src)) {
            Write-Host "  [$label] SKIP 快照无此站内容" -ForegroundColor Yellow
            continue
        }

        if (-not (Test-Path $root)) {
            Write-Host "  [$label] SKIP 目标目录不存在: $root" -ForegroundColor Yellow
            continue
        }

        Write-Host ''
        Write-Host "  [$label] $root"

        Get-ChildItem $src -Force | ForEach-Object {
            $dest = Join-Path $root $_.Name
            if ($_.PSIsContainer) {
                if (Test-Path $dest) {
                    Remove-Item $dest -Recurse -Force
                }
                Copy-Item $_.FullName $dest -Recurse -Force
            }
            else {
                Copy-Item $_.FullName $dest -Force
            }
            Write-Host "    restored $($_.Name)"
        }
    }

    Write-Host ''
    Write-Host 'done. rebuild with:'
    if ($Site -eq 'old' -or $Site -eq 'both') {
        Write-Host '  powershell -File D:\blog\.scratch\build.ps1 -Site old'
    }
    if ($Site -eq 'new' -or $Site -eq 'both') {
        Write-Host '  powershell -File D:\blog\.scratch\build.ps1 -Site new'
    }
    return
}

# ============================================================
# -Tag 恢复（仅旧站，git 只跟踪旧站）
# ============================================================
if ($Tag) {
    if ($Site -eq 'new') {
        Write-Host '-Tag 只能恢复旧站（git 只跟踪 D:\blog）' -ForegroundColor Yellow
        Write-Host '新站请用 -Snapshot' -ForegroundColor Yellow
        return
    }

    Write-Host "restoring from git tag: $Tag (仅旧站)"
    Push-Location $OLD_ROOT
    try {
        git checkout $Tag -- source scripts 'themes/butterfly/layout' _config.yml _config.butterfly.yml package.json 2>&1 | Out-String | Write-Host
    }
    finally {
        Pop-Location
    }
    Write-Host ''
    Write-Host 'done. verify then rebuild:'
    Write-Host '  cd D:\blog; git status'
    Write-Host '  powershell -File D:\blog\.scratch\build.ps1 -Site old'
    return
}

# ============================================================
# 无参数
# ============================================================
Write-Host 'usage:'
Write-Host '  -List                                      列出所有快照'
Write-Host '  -Snapshot <timestamp> [-Site old|new|both] 从快照恢复（默认 both）'
Write-Host '  -Tag <backup/timestamp>                    从 git 标签恢复（仅旧站）'
Write-Host ''
Write-Host '示例:'
Write-Host '  powershell -File .backup\blog_restore.ps1 -List'
Write-Host '  powershell -File .backup\blog_restore.ps1 -Snapshot 20261114_193000'
Write-Host '  powershell -File .backup\blog_restore.ps1 -Snapshot 20261114_193000 -Site new'
