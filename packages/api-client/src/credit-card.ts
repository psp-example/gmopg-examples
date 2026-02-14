import { GMOPGClient } from './client';
import { CreditCardTransactionRequest } from '@gmopg/types';

/**
 * Credit card payment client
 */
export class CreditCardClient extends GMOPGClient {
  /**
   * Execute transaction (entry + execution)
   */
  async execTran(params: CreditCardTransactionRequest) {
    const config = this.getConfig();
    
    // Step 1: Entry transaction
    const entryResult = await this.entryTran({
      ShopID: config.shopId,
      ShopPass: config.shopPass,
      OrderID: params.orderId,
      JobCd: params.jobCd || 'SALES',
      Amount: params.amount,
      Tax: params.tax,
    });

    if (entryResult.ErrCode) {
      throw new Error(`Entry failed: ${entryResult.ErrInfo}`);
    }

    // Step 2: Execute transaction
    const execResult = await this.execTranInternal({
      AccessID: entryResult.AccessID,
      AccessPass: entryResult.AccessPass,
      OrderID: params.orderId,
      Method: params.method || '1',
      CardNo: params.cardNo,
      Expire: params.expire,
      SecurityCode: params.securityCode,
    });

    return {
      ...execResult,
      AccessID: entryResult.AccessID,
      AccessPass: entryResult.AccessPass,
    };
  }

  /**
   * Entry transaction
   */
  private async entryTran(params: any) {
    return this.request('/payment/EntryTran.idPass', params);
  }

  /**
   * Execute transaction (internal)
   */
  private async execTranInternal(params: any) {
    return this.request('/payment/ExecTran.idPass', params);
  }

  /**
   * Alter transaction (for changing/canceling)
   */
  async alterTran(params: {
    accessId: string;
    accessPass: string;
    jobCd: 'VOID' | 'RETURN' | 'RETURNX' | 'CAPTURE';
    amount?: number;
  }) {
    const config = this.getConfig();
    
    return this.request('/payment/AlterTran.idPass', {
      ShopID: config.shopId,
      ShopPass: config.shopPass,
      AccessID: params.accessId,
      AccessPass: params.accessPass,
      JobCd: params.jobCd,
      Amount: params.amount,
    });
  }

  /**
   * Search transaction
   */
  async searchTrade(params: { orderId: string }) {
    const config = this.getConfig();
    
    return this.request('/payment/SearchTrade.idPass', {
      ShopID: config.shopId,
      ShopPass: config.shopPass,
      OrderID: params.orderId,
    });
  }
}
