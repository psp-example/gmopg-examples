import { GMOPGClient } from './client';
import { CVSTransactionRequest } from '@gmopg/types';

/**
 * Convenience store payment client
 */
export class CVSClient extends GMOPGClient {
  /**
   * Execute CVS transaction
   */
  async execTran(params: CVSTransactionRequest): Promise<any> {
    const config = this.getConfig();
    
    // Step 1: Entry transaction
    const entryResult: any = await this.entryTran({
      ShopID: config.shopId,
      ShopPass: config.shopPass,
      OrderID: params.orderId,
      Amount: params.amount,
    });

    if (entryResult.ErrCode) {
      throw new Error(`Entry failed: ${entryResult.ErrInfo}`);
    }

    // Step 2: Execute CVS transaction
    const execResult: any = await this.execTranInternal({
      AccessID: entryResult.AccessID,
      AccessPass: entryResult.AccessPass,
      OrderID: params.orderId,
      Convenience: params.convenience,
      CustomerName: params.customerName,
      CustomerKana: params.customerKana,
      TelNo: params.telNo,
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
  private async entryTran(params: any): Promise<any> {
    return this.request('/payment/EntryTranCvs.idPass', params);
  }

  /**
   * Execute CVS transaction (internal)
   */
  private async execTranInternal(params: any): Promise<any> {
    return this.request('/payment/ExecTranCvs.idPass', params);
  }

  /**
   * Search CVS transaction
   */
  async searchTrade(params: { orderId: string }): Promise<any> {
    const config = this.getConfig();
    
    return this.request('/payment/SearchTradeCvs.idPass', {
      ShopID: config.shopId,
      ShopPass: config.shopPass,
      OrderID: params.orderId,
    });
  }
}
