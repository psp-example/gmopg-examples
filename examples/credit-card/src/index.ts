import { CreditCardClient } from '@gmopg/api-client';
import { generateOrderId, validateCardNumber, formatExpiry } from '@gmopg/utils';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Credit card payment example
 */
async function main() {
  console.log('=== GMO Payment Gateway - Credit Card Payment Example ===\n');

  // Initialize client
  const client = new CreditCardClient({
    shopId: process.env.GMOPG_SHOP_ID || 'tshop00000000',
    shopPass: process.env.GMOPG_SHOP_PASS || 'qwerty123',
    testMode: true,
  });

  // Generate order ID
  const orderId = generateOrderId('cc');
  console.log(`Order ID: ${orderId}`);

  // Test card information (test card number)
  const testCard = {
    cardNo: '4111111111111111',
    expire: formatExpiry('2025', '12'),
    securityCode: '123',
  };

  // Validate card number
  const isValidCard = validateCardNumber(testCard.cardNo);
  console.log(`Card validation: ${isValidCard ? 'Valid' : 'Invalid'}`);

  if (!isValidCard) {
    console.error('Invalid card number');
    return;
  }

  try {
    // Execute transaction
    console.log('\nExecuting credit card transaction...');
    const result = await client.execTran({
      shopId: process.env.GMOPG_SHOP_ID || 'tshop00000000',
      shopPass: process.env.GMOPG_SHOP_PASS || 'qwerty123',
      orderId,
      amount: 1000,
      tax: 100,
      cardNo: testCard.cardNo,
      expire: testCard.expire,
      securityCode: testCard.securityCode,
      jobCd: 'AUTH', // AUTH: Authorization only, SALES: Authorization + Capture
      method: '1', // 1: 一括払い
    });

    console.log('\n✓ Transaction successful!');
    console.log('Transaction details:');
    console.log(`  Access ID: ${result.AccessID}`);
    console.log(`  Order ID: ${result.OrderID}`);
    console.log(`  Forward: ${result.Forward}`);
    console.log(`  Approve: ${result.Approve}`);

    // Search transaction
    console.log('\nSearching transaction...');
    const searchResult = await client.searchTrade({ orderId });
    console.log('Transaction status:', searchResult.Status);

    // Example: Capture authorized transaction
    if (result.AccessID && result.AccessPass) {
      console.log('\nCapturing authorized transaction...');
      const captureResult = await client.alterTran({
        accessId: result.AccessID,
        accessPass: result.AccessPass,
        jobCd: 'CAPTURE',
        amount: 1000,
      });
      console.log('✓ Capture successful!');
      console.log(`  Access ID: ${captureResult.AccessID}`);
    }

  } catch (error) {
    console.error('\n✗ Transaction failed:');
    console.error(error);
  }
}

main().catch(console.error);
