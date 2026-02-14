# Architecture

## Overview

このプロジェクトは、GMO Payment Gateway APIを使用した決済処理のサンプル集です。
モノレポ構成を採用し、共有パッケージと個別のサンプルプロジェクトで構成されています。

## Monorepo Structure

```
gmopg-examples/
├── packages/          # 共有パッケージ（ライブラリ）
│   ├── types/        # 型定義
│   ├── utils/        # ユーティリティ
│   └── api-client/   # APIクライアント
├── examples/         # サンプルプロジェクト
│   ├── credit-card/
│   ├── cvs-payment/
│   ├── bank-transfer/
│   └── simple-checkout/
└── pnpm-workspace.yaml  # Workspace設定
```

### パッケージ管理
- **pnpm workspaces** を使用してモノレポを管理
- `workspace:*` プロトコルで内部パッケージを参照
- 依存関係の重複を避け、効率的なインストールを実現

## Package Design

### @gmopg/types

型定義を提供する基盤パッケージ。

**主な型:**
- `GMOPGConfig`: API設定
- `TransactionInfo`: トランザクション情報
- `CreditCardTransactionRequest`: クレジットカード決済リクエスト
- `CVSTransactionRequest`: コンビニ決済リクエスト
- `BankTransferRequest`: 銀行振込リクエスト

**依存関係:**
- なし（他のパッケージに依存しない）

### @gmopg/utils

決済処理に必要なユーティリティ関数を提供。

**主な機能:**
- `generateOrderId()`: 一意の注文IDを生成
- `calculateAmountWithTax()`: 税込金額を計算
- `validateCardNumber()`: カード番号をLuhnアルゴリズムで検証
- `formatExpiry()`: 有効期限をフォーマット
- `toHalfWidthKana()`: 全角カタカナを半角に変換

**依存関係:**
- `@gmopg/types`

### @gmopg/api-client

GMO Payment Gateway APIのクライアントライブラリ。

**主なクラス:**
- `GMOPGClient`: ベースクライアント（共通機能）
- `CreditCardClient`: クレジットカード決済
- `CVSClient`: コンビニ決済
- `BankTransferClient`: 銀行振込決済

**主な機能:**
- トランザクションの登録・実行
- トランザクション検索
- トランザクション変更（キャンセル、返金など）

**依存関係:**
- `@gmopg/types`
- `@gmopg/utils`

## Example Projects

### 決済手段別サンプル

#### credit-card
クレジットカード決済の基本的な実装例。

**機能:**
- カード情報のバリデーション
- 与信処理（AUTH）
- 売上処理（SALES）
- キャプチャ処理
- トランザクション検索

#### cvs-payment
コンビニ決済の実装例。

**機能:**
- 顧客情報のフォーマット（カタカナ変換）
- 支払い受付番号の発行
- 複数のコンビニチェーンに対応

**対応コンビニ:**
- ローソン
- ファミリーマート
- セブンイレブン
- ミニストップ
- デイリーヤマザキ
- セイコーマート

#### bank-transfer
銀行振込（Pay-easy）決済の実装例。

**機能:**
- Pay-easy支払い情報の発行
- ATM/ネットバンキング対応
- 支払い状況の確認

### ユースケース別デモ

#### simple-checkout
複数の決済手段に対応したチェックアウトフローのデモ。

**機能:**
- 商品カート管理
- 税額自動計算
- 決済手段の選択
- 決済処理の統合インターフェース

## API Flow

### クレジットカード決済フロー

```
1. EntryTran (取引登録)
   ↓
2. ExecTran (決済実行)
   ↓
3. SearchTrade (取引確認)
   ↓
4. AlterTran (変更・キャンセル) ※オプション
```

### コンビニ決済フロー

```
1. EntryTranCvs (取引登録)
   ↓
2. ExecTranCvs (決済実行)
   ↓
3. 顧客がコンビニで支払い
   ↓
4. SearchTradeCvs (支払い確認)
```

### 銀行振込決済フロー

```
1. EntryTranPayEasy (取引登録)
   ↓
2. ExecTranPayEasy (決済実行)
   ↓
3. 顧客がATM/ネットバンキングで支払い
   ↓
4. SearchTradePayEasy (支払い確認)
```

## Development Workflow

### ビルドプロセス

```bash
# 1. 依存関係のインストール
pnpm install

# 2. パッケージのビルド（types → utils → api-client の順）
pnpm build

# 3. 型チェック
pnpm typecheck
```

### 依存関係グラフ

```
examples
  ↓
api-client
  ↓
utils
  ↓
types
```

## Security Considerations

- 本番環境では必ず `testMode: false` を設定
- APIクレデンシャル（ShopID/ShopPass）は環境変数で管理
- カード情報は直接保存しない
- HTTPS通信を使用

## Future Enhancements

潜在的な拡張機能：

1. **追加の決済手段**
   - PayPay
   - 楽天ペイ
   - LINE Pay
   - ドコモ払い

2. **高度な機能**
   - 定期課金（サブスクリプション）
   - 分割払い
   - 3Dセキュア対応

3. **開発ツール**
   - ユニットテスト
   - E2Eテスト
   - Linter/Formatter設定

4. **フレームワーク統合**
   - Next.jsサンプル
   - Expressサンプル
   - NestJSサンプル
