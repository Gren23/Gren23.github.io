'use strict'

/**
 * 产物安全清理
 *
 * 背景：
 *   secret_lock.js 的 after_render:html 只处理 HTML 渲染结果。
 *   但 Hexo 还有两个地方会直接读 Markdown 原文：
 *     1. hexo-generator-searchdb -> public/search.json
 *     2. hexo-generator-feed    -> public/atom.xml
 *   这两处会把 [[secret:key|明文]] 原样输出，等于把凭据公开挂在网上。
 *
 * 时机问题（关键）：
 *   Hexo 8 的 after_generate 是**流式**的 —— 触发时 public/ 里的文件
 *   还没写完（实测只扫到 1 个文件）。
 *
 *   所以本模块**不做 Hexo 插件**，而是提供一个可被外部调用的清理函数。
 *   在 `hexo generate` 完全结束后，由 post_build_clean.js 或 build.ps1 调用，
 *   此时文件系统已就绪，100% 可靠。
 *
 * 用法：
 *   node scripts/security_clean.js [publicDir]
 *   默认 publicDir = ../public
 */

const fs = require('fs')
const path = require('path')

// secret 标记：[[secret:key|明文]]
const SECRET_RE = /\[\[secret:([a-z0-9-]+)\|([^\]]*)\]\]/g

// 内网 IP：192.168.x.x / 10.x.x.x / 172.16-31.x.x
const PRIVATE_IP_RE = /\b(?:192\.168|10|172\.(?:1[6-9]|2\d|3[01]))\.\d{1,3}\.\d{1,3}\b/g

// 需要清理的文本产物扩展名
const TEXT_EXT = new Set(['.json', '.xml', '.txt'])

// 生成后必须删除的文件（当前为空：secrets.json 按需保留）
const DELETE_AFTER_BUILD = []

// 跳过的目录（体积大 / 二进制 / 压缩库）
const SKIP_DIRS = new Set(['lib', 'assets', 'img', 'images', 'webfonts', 'js', 'css'])

// 跳过的文件
const SKIP_FILES = new Set(['all.min.css'])

const HINTS = {
  'vnc-pwd': '如需密码请邮件联系 1955561070@qq.com',
  'ctl-user': '如需账号请邮件联系 1955561070@qq.com',
  'ctl-pwd': '如需密码请邮件联系 1955561070@qq.com'
}


function walk(dir, out) {
  let entries
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch (e) {
    return out
  }
  for (const ent of entries) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue
      walk(p, out)
    } else {
      out.push(p)
    }
  }
  return out
}


/**
 * 清理 public 目录
 * @param {string} publicDir  绝对路径
 * @param {object} logger     可选 {info, warn}
 * @returns {object}          统计
 */
function cleanPublic(publicDir, logger) {
  const log = logger || { info: () => {}, warn: () => {} }
  const stats = {
    filesScanned: 0,
    secretCleaned: 0,
    privateIpMasked: 0,
    deletedFiles: [],
    details: []
  }

  if (!publicDir || !fs.existsSync(publicDir)) {
    log.warn(`[security-clean] public_dir 不存在: ${publicDir}`)
    return stats
  }

  // 1. 删除敏感文件
  for (const rel of DELETE_AFTER_BUILD) {
    const p = path.join(publicDir, rel)
    if (fs.existsSync(p)) {
      fs.unlinkSync(p)
      stats.deletedFiles.push(rel)
      log.info(`[security-clean] 已删除 ${rel}`)
    }
  }

  // 2. 扫描文本产物
  const files = walk(publicDir, [])

  for (const file of files) {
    const base = path.basename(file)
    if (SKIP_FILES.has(base)) continue

    const ext = path.extname(file).toLowerCase()
    if (!TEXT_EXT.has(ext)) continue

    let content
    try {
      content = fs.readFileSync(file, 'utf8')
    } catch (e) {
      continue
    }
    stats.filesScanned++

    let changed = false
    const rel = path.relative(publicDir, file).replace(/\\/g, '/')
    const detail = { file: rel, secrets: 0, ips: 0 }

    // 2a. secret 标记
    if (content.indexOf('[[' + 'secret:') !== -1) {
      const before = content
      content = content.replace(SECRET_RE, (full, key) => {
        stats.secretCleaned++
        detail.secrets++
        const hint = HINTS[key] || ''
        return `[已脱敏:${key}${hint ? ' - ' + hint : ''}]`
      })
      if (content !== before) changed = true
    }
    SECRET_RE.lastIndex = 0

    // 2b. 内网 IP
    PRIVATE_IP_RE.lastIndex = 0
    const ipMatches = []
    let m
    while ((m = PRIVATE_IP_RE.exec(content)) !== null) {
      ipMatches.push(m[0])
    }
    PRIVATE_IP_RE.lastIndex = 0

    if (ipMatches.length > 0) {
      content = content.replace(PRIVATE_IP_RE, (ip) => {
        stats.privateIpMasked++
        detail.ips++
        const parts = ip.split('.')
        if (parts[0] === '10') {
          return `${parts[0]}.${parts[1]}.x.x`
        }
        return `${parts[0]}.${parts[1]}.${parts[2]}.x`
      })
      changed = true
    }
    PRIVATE_IP_RE.lastIndex = 0

    if (changed) {
      try {
        fs.writeFileSync(file, content, 'utf8')
        if (detail.secrets > 0 || detail.ips > 0) {
          stats.details.push(detail)
        }
      } catch (e) {
        log.warn(`[security-clean] 写入失败 ${rel}: ${e.message}`)
      }
    }
  }

  return stats
}


module.exports = { cleanPublic, SECRET_RE, PRIVATE_IP_RE }


// ── 直接运行时 ──
if (require.main === module) {
  const target = process.argv[2] || path.join(__dirname, '..', 'public')

  console.log('='.repeat(78))
  console.log(' 产物安全清理')
  console.log('='.repeat(78))
  console.log(` 目标: ${target}`)
  console.log()

  const logger = {
    info: (s) => console.log('  ' + s),
    warn: (s) => console.log('  ' + s)
  }

  const stats = cleanPublic(target, logger)

  console.log()
  console.log('='.repeat(78))
  console.log(' 结果')
  console.log('='.repeat(78))
  console.log(`  扫描文件:     ${stats.filesScanned}`)
  console.log(`  secret 清理:  ${stats.secretCleaned} 处`)
  console.log(`  内网 IP 脱敏: ${stats.privateIpMasked} 处`)
  console.log(`  删除文件:     ${stats.deletedFiles.length}`)

  if (stats.details.length > 0) {
    console.log()
    console.log('  明细:')
    for (const d of stats.details) {
      const parts = []
      if (d.secrets) parts.push(`secret ${d.secrets}`)
      if (d.ips) parts.push(`IP ${d.ips}`)
      console.log(`    ${d.file.padEnd(32)} ${parts.join(', ')}`)
    }
  }

  // 验证
  console.log()
  console.log('='.repeat(78))
  console.log(' 验证关键文件')
  console.log('='.repeat(78))

  const critical = ['search.json', 'atom.xml']
  let allClean = true

  for (const f of critical) {
    const p = path.join(target, f)
    if (!fs.existsSync(p)) {
      console.log(`  - ${f}: 不存在`)
      continue
    }
    const t = fs.readFileSync(p, 'utf8')

    const secHits = (t.match(new RegExp(SECRET_RE.source, 'g')) || []).length
    const ipHits = (t.match(new RegExp(PRIVATE_IP_RE.source, 'g')) || []).length

    const ok = secHits === 0 && ipHits === 0
    if (!ok) allClean = false
    console.log(`  ${ok ? '✓' : '✗'} ${f.padEnd(14)} secret ${secHits} 处, 内网IP ${ipHits} 处`)
  }

  console.log()
  if (allClean) {
    console.log('  ✓ 全部清理干净')
    process.exit(0)
  } else {
    console.log('  ✗ 仍有残留')
    process.exit(1)
  }
}
