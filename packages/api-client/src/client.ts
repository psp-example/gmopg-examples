import { GMOPGConfig } from '@gmopg/types';

/**
 * Base API client for GMO Payment Gateway
 */
export class GMOPGClient {
  private config: GMOPGConfig;
  private baseUrl: string;

  constructor(config: GMOPGConfig) {
    this.config = config;
    this.baseUrl = config.apiEndpoint || (
      config.testMode 
        ? 'https://pt01.mul-pay.jp' 
        : 'https://p01.mul-pay.jp'
    );
  }

  /**
   * Make API request
   */
  protected async request<T>(
    endpoint: string,
    params: Record<string, any>
  ): Promise<T> {
    const formData = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        formData.append(key, String(params[key]));
      }
    });

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      const text = await response.text();
      
      // Parse response (GMO PG returns form-encoded response)
      const result: any = {};
      text.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        if (key && value) {
          result[key] = decodeURIComponent(value);
        }
      });

      return result as T;
    } catch (error) {
      throw new Error(`API request failed: ${error}`);
    }
  }

  /**
   * Get configuration
   */
  public getConfig(): GMOPGConfig {
    return { ...this.config };
  }
}
