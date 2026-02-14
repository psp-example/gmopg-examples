/**
 * GMO Payment Gateway API Common Types
 */

// Common request/response types
export interface GMOPGResponse {
  status: 'success' | 'error';
  errCode?: string;
  errInfo?: string;
}

// Transaction types
export interface TransactionInfo {
  orderId: string;
  accessId: string;
  accessPass: string;
  amount: number;
  tax?: number;
  status: TransactionStatus;
}

export type TransactionStatus = 
  | 'UNPROCESSED'
  | 'AUTHENTICATED'
  | 'CHECK'
  | 'CAPTURE'
  | 'AUTH'
  | 'SALES'
  | 'VOID'
  | 'RETURN'
  | 'RETURNX'
  | 'SAUTH';

// Payment method types
export type PaymentMethod = 
  | 'credit'
  | 'cvs'
  | 'bank'
  | 'paypay'
  | 'rakuten-pay'
  | 'line-pay'
  | 'docomo';

// Credit card types
export interface CreditCardInfo {
  cardNo: string;
  expire: string;
  securityCode?: string;
  holderName?: string;
}

export interface CreditCardTransactionRequest {
  shopId: string;
  shopPass: string;
  orderId: string;
  amount: number;
  tax?: number;
  cardNo: string;
  expire: string;
  securityCode?: string;
  method?: '1' | '2' | '3'; // 1: 一括, 2: 分割, 3: リボ
  jobCd?: 'AUTH' | 'CAPTURE' | 'SALES';
}

// Convenience store payment types
export interface CVSTransactionRequest {
  shopId: string;
  shopPass: string;
  orderId: string;
  amount: number;
  convenience: CVSType;
  customerName: string;
  customerKana: string;
  telNo: string;
}

export type CVSType = 
  | 'LAWSON'
  | 'FAMILYMART'
  | 'SEVEN_ELEVEN'
  | 'MINISTOP'
  | 'DAILY_YAMAZAKI'
  | 'SEICOMART';

// Bank transfer types
export interface BankTransferRequest {
  shopId: string;
  shopPass: string;
  orderId: string;
  amount: number;
  customerName: string;
  customerKana: string;
}

// Configuration
export interface GMOPGConfig {
  shopId: string;
  shopPass: string;
  siteId?: string;
  sitePass?: string;
  apiEndpoint?: string;
  testMode?: boolean;
}
