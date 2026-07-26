#!/bin/bash
# rimacafe / My_photo_gallery の「本サイト側コピー」を、
# 独立公開しているスタンドアロンリポジトリの最新内容に同期する。
#
# 背景：kazukitakao.netlify.app（本サイト）は self_introduction 配下の
# rimacafe/ と My_photo_gallery/ フォルダをそのままデプロイしている。
# これらはスタンドアロン版（rimacafe.netlify.app / kazuphotogallery.netlify.app）
# と別管理のため、スタンドアロン側だけ更新して本サイト側への反映を忘れると
# 本サイトが古い内容のまま表示され続ける。
#
# 使い方：rimacafe または My_photo_gallery のどちらかを更新した後、
# self_introduction をコミット・pushする前に必ずこのスクリプトを実行する。

set -e
cd "$(dirname "$0")"

echo "=== My_photo_gallery（同一リポジトリのネスト） ==="
(
  cd My_photo_gallery
  git fetch origin
  BEHIND=$(git rev-list --count HEAD..origin/main 2>/dev/null || echo 0)
  if [ "$BEHIND" -gt 0 ]; then
    echo "→ origin/main に $BEHIND 件の未取得コミットがあります。pullします。"
    git pull origin main
  else
    echo "→ 最新です（差分なし）"
  fi
)

echo ""
echo "=== rimacafe（スタンドアロン ../rimacafe からコピー） ==="
SRC="../rimacafe"
DST="rimacafe"
if [ ! -d "$SRC" ]; then
  echo "→ ../rimacafe が見つかりません。スキップします。"
else
  DIFF=$(diff -rq "$SRC" "$DST" --exclude=.git --exclude=README.md --exclude=.claude 2>/dev/null || true)
  if [ -z "$DIFF" ]; then
    echo "→ 差分なし（既に同期済み）"
  else
    echo "→ 差分あり。同期します:"
    echo "$DIFF"
    cp "$SRC/index.html" "$SRC/animation.js" "$SRC/style.css" "$DST/" 2>/dev/null || true
    cp "$SRC/img/"* "$DST/img/" 2>/dev/null || true
    echo "→ コピー完了。git status で差分を確認してください。"
  fi
fi

echo ""
echo "=== 完了 ==="
echo "この後 self_introduction で git status を確認し、変更があればコミット・pushしてください。"
