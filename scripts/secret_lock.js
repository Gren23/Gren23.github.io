'use strict'

/**
 * 脱敏内容处理（Hexo 插件）
 *
 * 输入：Markdown 里的显式标记
 *   [[secret:vnc-pwd|ERC654321]]
 *
 * 输出：
 *   1. 标记替换成 <span class="secret" data-key="vnc-pwd">******</span>
 *   2. 生成 data/secrets.json（AES-256-GCM 密文）
 *
 * 为什么用显式标记而不是全局字符串替换：
 *   上一版尝试「找到 estun 就替换」，结果把 URL /posts/estun-dh/、
 *   文件名 estun_er270_2700_algo.json、路径 robot\estun\ 全部误伤，
 *   canonical / og:url / JSON-LD 全坏。显式标记只改指定位置。
 *
 * 密码来源：环境变量 BLOG_SECRET_PASSWORD
 */

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const ITERATIONS = 600000

const HINTS = {
  'vnc-pwd': '如需密码请邮件联系 1955561070@qq.com',
  'ctl-user': '如需账号请邮件联系 1955561070@qq.com',
  'ctl-pwd': '如需密码请邮件联系 1955561070@qq.com'
}

const MARK_RE = /\[\[secret:([a-z0-9-]+)\|([^\]]*)\]\]/g

function b64 (buf) {
  return Buffer.from(buf).toString('base64')
}

function buildPayload (password, secrets) {
  const salt = crypto.randomBytes(16)
  const key = crypto.pbkdf2Sync(password, salt, ITERATIONS, 32, 'sha256')
  const payload = { iter: ITERATIONS, salt: b64(salt), secrets: {} }
  for (const [k, plain] of Object.entries(secrets)) {
    const iv = crypto.randomBytes(12)
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
    const ct = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
    const tag = cipher.getAuthTag()
    payload.secrets[k] = { iv: b64(iv), ct: b64(Buffer.concat([ct, tag])) }
  }
  return payload
}

hexo.extend.filter.register('after_render:html', function (str) {
  if (!str) return str
  if (str.indexOf('[[' + 'secret:') === -1) return str
  return str.replace(MARK_RE, function (full, key, plain) {
    const hint = HINTS[key] || ''
    return '<span class="secret" data-key="' + key + '" data-hint="' + hint + '">******</span>'
  })
}, 20)

hexo.on('generateAfter', function () {
  const postsDir = path.join(hexo.source_dir, '_posts')
  const store = {}

  function scan (dir) {
    if (!fs.existsSync(dir)) return
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name)
      const st = fs.statSync(p)
      if (st.isDirectory()) { scan(p); continue }
      if (!/\.(md|markdown)$/i.test(name)) continue
      const content = fs.readFileSync(p, 'utf8')
      if (content.indexOf('[[' + 'secret:') === -1) continue
      let m
      MARK_RE.lastIndex = 0
      while ((m = MARK_RE.exec(content)) !== null) { store[m[1]] = m[2] }
    }
  }

  scan(postsDir)

  const keys = Object.keys(store)
  if (keys.length === 0) { hexo.log.info('secret_lock: 未发现脱敏标记'); return }

  const password = (process.env.BLOG_SECRET_PASSWORD || '').trim()
  if (!password) {
    hexo.log.warn('secret_lock: BLOG_SECRET_PASSWORD 未设置，脱敏内容将无法解锁')
    return
  }

  const payload = buildPayload(password, store)
  const pubDir = path.join(hexo.public_dir, 'data')
  fs.mkdirSync(pubDir, { recursive: true })
  fs.writeFileSync(path.join(pubDir, 'secrets.json'), JSON.stringify(payload), 'utf8')

  hexo.log.info('secret_lock: 加密 ' + keys.length + ' 条 [' + keys.join(', ') + '] -> data/secrets.json')
})