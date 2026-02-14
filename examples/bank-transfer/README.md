# Bank Transfer (Pay-easy) Payment Example

This example demonstrates how to process bank transfer payments using GMO Payment Gateway API with Pay-easy.

## Features

- Pay-easy bank transfer payment
- Customer information formatting
- Payment instruction generation
- Transaction status checking

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

1. **Entry**: Create bank transfer payment entry
2. **Execute**: Execute transaction with customer information
3. **Result**: Receive payment instruction numbers
4. **Payment**: Customer transfers money via ATM or internet banking
5. **Search**: Check payment status

## Payment Methods

Customers can pay using:
- **ATM**: Use Pay-easy compatible ATMs at banks and convenience stores
- **Internet Banking**: Transfer via online banking
- **Mobile Banking**: Transfer via mobile banking apps

## Payment Information

After creating a transaction, customers receive:
- 収納機関番号 (Biller Code): Bank code
- お客様番号 (Customer Number): Customer ID
- 確認番号 (Confirmation Number): Confirmation number

## Customer Information Format

- **Name**: Japanese characters (e.g., 山田太郎)
- **Kana**: Half-width Katakana (e.g., ヤマダタロウ → ﾔﾏﾀﾞﾀﾛｳ)
