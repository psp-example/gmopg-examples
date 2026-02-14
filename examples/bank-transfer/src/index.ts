import { BankTransferClient } from '@gmopg/api-client';
import { generateOrderId, toHalfWidthKana } from '@gmopg/utils';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Bank transfer (Pay-easy) payment example
 */
async function main() {
  console.log('=== GMO Payment Gateway - Bank Transfer (Pay-easy) Payment Example ===\n');

  // Initialize client
  const client = new BankTransferClient({
    shopId: process.env.GMOPG_SHOP_ID || 'tshop00000000',
    shopPass: process.env.GMOPG_SHOP_PASS || 'qwerty123',
    testMode: true,
  });

  // Generate order ID
  const orderId = generateOrderId('bank');
  console.log(`Order ID: ${orderId}`);

  // Customer information
  const customerName = '山田太郎';
  const customerKana = toHalfWidthKana('ヤマダタロウ');

  console.log('\nCustomer Information:');
  console.log(`  Name: ${customerName}`);
  console.log(`  Kana: ${customerKana}`);

  try {
    // Execute bank transfer transaction
    console.log('\nExecuting bank transfer transaction...');
    const result = await client.execTran({
      shopId: process.env.GMOPG_SHOP_ID || 'tshop00000000',
      shopPass: process.env.GMOPG_SHOP_PASS || 'qwerty123',
      orderId,
      amount: 1000,
      customerName,
      customerKana,
    });

    console.log('\n✓ Transaction successful!');
    console.log('Payment details:');
    console.log(`  Access ID: ${result.AccessID}`);
    console.log(`  Order ID: ${result.OrderID}`);
    console.log(`  Bank Code: ${result.BkCode}`);
    console.log(`  Customer Number: ${result.CustId}`);
    console.log(`  Confirmation Number: ${result.ConfNo}`);
    console.log(`  Payment URL: ${result.PaymentURL || 'N/A'}`);

    console.log('\nCustomer should transfer money using:');
    console.log(`  収納機関番号: ${result.BkCode}`);
    console.log(`  お客様番号: ${result.CustId}`);
    console.log(`  確認番号: ${result.ConfNo}`);

    console.log('\nPayment methods:');
    console.log('  1. ATM (Pay-easy対応)');
    console.log('  2. Internet banking');
    console.log('  3. Mobile banking');

    // Search transaction
    console.log('\nSearching transaction...');
    const searchResult = await client.searchTrade({ orderId });
    console.log('Transaction status:', searchResult.PayEasyStatus || searchResult.Status);

  } catch (error) {
    console.error('\n✗ Transaction failed:');
    console.error(error);
  }
}

main().catch(console.error);
