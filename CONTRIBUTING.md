# Contributing to GMO Payment Gateway Examples

このプロジェクトへの貢献を歓迎します！

## 開発環境のセットアップ

### 必要な環境
- Node.js 18.0.0以上
- pnpm 8.0.0以上

### セットアップ手順

1. リポジトリをクローン
```bash
git clone https://github.com/psp-example/gmopg-examples.git
cd gmopg-examples
```

2. 依存関係をインストール
```bash
pnpm install
```

3. パッケージをビルド
```bash
pnpm build
```

## プロジェクト構成

```
gmopg-examples/
├── packages/          # 共有パッケージ
│   ├── types/        # 型定義パッケージ
│   ├── utils/        # ユーティリティ関数
│   └── api-client/   # APIクライアント
└── examples/         # サンプルプロジェクト
    ├── credit-card/       # クレジットカード決済サンプル
    ├── cvs-payment/       # コンビニ決済サンプル
    ├── bank-transfer/     # 銀行振込サンプル
    └── simple-checkout/   # 総合デモ
```

## 開発ワークフロー

### 新しいパッケージの追加

1. `packages/` ディレクトリに新しいフォルダを作成
2. `package.json` を作成し、workspace参照を設定
3. `pnpm-workspace.yaml` に追加（必要に応じて）

### 新しいサンプルの追加

1. `examples/` ディレクトリに新しいフォルダを作成
2. `package.json` を作成し、必要なパッケージへの依存関係を追加
3. README.md を作成し、サンプルの説明を記載

### ビルドとテスト

```bash
# すべてのパッケージをビルド
pnpm build

# 型チェック
pnpm typecheck

# ビルド成果物をクリーン
pnpm clean
```

### コーディング規約

- TypeScriptの厳格モードを使用
- ESLint/Prettierの設定に従う（設定がある場合）
- 明確な型定義を使用
- 適切なコメントとドキュメントを追加

## Pull Requestのガイドライン

1. フォークしてブランチを作成
2. 変更を実施
3. コミットメッセージは明確に記述
4. Pull Requestを作成し、変更内容を説明

## コミットメッセージ

明確で説明的なコミットメッセージを使用してください：

```
feat: 新しい決済手段サンプルを追加
fix: クレジットカードバリデーションのバグを修正
docs: READMEを更新
refactor: APIクライアントをリファクタリング
```

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
