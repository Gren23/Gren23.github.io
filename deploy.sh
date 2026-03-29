#!/bin/bash
set -e

echo "开始构建和部署..."

# 清理并构建
hexo clean
hexo g

# 压缩资源
gulp

# 部署
hexo deploy

echo "完成!"
