# @gmopg/utils

Utility functions for GMO Payment Gateway integration.

## Features

- Order ID generation
- Tax calculation
- Credit card validation (Luhn algorithm)
- Phone number formatting
- Katakana conversion
- Security hash generation

## Usage

```typescript
import {
  generateOrderId,
  calculateAmountWithTax,
  validateCardNumber,
  formatExpiry
} from '@gmopg/utils';

// Generate unique order ID
const orderId = generateOrderId('order');

// Calculate tax
const { amount, tax, total } = calculateAmountWithTax(1000);

// Validate card number
const isValid = validateCardNumber('4111111111111111');
```
