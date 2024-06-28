import axios from 'axios';
import {AllAssetsResponse} from './types';

const API_BASE_URL =
  'https://www.binance.com/bapi/composite/v1/public/promo/cmc/cryptocurrency/listings/';

class ApiService {
  private static instance: ApiService;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ApiService();
    }
    return this.instance;
  }

  public async getAssetsWithPagination(
    limit: number,
    start: number,
  ): Promise<AllAssetsResponse> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}latest?limit=${limit}&start=${start}`,
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiService;
