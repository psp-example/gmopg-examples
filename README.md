# GMO Payment Gateway API Examples

GMO Payment Gateway (GMOペイメントゲートウェイ) の決済API実装サンプル集です。

## 📦 Monorepo Structure

このプロジェクトはpnpm workspacesを使用したモノレポ構成になっています。

```
gmopg-examples/
├── packages/          # 共有パッケージ
│   ├── types/        # 型定義
│   ├── utils/        # ユーティリティ関数
│   └── api-client/   # APIクライアント
└── examples/         # サンプルプロジェクト
    ├── credit-card/       # クレジットカード決済
    ├── cvs-payment/       # コンビニ決済
    ├── bank-transfer/     # 銀行振込(Pay-easy)
    └── simple-checkout/   # 総合デモ
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0以上
- pnpm 8.0.0以上

### Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build
```

## 📚 Packages

### @gmopg/types
GMO Payment Gateway APIの型定義パッケージ

- 決済APIのリクエスト/レスポンス型
- トランザクション状態の型定義
- 各決済手段の型定義

[詳細 →](./packages/types/README.md)

### @gmopg/utils
決済処理に必要なユーティリティ関数

- 注文ID生成
- 税額計算
- クレジットカード番号検証 (Luhnアルゴリズム)
- カタカナ変換
- 電話番号フォーマット

[詳細 →](./packages/utils/README.md)

### @gmopg/api-client
GMO Payment Gateway APIクライアント

- クレジットカード決済
- コンビニ決済
- 銀行振込決済
- トランザクション検索・変更

[詳細 →](./packages/api-client/README.md)

## 💳 Payment Method Examples

### Credit Card Payment
クレジットカード決済のサンプル

```bash
cd examples/credit-card
pnpm dev
```

**機能:**
- カード情報バリデーション
- 与信・売上処理
- トランザクション検索
- キャプチャ処理

[詳細 →](./examples/credit-card/README.md)

### CVS Payment
コンビニ決済のサンプル

```bash
cd examples/cvs-payment
pnpm dev
```

**対応コンビニ:**
- ローソン (LAWSON)
- ファミリーマート (FAMILYMART)
- セブンイレブン (SEVEN_ELEVEN)
- ミニストップ (MINISTOP)
- デイリーヤマザキ (DAILY_YAMAZAKI)
- セイコーマート (SEICOMART)

[詳細 →](./examples/cvs-payment/README.md)

### Bank Transfer (Pay-easy)
銀行振込（Pay-easy）決済のサンプル

```bash
cd examples/bank-transfer
pnpm dev
```

**支払い方法:**
- ATM
- インターネットバンキング
- モバイルバンキング

[詳細 →](./examples/bank-transfer/README.md)

## 🎯 Use Case Demos

### Simple Checkout
複数の決済手段に対応したシンプルなチェックアウトフロー

```bash
cd examples/simple-checkout
pnpm dev
```

**機能:**
- 商品カート計算
- 税額自動計算
- 複数決済手段対応
- 顧客情報処理

[詳細 →](./examples/simple-checkout/README.md)

## 🔧 Development

### Build all packages
```bash
pnpm build
```

### Run type checking
```bash
pnpm typecheck
```

### Clean build artifacts
```bash
pnpm clean
```

## 📝 Environment Variables

各サンプルプロジェクトで `.env` ファイルを作成してください:

```bash
GMOPG_SHOP_ID=your_shop_id
GMOPG_SHOP_PASS=your_shop_password
```

各サンプルディレクトリに `.env.example` ファイルがあります。

## 🔐 Test Mode

すべてのサンプルはデフォルトでテストモードで動作します。
本番環境で使用する場合は、各クライアントの `testMode` を `false` に設定してください。

```typescript
const client = new CreditCardClient({
  shopId: 'your-shop-id',
  shopPass: 'your-shop-password',
  testMode: false, // 本番環境
});
```

## 📖 Documentation

- [GMO Payment Gateway API ドキュメント](https://docs.mul-pay.jp/)
- [Package Documentation](./packages/)
- [Examples Documentation](./examples/)

## 🤝 Contributing

このプロジェクトへの貢献を歓迎します。

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details 
