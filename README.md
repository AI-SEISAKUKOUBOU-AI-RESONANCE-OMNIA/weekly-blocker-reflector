# 止まりポイント整理｜1問リフレクター

今週の停止点をひとつ書き、来週の次の一手をひとつに絞る日本語の小型Webアプリ。

- 分野、自由入力（最大500文字）、任意の補助選択から固定テンプレートを表示。
- 補助選択が優先。未選択時は単一のキーワード群だけを候補にし、複数・該当なしは原因を断定しない。
- クライアント側処理のみ。外部AI API、分析タグ、入力送信、履歴保存、Cookie、Secretなし。
- `npm test` でロジック検証。`npm run dev` で localhost:4173。
- Cloudflare Workers Static Assets: `wrangler deploy`。公開ファイルは `public/` のみ。

© 2026 AI制作工房｜AI RESONANCE OMNIA
