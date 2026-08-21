#!/bin/zsh

set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

if [ ! -d "node_modules" ]; then
  echo "未找到本地运行依赖。首次运行需要联网执行：npm install"
  echo ""
  read "REPLY?按回车键关闭窗口..."
  exit 1
fi

echo "正在启动事为电商官网本地预览..."
echo "访问地址：http://localhost:3000"
echo "关闭本窗口或按 Control+C 可停止网站。"

(sleep 2; open -a "Google Chrome" "http://localhost:3000") &
npm run dev
