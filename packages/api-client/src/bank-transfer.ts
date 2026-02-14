import { GMOPGClient } from './client';
import { BankTransferRequest } from '@gmopg/types';

/**
 * Bank transfer payment client
 */
export class BankTransferClient extends GMOPGClient {
  /**
   * Execute bank transfer transaction
   */
  async execTran(params: BankTransferRequest): Promise<any> {
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

    // Step 2: Execute bank transfer transaction
    const execResult: any = await this.execTranInternal({
      AccessID: entryResult.AccessID,
      AccessPass: entryResult.AccessPass,
      OrderID: params.orderId,
      CustomerName: params.customerName,
      CustomerKana: params.customerKana,
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
    return this.request('/payment/EntryTranPayEasy.idPass', params);
  }

  /**
   * Execute bank transfer transaction (internal)
   */
  private async execTranInternal(params: any): Promise<any> {
    return this.request('/payment/ExecTranPayEasy.idPass', params);
  }

  /**
   * Search bank transfer transaction
   */
  async searchTrade(params: { orderId: string }): Promise<any> {
    const config = this.getConfig();
    
    return this.request('/payment/SearchTradePayEasy.idPass', {
      ShopID: config.shopId,
      ShopPass: config.shopPass,
      OrderID: params.orderId,
    });
  }
}
