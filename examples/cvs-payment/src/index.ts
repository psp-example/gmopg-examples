import { CVSClient } from '@gmopg/api-client';
import { generateOrderId, formatPhoneNumber, toHalfWidthKana } from '@gmopg/utils';
import { CVSType } from '@gmopg/types';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Convenience store payment example
 */
async function main() {
  console.log('=== GMO Payment Gateway - Convenience Store Payment Example ===\n');

  // Initialize client
  const client = new CVSClient({
    shopId: process.env.GMOPG_SHOP_ID || 'tshop00000000',
    shopPass: process.env.GMOPG_SHOP_PASS || 'qwerty123',
    testMode: true,
  });

  // Generate order ID
  const orderId = generateOrderId('cvs');
  console.log(`Order ID: ${orderId}`);

  // Customer information
  const customerName = '山田太郎';
  const customerKana = toHalfWidthKana('ヤマダタロウ');
  const telNo = formatPhoneNumber('090-1234-5678');

  console.log('\nCustomer Information:');
  console.log(`  Name: ${customerName}`);
  console.log(`  Kana: ${customerKana}`);
  console.log(`  Phone: ${telNo}`);

  // Available convenience stores
  const availableStores: CVSType[] = [
    'LAWSON',
    'FAMILYMART',
    'SEVEN_ELEVEN',
    'MINISTOP',
    'DAILY_YAMAZAKI',
    'SEICOMART',
  ];

  console.log('\nAvailable convenience stores:');
  availableStores.forEach((store, index) => {
    console.log(`  ${index + 1}. ${store}`);
  });

  // Use LAWSON for this example
  const selectedStore: CVSType = 'LAWSON';
  console.log(`\nSelected store: ${selectedStore}`);

  try {
    // Execute CVS transaction
    console.log('\nExecuting CVS transaction...');
    const result = await client.execTran({
      shopId: process.env.GMOPG_SHOP_ID || 'tshop00000000',
      shopPass: process.env.GMOPG_SHOP_PASS || 'qwerty123',
      orderId,
      amount: 1000,
      convenience: selectedStore,
      customerName,
      customerKana,
      telNo,
    });

    console.log('\n✓ Transaction successful!');
    console.log('Payment details:');
    console.log(`  Access ID: ${result.AccessID}`);
    console.log(`  Order ID: ${result.OrderID}`);
    console.log(`  Convenience: ${result.Convenience}`);
    console.log(`  Conf No: ${result.ConfNo}`);
    console.log(`  Receipt No: ${result.ReceiptNo}`);
    console.log(`  Payment URL: ${result.PaymentURL || 'N/A'}`);

    console.log('\nCustomer should pay at the convenience store using:');
    console.log(`  Confirmation Number: ${result.ConfNo}`);
    console.log(`  Receipt Number: ${result.ReceiptNo}`);

    // Search transaction
    console.log('\nSearching transaction...');
    const searchResult = await client.searchTrade({ orderId });
    console.log('Transaction status:', searchResult.CvsResultStatus || searchResult.Status);

  } catch (error) {
    console.error('\n✗ Transaction failed:');
    console.error(error);
  }
}

main().catch(console.error);
