/* ==========================================================================
   超级工作台 — 业务逻辑
   四个工具：封面生成 / Front Matter / 微信排版 / 图片 WebP 压缩

   依赖（在 index.md 里按顺序加载）：
     lucide.min.js  — 图标渲染
     marked.min.js  — Markdown 解析

   对外暴露的全局函数：
     drawCover()  switchTab()  executeCompress()  copyRichText()
     renderChips()  updateFrontMatter()  showToast()  ...
   ========================================================================== */

// 1. 全局配置切换状态机
        let currentTab = 'cover';
        let currentFmFormat = 'yaml';
        let coverTemplate = 'tech';
        let bgGradient = {
            start: '#1e1b4b', // 深蓝底
            mid: '#0f172a',   // 极客黑
            end: '#0284c7'    // 天蓝色
        };

        let categories = ['技术分享'];
        let tags = ['前端开发', '自媒体排版'];
        let uploadedImageObj = null;

        window.onload = function() {
            lucide.createIcons();

            // 修复5: 成功配置并声明时间所需的 date 对象实例化逻辑
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            document.getElementById('fm-date').value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            // 初次装填渲染
            drawCover();
            updateFrontMatter();
            renderChips();
            loadSampleMarkdown();
            initDragAndDrop();
        };

        // 视图导航切换器
        function switchTab(tabId) {
            currentTab = tabId;
            ['cover', 'fm', 'markdown', 'compress'].forEach(t => {
                const btn = document.getElementById(`tab-${t}`);
                const panel = document.getElementById(`panel-${t}`);
                if (t === tabId) {
                    btn.className = "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 bg-brand-600 text-white shadow-sm";
                    panel.classList.remove('hidden');
                } else {
                    btn.className = "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 text-slate-600 hover:text-slate-900";
                    panel.classList.add('hidden');
                }
            });

            if (tabId === 'cover') {
                setTimeout(drawCover, 50);
            }
        }

        // 弹出通知栏
        function showToast(message, isError = false) {
            const toast = document.getElementById('toast');
            const msgEl = document.getElementById('toast-message');
            const iconBox = document.getElementById('toast-icon-box');

            msgEl.textContent = message;
            if (isError) {
                iconBox.className = "p-1 rounded bg-red-500/20 text-red-400";
                iconBox.innerHTML = '<i data-lucide="alert-circle" class="w-4 h-4"></i>';
            } else {
                iconBox.className = "p-1 rounded bg-brand-500/20 text-brand-600";
                iconBox.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i>';
            }
            lucide.createIcons();

            toast.classList.remove('translate-y-20', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');

            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }

        /* ---------------------------------
           【核心 1】封面图像渲染内核
           --------------------------------- */
        function getCanvasSize() {
            const aspect = document.getElementById('cover-aspect').value;
            switch(aspect) {
                case '16-9': return { width: 1280, height: 720 };
                case '1-1': return { width: 800, height: 800 };
                case '2-1':
                default:
                    return { width: 1200, height: 600 };
            }
        }

        function changeAspect() {
            drawCover();
        }

        function setTemplate(tpl) {
            coverTemplate = tpl;
            ['tech', 'card', 'minimalist'].forEach(item => {
                const btn = document.getElementById(`tpl-${item}`);
                if (item === tpl) {
                    btn.className = "px-3 py-2 bg-brand-100 text-brand-700 border border-brand-200 rounded-lg text-xs font-medium transition text-center";
                } else {
                    btn.className = "px-3 py-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-100 transition text-center";
                }
            });
            drawCover();
        }

        function quickEmoji(emoji) {
            document.getElementById('cover-emoji').value = emoji;
            drawCover();
        }

        function setGradient(start, mid, end) {
            bgGradient = { start, mid, end };
            drawCover();
        }

        function drawCover() {
            const canvas = document.getElementById('coverCanvas');
            const ctx = canvas.getContext('2d');
            const size = getCanvasSize();
            canvas.width = size.width;
            canvas.height = size.height;

            const title = document.getElementById('cover-title').value || '';
            const subtitle = document.getElementById('cover-subtitle').value || '';
            const tag = document.getElementById('cover-tag').value || '';
            const author = document.getElementById('cover-author').value || '';
            const emoji = document.getElementById('cover-emoji').value || '';

            // 绘制渐变底层
            const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            grad.addColorStop(0, bgGradient.start);
            grad.addColorStop(0.5, bgGradient.mid);
            grad.addColorStop(1, bgGradient.end);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 虚拟星云光效
            ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
            ctx.beginPath();
            ctx.arc(canvas.width * 0.8, canvas.height * 0.25, canvas.width * 0.35, 0, Math.PI*2);
            ctx.fill();

            if (coverTemplate === 'tech') {
                drawTech(ctx, canvas, title, subtitle, tag, author, emoji);
            } else if (coverTemplate === 'card') {
                drawCard(ctx, canvas, title, subtitle, tag, author, emoji);
            } else {
                drawMinimalist(ctx, canvas, title, subtitle, tag, author, emoji);
            }
        }

        function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
            const chars = text.split('');
            let line = '';
            let lines = [];
            for (let n = 0; n < chars.length; n++) {
                let testLine = line + chars[n];
                let metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && n > 0) {
                    lines.push(line);
                    line = chars[n];
                } else {
                    line = testLine;
                }
            }
            lines.push(line);
            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], x, y + (i * lineHeight));
            }
            return lines.length;
        }

        function drawTech(ctx, canvas, title, subtitle, tag, author, emoji) {
            // 背景点阵
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.lineWidth = 1;
            for (let i = 0; i < canvas.width; i += 40) {
                ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
            }
            for (let j = 0; j < canvas.height; j += 40) {
                ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(canvas.width, j); ctx.stroke();
            }

            const p = 60;
            // 绘制中心 Emoji Box
            ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 2;
            roundRect(ctx, p, p, 80, 80, 16, true, true);
            ctx.font = '44px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(emoji, p + 40, p + 40);

            // 类别徽标
            ctx.fillStyle = '#7dd3fc';
            ctx.font = 'bold 15px "Inter", "Noto Sans SC"';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(tag.toUpperCase(), p, p + 110);

            // 作者与装饰线
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillText(author, p, canvas.height - p - 10);
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(p, canvas.height - p - 30);
            ctx.lineTo(p + 120, canvas.height - p - 30);
            ctx.stroke();

            // 文章主标题
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 44px "Inter", "Noto Sans SC"';
            const lines = wrapText(ctx, title, p, p + 150, canvas.width - p*2 - 40, 58);

            // 博文副标题
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = '400 18px "Inter", "Noto Sans SC"';
            wrapText(ctx, subtitle, p, p + 150 + lines*58 + 15, canvas.width - p*2 - 40, 28);
        }

        function drawCard(ctx, canvas, title, subtitle, tag, author, emoji) {
            const x = 70, y = 70;
            const w = canvas.width - x*2, h = canvas.height - y*2;

            ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            roundRect(ctx, x, y, w, h, 20, true, true);

            // 徽章卡片
            ctx.fillStyle = 'rgba(255,255,255,0.08)';
            roundRect(ctx, x+40, y+40, 110, 32, 16, true, false);
            ctx.fillStyle = '#7dd3fc';
            ctx.font = 'bold 12px "Inter"';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(tag.toUpperCase(), x+95, y+56);

            ctx.font = '36px sans-serif';
            ctx.fillText(emoji, x + w - 60, y + 56);

            // 主标题
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 42px "Inter", "Noto Sans SC"';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            const lines = wrapText(ctx, title, x+40, y+100, w-80, 56);

            // 辅助简述
            ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
            ctx.font = '400 17px "Inter", "Noto Sans SC"';
            wrapText(ctx, subtitle, x+40, y+100 + lines*56 + 15, w-80, 26);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.font = '600 13px "Inter"';
            ctx.fillText(`PUBLISHED BY ${author.toUpperCase()}`, x+40, y + h - 40);
        }

        function drawMinimalist(ctx, canvas, title, subtitle, tag, author, emoji) {
            ctx.strokeStyle = 'rgba(255,255,255,0.07)';
            ctx.lineWidth = 1;
            ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

            ctx.font = '72px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(emoji, canvas.width/2, 110);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 40px "Inter", "Noto Sans SC"';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';

            const words = title.split('');
            let line = ''; let lines = [];
            for (let n = 0; n < words.length; n++) {
                let testLine = line + words[n];
                if (ctx.measureText(testLine).width > canvas.width - 240 && n > 0) {
                    lines.push(line); line = words[n];
                } else { line = testLine; }
            }
            lines.push(line);

            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], canvas.width/2, 170 + i*54);
            }

            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.font = '400 17px "Inter", "Noto Sans SC"';
            const subY = 170 + lines.length*54 + 15;
            
            const subWords = subtitle.split('');
            let sLine = ''; let sLines = [];
            for (let s = 0; s < subWords.length; s++) {
                let testS = sLine + subWords[s];
                if (ctx.measureText(testS).width > canvas.width - 240 && s > 0) {
                    sLines.push(sLine); sLine = subWords[s];
                } else { sLine = testS; }
            }
            sLines.push(sLine);

            for (let j = 0; j < sLines.length; j++) {
                ctx.fillText(sLines[j], canvas.width/2, subY + j*26);
            }

            ctx.fillStyle = '#e4e4e7';
            ctx.font = 'bold 12px "Inter"';
            ctx.fillText(`${tag.toUpperCase()} • ${author.toUpperCase()}`, canvas.width/2, canvas.height - 60);
        }

        function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            if (fill) ctx.fill();
            if (stroke) ctx.stroke();
        }

        function downloadCover() {
            const canvas = document.getElementById('coverCanvas');
            const helper = document.getElementById('download-helper');
            const titleSlug = document.getElementById('cover-title').value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
            helper.download = `cover-${titleSlug || 'untitled'}.png`;
            helper.href = canvas.toDataURL("image/png");
            helper.click();
            showToast("🚀 2倍抗锯齿超清封面已成功保存至本地！");
        }

        /* ---------------------------------
           【核心 2】Front Matter 生成器内核
           --------------------------------- */
        function handleChipInput(event, type) {
            const input = document.getElementById(`fm-${type}-input`);
            const value = input.value.trim();
            if (event.key === 'Enter' || event.key === ',') {
                event.preventDefault();
                if (value) {
                    const list = type === 'category' ? categories : tags;
                    if (!list.includes(value)) {
                        list.push(value); renderChips(); updateFrontMatter();
                    }
                    input.value = '';
                }
            }
        }

        function removeChip(index, type) {
            const list = type === 'category' ? categories : tags;
            list.splice(index, 1);
            renderChips(); updateFrontMatter();
        }

        function renderChips() {
            const cWrap = document.getElementById('fm-categories-chips');
            const tWrap = document.getElementById('fm-tags-chips');
            cWrap.innerHTML = '';
            categories.forEach((cat, index) => {
                cWrap.innerHTML += `<span class="inline-flex items-center gap-1 bg-brand-500/10 text-brand-700 border border-brand-500/20 px-2 py-0.5 rounded text-xs">${cat}<button onclick="removeChip(${index}, 'category')" class="hover:text-red-400">&times;</button></span>`;
            });
            tWrap.innerHTML = '';
            tags.forEach((tag, index) => {
                tWrap.innerHTML += `<span class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 border border-gray-300 px-2 py-0.5 rounded text-xs"># ${tag}<button onclick="removeChip(${index}, 'tag')" class="hover:text-red-400">&times;</button></span>`;
            });
        }

        function syncToCover() {
            document.getElementById('cover-title').value = document.getElementById('fm-title').value;
            document.getElementById('cover-author').value = document.getElementById('fm-author').value;
            document.getElementById('cover-tag').value = categories[0] || 'POST';
            drawCover();
            showToast("⚡ 主要内容已秒级传递并刷新封面！");
        }

        // 格式切换
        function changeFmFormat(fmt) {
            currentFmFormat = fmt;
            ['yaml', 'toml'].forEach(item => {
                const btn = document.getElementById(`fmt-${item}`);
                btn.className = item === fmt ? "px-3 py-1.5 rounded-md text-xs font-medium bg-blue-600 text-white transition" : "px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 transition";
            });
            document.getElementById('fm-file-indicator').textContent = fmt === 'yaml' ? "index.md" : "config.toml";
            document.getElementById('fm-lang-tag').textContent = fmt;
            updateFrontMatter();
        }

        function updateFrontMatter() {
            const title = document.getElementById('fm-title').value || '';
            const slug = document.getElementById('fm-slug').value || '';
            const date = document.getElementById('fm-date').value || '';
            const author = document.getElementById('fm-author').value || '';
            // 这两个复选框在页面上并不存在（早期版本遗留），直接 .checked 会抛
            // TypeError: Cannot read properties of null，导致整个 Front Matter 生成器失效。
            // 取不到就按默认值 false 处理。
            const draftEl = document.getElementById('fm-draft');
            const commentEl = document.getElementById('fm-comment');
            const isDraft = draftEl ? draftEl.checked : false;
            const isComment = commentEl ? commentEl.checked : true;

            let output = "";
            if (currentFmFormat === 'yaml') {
                output += "---\n";
                output += `title: "${title.replace(/"/g, '\\"')}"\n`;
                output += `slug: ${slug}\n`;
                output += `date: ${date}\n`;
                output += `author: ${author}\n`;
                output += `draft: ${isDraft}\n`;
                output += `comments: ${isComment}\n`;
                if (categories.length > 0) {
                    output += "categories:\n"; categories.forEach(c => output += `  - ${c}\n`);
                }
                if (tags.length > 0) {
                    output += "tags:\n"; tags.forEach(t => output += `  - ${t}\n`);
                }
                output += "---";
            } else {
                output += `title = "${title.replace(/"/g, '\\"')}"\nslug = "${slug}"\ndate = ${date.replace(' ', 'T')}Z\nauthor = "${author}"\ndraft = ${isDraft}\ncomments = ${isComment}\n`;
                output += `categories = ${JSON.stringify(categories)}\ntags = ${JSON.stringify(tags)}\n`;
            }
            document.getElementById('fm-code-block').textContent = output;
        }

        function copyFmCode(type) {
            const content = document.getElementById('fm-code-block').textContent;
            let text = content;
            if (type === 'full') {
                text += `\n\n# ${document.getElementById('fm-title').value}\n\n在这里写博客正文...`;
            }
            const el = document.createElement('textarea');
            el.value = text; el.style.position = 'fixed'; el.style.opacity = '0';
            document.body.appendChild(el); el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            showToast("📋 已将 Front Matter 拷至剪贴板！");
        }


        /* ---------------------------------
           【核心 3】微信与自媒体多端一键排版
           --------------------------------- */
        function loadSampleMarkdown() {
            const sample = `# 探索 Tailwind CSS 的高阶重构艺术

> 本文向你展示如何使用原子化 CSS 快速搭建高性能的开发者个人站点。

## 为什么要使用原子化？
传统的 CSS 会随着项目的迭代越来越臃肿，而 **Tailwind** 采用实用工具类优先：
1. **零多余代码**：未用到的代码会被打包工具完全剔除。
2. **像素级掌控**：无需离开 HTML，就能设计完美动效与响应。

\`\`\`css
/* 传统的原子组件写法 */
.custom-card {
  background: #111827;
  border-radius: 12px;
  padding: 16px;
}
\`\`\`

## 推荐的学习线路
* 掌握盒模型与 Flex/Grid 栅格。
* 拥抱现代构建工具，快速搭建高颜值页面。

赶快体验全新的排版机制吧！`;
            document.getElementById('md-input').value = sample;
            renderWeChatPreview();
        }

        function renderWeChatPreview() {
            const mdText = document.getElementById('md-input').value;
            // 使用 marked 渲染为微信自适应的富文本
            const rawHtml = marked.parse(mdText);
            document.getElementById('wechat-preview').innerHTML = rawHtml;
        }

        // 核心技术：“带格式”复制富文本到剪贴板，支持直接一键粘贴入微信公众号后台
        function copyRichText() {
            const range = document.createRange();
            const referenceNode = document.getElementById('wechat-preview');
            range.selectNode(referenceNode);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    showToast("🎉 已成功拷贝“带样式”富文本！现在去公众号、掘金等编辑器直接 Ctrl+V 粘贴即可！");
                } else {
                    showToast("富文本复制失败", true);
                }
            } catch (err) {
                showToast("复制出错，当前浏览器不支持", true);
            }
            window.getSelection().removeAllRanges(); // 复制完毕取消高亮选择
        }


        /* ---------------------------------
           【核心 4】图片 WebP 极速压缩器
           --------------------------------- */
        function initDragAndDrop() {
            const dropZone = document.getElementById('drop-zone');
            
            // 阻断默认浏览器拖放默认打开动作
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, e => {
                    e.preventDefault();
                    e.stopPropagation();
                }, false);
            });

            // 高亮
            ['dragenter', 'dragover'].forEach(eventName => {
                dropZone.addEventListener(eventName, () => {
                    dropZone.classList.add('border-brand-500', 'bg-brand-500/5');
                }, false);
            });

            ['dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, () => {
                    dropZone.classList.remove('border-brand-500', 'bg-brand-500/5');
                }, false);
            });

            dropZone.addEventListener('drop', e => {
                const dt = e.dataTransfer;
                const files = dt.files;
                if (files.length > 0) {
                    document.getElementById('image-file-input').files = files;
                    handleImageUpload({ files });
                }
            });
        }

        function updateQualityText(slider) {
            document.getElementById('quality-val').textContent = `${slider.value}%`;
        }

        function handleImageUpload(input) {
            const file = input.files[0];
            if (!file) return;

            // 显示图片名和尺寸
            document.getElementById('original-info').textContent = `${file.name} (${formatBytes(file.size)})`;

            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImageObj = new Image();
                uploadedImageObj.onload = function() {
                    // 渲染至左侧原图缩略
                    document.getElementById('compress-original-preview').src = e.target.result;
                    document.getElementById('compress-original-preview').classList.remove('opacity-40');
                    document.getElementById('compress-btn').removeAttribute('disabled');
                    showToast("📸 待压缩图片加载成功，点击开始生成！");
                };
                uploadedImageObj.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        // WebP 前端纯 Canvas 压缩算法
        let compressedBlobUrl = null;
        let compressedBlob = null;

        function executeCompress() {
            if (!uploadedImageObj) return;

            const quality = parseInt(document.getElementById('compress-quality').value) / 100;
            const maxWidthInput = document.getElementById('compress-max-width').value;
            
            // 计算等比例缩放大小
            let targetWidth = uploadedImageObj.width;
            let targetHeight = uploadedImageObj.height;

            if (maxWidthInput && targetWidth > parseInt(maxWidthInput)) {
                targetWidth = parseInt(maxWidthInput);
                targetHeight = (uploadedImageObj.height / uploadedImageObj.width) * targetWidth;
            }

            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(uploadedImageObj, 0, 0, targetWidth, targetHeight);

            // 转换 WebP 格式
            canvas.toBlob(function(blob) {
                if (compressedBlobUrl) URL.revokeObjectURL(compressedBlobUrl);
                compressedBlob = blob;
                compressedBlobUrl = URL.createObjectURL(blob);
                
                // 渲染至目标预览
                document.getElementById('compress-target-preview').src = compressedBlobUrl;
                
                // 数据统计
                const rawSize = document.getElementById('image-file-input').files[0].size;
                const ratio = ((1 - (blob.size / rawSize)) * 100).toFixed(1);
                
                document.getElementById('target-info').textContent = `最终体积: ${formatBytes(blob.size)}`;
                document.getElementById('saved-percent').textContent = `比原图缩减了 ${ratio}%`;
                
                document.getElementById('download-compressed-btn').removeAttribute('disabled');
                showToast("🎉 WebP 图像无损压制完毕！");
            }, "image/webp", quality);
        }

        function downloadCompressedImage() {
            if (!compressedBlobUrl) return;
            const helper = document.getElementById('download-helper');
            helper.download = `optimized_${Date.now()}.webp`;
            helper.href = compressedBlobUrl;
            helper.click();
        }

        function formatBytes(bytes, decimals = 2) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }
