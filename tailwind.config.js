/** Tailwind 预编译配置：给 /supertool/ 独立工具页生成静态 CSS。
 *  页面原本用 <script src="https://cdn.tailwindcss.com"></script> 运行时生成样式，
 *  国内网络下该域名经常拉不下来，导致整页无样式（tailwind is not defined）。
 *  这里把用到的类一次性编译成静态文件 source/supertool/tailwind.build.css。
 */
module.exports = {
  darkMode: 'class',
  content: [
    './source/supertool/index.html',
    './source/supertool/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
    },
  },
  // 页面里还有不少手写内嵌 <style>，Tailwind 的前置重置不需要越权覆盖它们
  corePlugins: {
    preflight: true,
  },
};
