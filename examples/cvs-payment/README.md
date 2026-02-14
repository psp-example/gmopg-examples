# Convenience Store Payment Example

This example demonstrates how to process convenience store payments using GMO Payment Gateway API.

## Features

- Convenience store payment transaction
- Customer name formatting (Katakana conversion)
- Phone number formatting
- Multiple CVS support (LAWSON, FamilyMart, 7-Eleven, etc.)

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Create `.env` file:
```
GMOPG_SHOP_ID=your_shop_id
GMOPG_SHOP_PASS=your_shop_password
```

3. Run the example:
```bash
pnpm dev
```

## Transaction Flow

1. **Entry**: Create CVS payment entry
2. **Execute**: Execute CVS transaction with customer information
3. **Result**: Receive confirmation number and receipt number
4. **Payment**: Customer pays at the convenience store using the numbers
5. **Search**: Check payment status

## Supported Convenience Stores

- LAWSON (ローソン)
- FamilyMart (ファミリーマート)
- 7-Eleven (セブンイレブン)
- Ministop (ミニストップ)
- Daily Yamazaki (デイリーヤマザキ)
- Seicomart (セイコーマート)

## Customer Information Format

- **Name**: Japanese characters (e.g., 山田太郎)
- **Kana**: Half-width Katakana (e.g., ヤマダタロウ → ﾔﾏﾀﾞﾀﾛｳ)
- **Phone**: Numbers only (e.g., 090-1234-5678 → 09012345678)
