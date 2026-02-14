# @gmopg/api-client

GMO Payment Gateway API client library.

## Features

- Credit card payment
- Convenience store payment
- Bank transfer payment
- Transaction search and alteration

## Usage

### Credit Card Payment

```typescript
import { CreditCardClient } from '@gmopg/api-client';

const client = new CreditCardClient({
  shopId: 'your-shop-id',
  shopPass: 'your-shop-password',
  testMode: true,
});

const result = await client.execTran({
  orderId: 'order_123',
  amount: 1000,
  cardNo: '4111111111111111',
  expire: '2512',
  jobCd: 'SALES',
});
```

### Convenience Store Payment

```typescript
import { CVSClient } from '@gmopg/api-client';

const client = new CVSClient({
  shopId: 'your-shop-id',
  shopPass: 'your-shop-password',
  testMode: true,
});

const result = await client.execTran({
  orderId: 'order_123',
  amount: 1000,
  convenience: 'LAWSON',
  customerName: '山田太郎',
  customerKana: 'ヤマダタロウ',
  telNo: '09012345678',
});
```

### Bank Transfer Payment

```typescript
import { BankTransferClient } from '@gmopg/api-client';

const client = new BankTransferClient({
  shopId: 'your-shop-id',
  shopPass: 'your-shop-password',
  testMode: true,
});

const result = await client.execTran({
  orderId: 'order_123',
  amount: 1000,
  customerName: '山田太郎',
  customerKana: 'ヤマダタロウ',
});
```
