---
title: 超级工作台
date: 2026-11-08 12:00:00
type: supertool
comments: false
top_img: false
aside: false
---

{% raw %}
<!-- 三个依赖：Tailwind 预编译样式、lucide 图标、marked 的 Markdown 解析 -->
<link rel="stylesheet" href="/supertool/tailwind.build.css">
<script src="/supertool/lucide.min.js"></script>
<script src="/supertool/marked.min.js"></script>

<div class="st-page" id="stPage">

  <!-- ===== 工具切换条（原独立页的 header tab，移到内容区）===== -->
  <div class="st-tabs">
        <button data-tab="cover" id="tab-cover">
      <i data-lucide="image" style="width:14px;height:14px"></i>
      封面生成
    </button>
    <button data-tab="fm" id="tab-fm">
      <i data-lucide="file-code" style="width:14px;height:14px"></i>
      Front Matter
    </button>
    <button data-tab="markdown" id="tab-markdown">
      <i data-lucide="languages" style="width:14px;height:14px"></i>
      微信/自媒体排版
    </button>
    <button data-tab="compress" id="tab-compress">
      <i data-lucide="shrink" style="width:14px;height:14px"></i>
      图片极速 WebP 压缩
    </button>
  </div>

  <!-- ===== 工具主体 ===== -->
  <div class="st-body">
        
        <!-- ==================== 1. 封面生成器 ==================== -->
        <div id="panel-cover" class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- 配置面板 -->
            <div class="lg:col-span-5 flex flex-col gap-6 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm backdrop-blur-sm">
                <div>
                    <h3 class="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        <i data-lucide="settings" class="w-4 h-4 text-brand-600"></i>
                        封面视觉设计
                    </h3>
                    <p class="text-xs text-slate-500 mt-0.5">简单的配置项，生成极高视觉水准的封面</p>
                </div>
                <hr class="border-slate-200" />
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">大标题 (Title)</label>
                        <input type="text" id="cover-title" value="如何使用 Tailwind CSS 极速设计现代个人网站" oninput="drawCover()"
                               class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-brand-500 transition">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">核心导读摘要 (Subtitle)</label>
                        <textarea id="cover-subtitle" rows="2" oninput="drawCover()"
                                  class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-500 transition">探索现代前端最高效的实用原子化样式方案，从零构建响应式高阶暗黑模式组件。</textarea>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1.5">主分类标签</label>
                            <input type="text" id="cover-tag" value="DESIGN" oninput="drawCover()"
                                   class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-500 transition">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1.5">作者署名</label>
                            <input type="text" id="cover-author" value="hehehey.top" oninput="drawCover()"
                                   class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-500 transition">
                        </div>
                    </div>
                </div>
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">风格样式排版模板</label>
                        <div class="grid grid-cols-3 gap-2">
                            <button onclick="setTemplate('tech')" id="tpl-tech" class="px-3 py-2 bg-brand-100 text-brand-700 border border-brand-200 rounded-lg text-xs font-medium transition text-center">现代科技</button>
                            <button onclick="setTemplate('card')" id="tpl-card" class="px-3 py-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-100 transition text-center">卡片悬浮</button>
                            <button onclick="setTemplate('minimalist')" id="tpl-minimalist" class="px-3 py-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-100 transition text-center">高亮留白</button>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1.5">精选 Emoji</label>
                            <div class="flex gap-2">
                                <input type="text" id="cover-emoji" value="💻" oninput="drawCover()" class="w-12 text-center bg-slate-50 border border-slate-200 rounded-lg py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-500 transition">
                                <div class="flex gap-1.5 overflow-x-auto py-1 items-center">
                                    <button onclick="quickEmoji('💻')" class="hover:scale-125 transition text-base">💻</button>
                                    <button onclick="quickEmoji('⚡')" class="hover:scale-125 transition text-base">⚡</button>
                                    <button onclick="quickEmoji('🎨')" class="hover:scale-125 transition text-base">🎨</button>
                                    <button onclick="quickEmoji('📦')" class="hover:scale-125 transition text-base">📦</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1.5">尺寸比例</label>
                            <select id="cover-aspect" onchange="changeAspect()" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-500 transition">
                                <option value="2-1" selected>2:1 (1200x600) 自适应</option>
                                <option value="16-9">16:9 (1280x720) 社交卡片</option>
                                <option value="1-1">1:1 (800x800) 正方形</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">高端渐变配色背景（高饱和度以保证字迹可读）</label>
                        <div class="grid grid-cols-5 gap-2">
                            <!-- 修复背景：为渐变层赋予较高的对比度和色彩深度，确保白色和淡蓝色文字在封面画布中完全清晰 -->
                            <button onclick="setGradient('#3b0764', '#0f172a', '#7c3aed')" class="h-8 rounded-lg bg-gradient-to-br from-purple-950 via-slate-900 to-purple-600 border border-slate-200 hover:border-slate-400 transition" title="霓虹紫"></button>
                            <button onclick="setGradient('#0369a1', '#0f172a', '#0284c7')" class="h-8 rounded-lg bg-gradient-to-br from-sky-900 via-slate-900 to-sky-600 border border-slate-200 hover:border-slate-400 transition" title="宇宙蓝"></button>
                            <button onclick="setGradient('#065f46', '#022c22', '#10b981')" class="h-8 rounded-lg bg-gradient-to-br from-emerald-900 via-teal-950 to-emerald-500 border border-slate-200 hover:border-slate-400 transition" title="翡翠绿"></button>
                            <button onclick="setGradient('#7c2d12', '#1c1917', '#ea580c')" class="h-8 rounded-lg bg-gradient-to-br from-orange-950 via-stone-900 to-orange-600 border border-slate-200 hover:border-slate-400 transition" title="火山落日"></button>
                            <button onclick="setGradient('#18181b', '#09090b', '#27272a')" class="h-8 rounded-lg bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-700 border border-slate-200 hover:border-slate-400 transition" title="极客黑白"></button>
                        </div>
                    </div>
                </div>
                <div class="pt-2">
                    <button onclick="downloadCover()" class="w-full bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 active:scale-95 transition">
                        <i data-lucide="download" class="w-4 h-4"></i>
                        下载无损超清 PNG 封面
                    </button>
                </div>
            </div>

            <!-- Canvas 渲染结果 -->
            <div class="lg:col-span-7 flex flex-col gap-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-500">实时渲染画布 (2x 超清)</h4>
                        <p class="text-xs text-slate-500">双击或通过下载按键可无损保存为 2x 采样高清图</p>
                    </div>
                    <div class="flex items-center gap-1.5 text-xs text-green-600 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
                        <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        GPU 渲染流畅
                    </div>
                </div>
                <div class="flex items-center justify-center bg-white border border-slate-200 rounded-2xl p-6 min-h-[350px] md:min-h-[460px] shadow-sm relative overflow-hidden">
                    <div class="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
                    <div class="relative max-w-full overflow-hidden rounded-xl border border-slate-200 shadow-xl transition-all duration-300">
                        <canvas id="coverCanvas" class="max-w-full h-auto rounded-xl object-contain bg-slate-50"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- ==================== 2. FRONT MATTER ==================== -->
        <div id="panel-fm" class="grid grid-cols-1 lg:grid-cols-12 gap-8 hidden">
            <!-- 配置表单 -->
            <div class="lg:col-span-5 flex flex-col gap-6 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <div>
                    <h3 class="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        <i data-lucide="file-text" class="w-4 h-4 text-brand-600"></i>
                        Front Matter 变量元配置
                    </h3>
                    <p class="text-xs text-slate-500 mt-0.5">控制静态渲染引擎识别的标题、分类与自定义变量</p>
                </div>
                <hr class="border-slate-200" />
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">文章主标题 (Title)</label>
                        <input type="text" id="fm-title" value="使用 Tailwind CSS 零代码搭建极致审美页面" oninput="updateFrontMatter()"
                               class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-brand-500 transition">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">自定义访问别名 (Slug)</label>
                        <input type="text" id="fm-slug" value="tailwind-css-best-practices" oninput="updateFrontMatter()"
                               class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-brand-500 transition">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1.5">发布时间 (Date)</label>
                            <input type="text" id="fm-date" oninput="updateFrontMatter()"
                                   class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-brand-500 transition">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1.5">作者署名 (Author)</label>
                            <input type="text" id="fm-author" value="HeHeHey" oninput="updateFrontMatter()"
                                   class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-brand-500 transition">
                        </div>
                    </div>
                    <!-- 动态列表组件 -->
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">多级分类 (Categories)</label>
                        <p class="text-[10px] text-slate-400 mb-1.5">回车或逗号分隔快速添加</p>
                        <div class="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg min-h-[42px]">
                            <div id="fm-categories-chips" class="flex flex-wrap gap-1.5"></div>
                            <input type="text" id="fm-category-input" placeholder="按回车添加..." onkeydown="handleChipInput(event, 'category')"
                                   class="flex-1 min-w-[80px] bg-transparent text-sm text-slate-800 outline-none">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">标签矩阵 (Tags)</label>
                        <p class="text-[10px] text-slate-400 mb-1.5">回车或逗号分隔快速添加</p>
                        <div class="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg min-h-[42px]">
                            <div id="fm-tags-chips" class="flex flex-wrap gap-1.5"></div>
                            <input type="text" id="fm-tag-input" placeholder="按回车添加..." onkeydown="handleChipInput(event, 'tag')"
                                   class="flex-1 min-w-[80px] bg-transparent text-sm text-slate-800 outline-none">
                        </div>
                    </div>
                </div>
                <button onclick="syncToCover()" class="w-full bg-white border border-brand-500/30 hover:border-brand-500 text-brand-600 hover:text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition duration-200">
                    <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                    一键同步博文要素到封面画板
                </button>
            </div>

            <!-- 代码预览与渲染 -->
            <div class="lg:col-span-7 flex flex-col gap-6">
                <div class="flex items-center justify-between flex-wrap gap-2">
                    <div class="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                        <button onclick="changeFmFormat('yaml')" id="fmt-yaml" class="px-3 py-1.5 rounded-md text-xs font-medium bg-blue-600 text-white transition">YAML (Hugo/Astro)</button>
                        <button onclick="changeFmFormat('toml')" id="fmt-toml" class="px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 transition">TOML (Hugo)</button>
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="copyFmCode('only-fm')" class="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition">
                            <i data-lucide="copy" class="w-3.5 h-3.5"></i> 仅复制标头
                        </button>
                        <button onclick="copyFmCode('full')" class="bg-brand-600 hover:bg-brand-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-brand-500/15 transition">
                            <i data-lucide="file-text" class="w-3.5 h-3.5"></i> 复制完整模板
                        </button>
                    </div>
                </div>
                <div class="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col flex-grow min-h-[350px] shadow-xl">
                    <div class="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
                        <span id="fm-file-indicator" class="text-xs text-slate-400 font-mono">index.md</span>
                        <span class="text-xs text-brand-400 uppercase font-mono font-bold" id="fm-lang-tag">yaml</span>
                    </div>
                    <div class="flex-grow p-4 md:p-6 font-mono text-xs leading-relaxed overflow-auto">
                        <!-- 修复3: 代码颜色改为高对比度的亮蓝色，确保在深色背景下字迹绝佳 -->
                        <pre class="text-brand-300" id="fm-code-block"></pre>
                    </div>
                </div>
            </div>
        </div>

        <!-- ==================== 3. 微信/自媒体多端一键排版 ==================== -->
        <div id="panel-markdown" class="grid grid-cols-1 lg:grid-cols-12 gap-8 hidden">
            <!-- 输入 Markdown -->
            <div class="lg:col-span-6 flex flex-col gap-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                            <i data-lucide="keyboard" class="w-4 h-4 text-brand-600"></i>
                            Markdown 文章输入
                        </h3>
                        <p class="text-xs text-slate-500">将你在博客写好的 Markdown 直接粘贴在这里</p>
                    </div>
                    <button onclick="loadSampleMarkdown()" class="text-xs text-brand-600 hover:text-brand-700 font-semibold">载入排版演示样例</button>
                </div>
                <textarea id="md-input" class="w-full h-[500px] bg-white border border-slate-200 rounded-2xl p-4 text-xs font-mono text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition resize-none" oninput="renderWeChatPreview()" placeholder="在此处输入或粘贴你的 Markdown 原文..."></textarea>
            </div>

            <!-- 自媒体富文本预览与复制 -->
            <div class="lg:col-span-6 flex flex-col gap-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                            <i data-lucide="eye" class="w-4 h-4 text-brand-600"></i>
                            微信排版渲染预览
                        </h3>
                        <p class="text-xs text-slate-500">使用专为开发者优化的排版主题样式</p>
                    </div>
                    <button onclick="copyRichText()" class="bg-brand-600 hover:bg-brand-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-brand-500/15 transition">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i> 一键“带格式”拷贝
                    </button>
                </div>

                <!-- 仿真微信公众号内容画布 -->
                <div class="w-full h-[500px] bg-white border border-slate-200 rounded-2xl p-6 overflow-auto" id="wechat-scroll-container">
                    <div id="wechat-preview" class="prose prose-sm max-w-none text-slate-800">
                        <!-- 动态生成富文本 -->
                    </div>
                </div>
            </div>
        </div>

        <!-- ==================== 4. 图片极速 WebP 压制与自适应缩放 ==================== -->
        <div id="panel-compress" class="grid grid-cols-1 lg:grid-cols-12 gap-8 hidden">
            <!-- 拖拽上传与压缩控制 -->
            <div class="lg:col-span-5 flex flex-col gap-6 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <div>
                    <h3 class="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        <i data-lucide="shrink" class="w-4 h-4 text-brand-600"></i>
                        图片 WebP 极速压缩
                    </h3>
                    <p class="text-xs text-slate-500 mt-0.5">大幅缩减博文配图体积，纯前端秒级处理</p>
                </div>
                <hr class="border-slate-200" />
                
                <!-- 拖拽上传区域 -->
                <div id="drop-zone" class="border-2 border-dashed border-slate-200 hover:border-brand-500 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition bg-slate-50/50 relative">
                    <input type="file" id="image-file-input" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onchange="handleImageUpload(this)">
                    <div class="p-3 bg-brand-500/10 text-brand-600 rounded-full" id="upload-icon-wrapper">
                        <i data-lucide="image" class="w-6 h-6"></i>
                    </div>
                    <div class="text-center">
                        <p class="text-xs font-bold text-slate-800">点击上传图片 或 拖拽图片至此处</p>
                        <p class="text-[10px] text-slate-400 mt-1">支持 PNG, JPG, WEBP 拖入格式</p>
                    </div>
                </div>

                <!-- 压缩比率设置 -->
                <div class="space-y-4">
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <label class="text-xs font-semibold text-slate-600 uppercase">压缩质量 Quality</label>
                            <span class="text-xs font-bold text-brand-600" id="quality-val">80%</span>
                        </div>
                        <input type="range" id="compress-quality" min="10" max="100" value="80" oninput="updateQualityText(this)" class="w-full accent-brand-600 bg-slate-200 rounded-lg appearance-none h-1.5">
                    </div>
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <label class="text-xs font-semibold text-slate-600 uppercase">最大宽度限制 (选填)</label>
                            <span class="text-xs text-slate-400">保留空则不缩放</span>
                        </div>
                        <input type="number" id="compress-max-width" placeholder="例如: 1200" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-500 transition">
                    </div>
                </div>

                <div class="pt-2">
                    <button id="compress-btn" disabled onclick="executeCompress()" class="w-full bg-brand-600 disabled:opacity-40 disabled:pointer-events-none hover:bg-brand-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition active:scale-95 shadow-md">
                        <i data-lucide="file-image" class="w-4 h-4"></i>
                        极速生成 WebP 图像
                    </button>
                </div>
            </div>

            <!-- 处理前后对比及下载 -->
            <div class="lg:col-span-7 flex flex-col gap-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="text-xs font-semibold text-slate-500 uppercase">压缩数据对比分析</h4>
                        <p class="text-[11px] text-slate-400">展示前后大小及最终节省的空间率</p>
                    </div>
                    <button id="download-compressed-btn" disabled onclick="downloadCompressedImage()" class="bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition">
                        <i data-lucide="download" class="w-3.5 h-3.5"></i> 一键下载 WebP
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <!-- 原始 -->
                    <div class="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center relative min-h-[220px] shadow-sm">
                        <span class="absolute top-3 left-3 text-[10px] bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded">原始图</span>
                        <div class="w-full h-32 flex items-center justify-center overflow-hidden mb-3">
                            <img id="compress-original-preview" class="max-w-full max-h-full object-contain rounded opacity-40" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23e2e8f0'/></svg>">
                        </div>
                        <span class="text-xs text-slate-500 font-mono" id="original-info">-</span>
                    </div>

                    <!-- 压缩后 -->
                    <div class="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center relative min-h-[220px] shadow-sm">
                        <span class="absolute top-3 left-3 text-[10px] bg-brand-500/10 text-brand-600 border border-brand-500/20 px-2 py-0.5 rounded">压缩后 WebP</span>
                        <div class="w-full h-32 flex items-center justify-center overflow-hidden mb-3">
                            <img id="compress-target-preview" class="max-w-full max-h-full object-contain rounded" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23e2e8f0'/></svg>">
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-xs text-brand-600 font-bold" id="target-info">-</span>
                            <span class="text-[10px] text-green-600 mt-0.5 font-semibold" id="saved-percent"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

  </div>

</div>

<!-- 弹窗提示通知 -->
<div id="toast" class="st-toast">
  <div class="st-toast-icon" id="toast-icon-box">
    <i data-lucide="check"></i>
  </div>
  <p class="st-toast-msg" id="toast-message">操作已成功</p>
</div>

<!-- 隐藏的下载引擎 -->
<a id="download-helper" style="display:none"></a>

  <link rel="stylesheet" href="/supertool/wechat-preview.css">
  <link rel="stylesheet" href="/supertool/theme.css">

  <!-- 业务逻辑：必须放在 lucide/marked 之后、tabs 之前 -->
  <script src="/supertool/app.js" defer></script>
  <script src="/supertool/tabs.js" defer></script>
{% endraw %}