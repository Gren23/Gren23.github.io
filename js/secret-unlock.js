/* ==========================================================================
   脱敏内容解锁
   --------------------------------------------------------------------------
   用法（在 Markdown / HTML 里）：
     <span class="secret" data-key="vnc-pwd" data-hint="问站长要">******</span>

   行为：
     - 默认显示 ******
     - 鼠标悬停显示 data-hint 的提示
     - 点击弹出内联输入框，输对密码后原地替换成真实值，并记住（localStorage）

   安全边界（必须知道）：
     - 纯前端加密，密文在页面里。拿到页面的人可以做离线爆破。
     - 密码 hehehey 是 7 位字典词，PBKDF2 60 万次迭代能挡住普通访客，
       但挡不住有针对性的字典攻击。真正敏感的凭据不该用这种方式保护。
   ========================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'blog.secret.pwd';
  var DATA_URL = '/data/secrets.json';

  // 缓存派生出的密钥，避免每次解密都跑一遍 PBKDF2
  var cachedKey = null;
  var cachedPassword = null;
  var payloadCache = null;

  var enc = new TextEncoder();

  function b64ToBytes(b64) {
    var bin = atob(b64);
    var out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  function loadPayload() {
    if (payloadCache) return Promise.resolve(payloadCache);
    return fetch(DATA_URL, { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error('secrets.json ' + r.status);
        return r.json();
      })
      .then(function (j) {
        payloadCache = j;
        return j;
      });
  }

  function deriveKey(password, payload) {
    if (cachedKey && cachedPassword === password) {
      return Promise.resolve(cachedKey);
    }
    var salt = b64ToBytes(payload.salt);
    return crypto.subtle
      .importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
      .then(function (baseKey) {
        return crypto.subtle.deriveBits(
          { name: 'PBKDF2', salt: salt, iterations: payload.iter, hash: 'SHA-256' },
          baseKey,
          256
        );
      })
      .then(function (bits) {
        return crypto.subtle.importKey('raw', bits, 'AES-GCM', false, ['decrypt']);
      })
      .then(function (key) {
        cachedKey = key;
        cachedPassword = password;
        return key;
      });
  }

  function decryptAll(password) {
    return loadPayload().then(function (payload) {
      return deriveKey(password, payload).then(function (key) {
        var keys = Object.keys(payload.secrets);
        return Promise.all(
          keys.map(function (k) {
            var e = payload.secrets[k];
            var data = b64ToBytes(e.ct);
            // 后 16 字节是 GCM tag
            var ct = data.subarray(0, data.length - 16);
            var tag = data.subarray(data.length - 16);
            var combined = new Uint8Array(ct.length + tag.length);
            combined.set(ct, 0);
            combined.set(tag, ct.length);

            return crypto.subtle
              .decrypt(
                { name: 'AES-GCM', iv: b64ToBytes(e.iv), tagLength: 128 },
                key,
                combined
              )
              .then(function (buf) {
                return { key: k, value: new TextDecoder().decode(buf) };
              })
              .catch(function () {
                return null; // 单个失败不影响整体
              });
          })
        ).then(function (results) {
          var map = {};
          results.forEach(function (r) {
            if (r) map[r.key] = r.value;
          });
          return map;
        });
      });
    });
  }

  // ---------- 把解密结果填进页面 ----------
  function apply(map) {
    var nodes = document.querySelectorAll('.secret[data-key]');
    var hit = 0;
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var k = el.getAttribute('data-key');
      if (Object.prototype.hasOwnProperty.call(map, k)) {
        el.textContent = map[k];
        el.classList.add('secret-revealed');
        el.removeAttribute('title');
        hit++;
      }
    }
    return hit;
  }

  // ---------- 内联输入框 ----------
  function buildEditor(el, onDone) {
    var wrap = document.createElement('span');
    wrap.className = 'secret-editor';

    var input = document.createElement('input');
    input.type = 'password';
    input.className = 'secret-input';
    input.placeholder = '输入密码解锁';
    input.autocomplete = 'off';

    var ok = document.createElement('button');
    ok.type = 'button';
    ok.className = 'secret-btn';
    ok.textContent = '解锁';

    var cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'secret-btn secret-btn-ghost';
    cancel.textContent = '取消';

    var msg = document.createElement('span');
    msg.className = 'secret-msg';

    wrap.appendChild(input);
    wrap.appendChild(ok);
    wrap.appendChild(cancel);
    wrap.appendChild(msg);

    function submit() {
      var pwd = input.value;
      if (!pwd) return;
      msg.textContent = '验证中…';
      msg.className = 'secret-msg';

      decryptAll(pwd)
        .then(function (map) {
          var n = apply(map);
          if (n > 0) {
            try { localStorage.setItem(STORAGE_KEY, pwd); } catch (e) { }
            if (onDone) onDone(true);
          } else {
            msg.textContent = '密码不对';
            msg.className = 'secret-msg secret-msg-err';
            input.select();
          }
        })
        .catch(function (e) {
          msg.textContent = '出错了：' + (e && e.message ? e.message : '未知');
          msg.className = 'secret-msg secret-msg-err';
        });
    }

    ok.addEventListener('click', submit);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); submit(); }
      if (e.key === 'Escape') { e.preventDefault(); if (onDone) onDone(false); }
    });
    cancel.addEventListener('click', function () { if (onDone) onDone(false); });

    return { wrap: wrap, input: input };
  }

  // ---------- 绑定所有 .secret ----------
  function bind() {
    var nodes = document.querySelectorAll('.secret[data-key]:not([data-bound])');

    for (var i = 0; i < nodes.length; i++) {
      (function (el) {
        el.setAttribute('data-bound', '1');

        // 悬停提示
        var hint = el.getAttribute('data-hint');
        if (hint && !el.classList.contains('secret-revealed')) {
          el.setAttribute('title', hint);
        }

        el.addEventListener('click', function (ev) {
          ev.preventDefault();
          if (el.classList.contains('secret-revealed')) return;
          if (el.querySelector('.secret-editor')) return;

          var original = el.textContent;
          var editor = buildEditor(el, function (success) {
            if (success) return; // apply() 已替换整个元素内容
            // 取消：还原 ★
            el.textContent = original;
            if (hint) el.setAttribute('title', hint);
          });

          el.textContent = '';
          el.appendChild(editor.wrap);
          editor.input.focus();
        });
      })(nodes[i]);
    }
  }

  // ---------- 初始化 ----------
  function init() {
    bind();

    // 之前解锁过：自动解密
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { }
    if (!saved) return;

    decryptAll(saved)
      .then(function (map) {
        var n = apply(map);
        if (n === 0) {
          // 密码已失效（换了密码或密文），清掉
          try { localStorage.removeItem(STORAGE_KEY); } catch (e) { }
        }
      })
      .catch(function () {
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) { }
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // pjax 兼容
  window.addEventListener('pjax:complete', function () { bind(); });
})();
