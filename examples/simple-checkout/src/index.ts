import { CreditCardClient, CVSClient, BankTransferClient } from '@gmopg/api-client';
import { PaymentMethod } from '@gmopg/types';
import { 
  generateOrderId, 
  calculateAmountWithTax,
  validateCardNumber,
  formatExpiry,
  toHalfWidthKana,
  formatPhoneNumber
} from '@gmopg/utils';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Simple checkout demo with multiple payment methods
 */

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CheckoutOptions {
  paymentMethod: PaymentMethod;
  customerInfo: {
    name: string;
    kana: string;
    telNo?: string;
  };
  cardInfo?: {
    cardNo: string;
    expire: string;
    securityCode: string;
  };
}

class SimpleCheckout {
  private config = {
    shopId: process.env.GMOPG_SHOP_ID || 'tshop00000000',
    shopPass: process.env.GMOPG_SHOP_PASS || 'qwerty123',
    testMode: true,
  };

  async processPayment(
    products: Product[],
    options: CheckoutOptions
  ) {
    console.log('=== Simple Checkout Demo ===\n');
    
    // Calculate total amount
    const subtotal = products.reduce((sum, p) => sum + p.price, 0);
    const { amount, tax, total } = calculateAmountWithTax(subtotal);
    
    console.log('Cart Items:');
    products.forEach(p => {
      console.log(`  - ${p.name}: ¥${p.price.toLocaleString()}`);
    });
    console.log(`\nSubtotal: ¥${amount.toLocaleString()}`);
    console.log(`Tax (10%): ¥${tax.toLocaleString()}`);
    console.log(`Total: ¥${total.toLocaleString()}`);
    
    console.log(`\nPayment Method: ${options.paymentMethod.toUpperCase()}`);
    console.log(`Customer: ${options.customerInfo.name} (${options.customerInfo.kana})`);
    
    const orderId = generateOrderId('checkout');
    console.log(`Order ID: ${orderId}\n`);

    try {
      switch (options.paymentMethod) {
        case 'credit':
          return await this.processCreditCard(orderId, total, options);
        case 'cvs':
          return await this.processCVS(orderId, total, options);
        case 'bank':
          return await this.processBankTransfer(orderId, total, options);
        default:
          throw new Error(`Unsupported payment method: ${options.paymentMethod}`);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      throw error;
    }
  }

  private async processCreditCard(
    orderId: string,
    amount: number,
    options: CheckoutOptions
  ) {
    if (!options.cardInfo) {
      throw new Error('Card information is required');
    }

    const isValid = validateCardNumber(options.cardInfo.cardNo);
    if (!isValid) {
      throw new Error('Invalid card number');
    }

    const client = new CreditCardClient(this.config);
    
    console.log('Processing credit card payment...');
    const result = await client.execTran({
      shopId: this.config.shopId,
      shopPass: this.config.shopPass,
      orderId,
      amount,
      cardNo: options.cardInfo.cardNo,
      expire: options.cardInfo.expire,
      securityCode: options.cardInfo.securityCode,
      jobCd: 'SALES',
    });

    console.log('✓ Payment successful!');
    console.log(`Transaction ID: ${result.AccessID}`);
    console.log(`Approval Code: ${result.Approve}`);
    
    return result;
  }

  private async processCVS(
    orderId: string,
    amount: number,
    options: CheckoutOptions
  ) {
    if (!options.customerInfo.telNo) {
      throw new Error('Phone number is required for CVS payment');
    }

    const client = new CVSClient(this.config);
    
    console.log('Processing CVS payment...');
    const result = await client.execTran({
      shopId: this.config.shopId,
      shopPass: this.config.shopPass,
      orderId,
      amount,
      convenience: 'LAWSON',
      customerName: options.customerInfo.name,
      customerKana: toHalfWidthKana(options.customerInfo.kana),
      telNo: formatPhoneNumber(options.customerInfo.telNo),
    });

    console.log('✓ Payment instruction created!');
    console.log('Please pay at LAWSON with:');
    console.log(`  Confirmation No: ${result.ConfNo}`);
    console.log(`  Receipt No: ${result.ReceiptNo}`);
    
    return result;
  }

  private async processBankTransfer(
    orderId: string,
    amount: number,
    options: CheckoutOptions
  ) {
    const client = new BankTransferClient(this.config);
    
    console.log('Processing bank transfer payment...');
    const result = await client.execTran({
      shopId: this.config.shopId,
      shopPass: this.config.shopPass,
      orderId,
      amount,
      customerName: options.customerInfo.name,
      customerKana: toHalfWidthKana(options.customerInfo.kana),
    });

    console.log('✓ Payment instruction created!');
    console.log('Please transfer via Pay-easy with:');
    console.log(`  Bank Code: ${result.BkCode}`);
    console.log(`  Customer No: ${result.CustId}`);
    console.log(`  Confirmation No: ${result.ConfNo}`);
    
    return result;
  }
}

// Example usage
async function main() {
  const checkout = new SimpleCheckout();

  // Sample products
  const products: Product[] = [
    { id: 'prod_1', name: 'Product A', price: 500 },
    { id: 'prod_2', name: 'Product B', price: 300 },
    { id: 'prod_3', name: 'Product C', price: 200 },
  ];

  // Example 1: Credit card payment
  console.log('\n--- Example 1: Credit Card Payment ---\n');
  await checkout.processPayment(products, {
    paymentMethod: 'credit',
    customerInfo: {
      name: '山田太郎',
      kana: 'ヤマダタロウ',
    },
    cardInfo: {
      cardNo: '4111111111111111',
      expire: formatExpiry('2025', '12'),
      securityCode: '123',
    },
  });

  console.log('\n' + '='.repeat(60) + '\n');

  // Example 2: CVS payment
  console.log('--- Example 2: CVS Payment ---\n');
  await checkout.processPayment(products, {
    paymentMethod: 'cvs',
    customerInfo: {
      name: '佐藤花子',
      kana: 'サトウハナコ',
      telNo: '090-9876-5432',
    },
  });

  console.log('\n' + '='.repeat(60) + '\n');

  // Example 3: Bank transfer payment
  console.log('--- Example 3: Bank Transfer Payment ---\n');
  await checkout.processPayment(products, {
    paymentMethod: 'bank',
    customerInfo: {
      name: '鈴木一郎',
      kana: 'スズキイチロウ',
    },
  });
}

main().catch(console.error);
