# Credit Card Payment Example

This example demonstrates how to process credit card payments using GMO Payment Gateway API.

## Features

- Credit card transaction execution
- Card number validation
- Authorization and capture flow
- Transaction search

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

1. **Validation**: Validate card number using Luhn algorithm
2. **Entry**: Create transaction entry
3. **Execute**: Execute credit card transaction
4. **Search**: Search transaction status
5. **Capture**: Capture authorized amount (if using AUTH mode)

## Test Cards

For testing, you can use these test card numbers:
- Visa: `4111111111111111`
- MasterCard: `5555555555554444`
- JCB: `3530111333300000`

Expiry: Any future date (e.g., `2512` for December 2025)
Security Code: Any 3 digits (e.g., `123`)
