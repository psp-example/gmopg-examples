# Simple Checkout Demo

A comprehensive demo showing how to implement a checkout flow with multiple payment methods.

## Features

- Multiple payment methods (Credit Card, CVS, Bank Transfer)
- Shopping cart calculation with tax
- Customer information handling
- Payment method selection
- Complete transaction flow

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

## Usage

This demo shows three different payment scenarios:

### 1. Credit Card Payment
```typescript
await checkout.processPayment(products, {
  paymentMethod: 'credit',
  customerInfo: {
    name: '山田太郎',
    kana: 'ヤマダタロウ',
  },
  cardInfo: {
    cardNo: '4111111111111111',
    expire: '2512',
    securityCode: '123',
  },
});
```

### 2. Convenience Store Payment
```typescript
await checkout.processPayment(products, {
  paymentMethod: 'cvs',
  customerInfo: {
    name: '佐藤花子',
    kana: 'サトウハナコ',
    telNo: '090-9876-5432',
  },
});
```

### 3. Bank Transfer Payment
```typescript
await checkout.processPayment(products, {
  paymentMethod: 'bank',
  customerInfo: {
    name: '鈴木一郎',
    kana: 'スズキイチロウ',
  },
});
```

## Features Demonstrated

- **Tax Calculation**: Automatic 10% tax calculation
- **Card Validation**: Luhn algorithm validation for credit cards
- **Format Conversion**: Katakana and phone number formatting
- **Error Handling**: Proper error handling for each payment method
- **Order Management**: Unique order ID generation
