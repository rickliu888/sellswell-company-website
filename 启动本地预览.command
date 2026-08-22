#!/bin/zsh

set -e
cd "$(dirname "$0")"

if ! command -v npm >/dev/null 2>&1; then
  echo "未找到 Node.js / npm，请先安装后再运行。"
  read -r "?按回车键关闭窗口…"
  exit 1
fi

if [[ ! -d node_modules ]]; then
  echo "首次运行，正在安装本地依赖…"
  npm ci
fi

echo "事为电商官网正在启动…"
echo "访问地址：http://localhost:3000"
echo "关闭此终端窗口即可停止本地预览。"

(sleep 2; open "http://localhost:3000") &
npm run dev
