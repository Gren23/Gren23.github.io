# 回滚脚本
# 用法：
#   powershell -File .backup\blog_restore.ps1 -List
#   powershell -File .backup\blog_restore.ps1 -Snapshot 20261103_101500
#   powershell -File .backup\blog_restore.ps1 -Tag backup/20261103_101500
#
# 恢复流程：先自动备份当前 -> 再覆盖 -> 提示重新构建

param(
    [string]$Snapshot,
    [string]$Tag,
    [switch]$List
)

$ErrorActionPreference = 'Stop'
$env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User')

$root = Split-Path -Parent $PSScriptRoot
if (-not $root) { $root = 'D:\blog' }
Set-Location $root

$snapRoot = Join-Path $root '.backup\snapshots'

if ($List) {
    Write-Host "=== snapshots ==="
    if (Test-Path $snapRoot) {
        Get-ChildItem $snapRoot -Directory | Sort-Object Name -Descending | ForEach-Object {
            $n = (Get-ChildItem $_.FullName -Recurse -File | Measure-Object).Count
            $mb = [math]::Round((Get-ChildItem $_.FullName -Recurse -File | Measure-Object Length -Sum).Sum / 1MB, 2)
            '  {0}  {1,5} files  {2,7} MB' -f $_.Name, $n, $mb
        }
    } else {
        Write-Host "  (none)"
    }
    Write-Host ""
    Write-Host "=== git tags ==="
    git tag -l 'backup/*' | Sort-Object -Descending | ForEach-Object { '  ' + $_ }
    Write-Host ""
    Write-Host "=== history ==="
    $h = Join-Path $root '.backup\HISTORY.md'
    if (Test-Path $h) { Get-Content $h -Encoding UTF8 | Select-Object -Last 25 }
    return
}

Write-Host "auto-backup current state first..."
& (Join-Path $PSScriptRoot 'blog_backup.ps1') -Reason "rollback pre-backup"

if ($Snapshot) {
    $src = Join-Path $snapRoot $Snapshot
    if (-not (Test-Path $src)) { throw "snapshot not found: $src" }
    Write-Host "restoring from snapshot: $Snapshot"

    Get-ChildItem $src -Force | ForEach-Object {
        $dest = Join-Path $root $_.Name
        if ($_.PSIsContainer) {
            if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
            Copy-Item $_.FullName $dest -Recurse -Force
        } else {
            Copy-Item $_.FullName $dest -Force
        }
        Write-Host "  restored $($_.Name)"
    }
    Write-Host ""
    Write-Host "done. rebuild with:"
    Write-Host "  hexo clean; hexo generate"
    return
}

if ($Tag) {
    Write-Host "restoring from git tag: $Tag"
    git checkout $Tag -- source scripts 'themes/butterfly/layout' _config.yml _config.butterfly.yml package.json 2>&1 | Out-String | Write-Host
    Write-Host ""
    Write-Host "done. verify then rebuild:"
    Write-Host "  git status"
    Write-Host "  hexo clean; hexo generate"
    return
}

Write-Host "usage:"
Write-Host "  -List"
Write-Host "  -Snapshot <timestamp>"
Write-Host "  -Tag <backup/timestamp>"
