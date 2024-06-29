import axios from 'axios';
import {AllAssetsResponse, KlineData} from './types';
import {transformDataResponseToKlineData} from './helper';

const API_BASE_URL = 'https://www.binance.com';
const ASSETS_API_ROUTE =
  '/bapi/composite/v1/public/promo/cmc/cryptocurrency/listings/';
const ASSET_CHART_DETAIL_ROUTE = '/api/v3/uiKlines';

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
        `${API_BASE_URL}${ASSETS_API_ROUTE}latest?limit=${limit}&start=${start}`,
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getAssetDetailByName(
    assetName: string,
    interval: string,
  ): Promise<KlineData[]> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}${ASSET_CHART_DETAIL_ROUTE}?symbol=${assetName}USDT&interval=${interval}&limit=100`,
      );

      return transformDataResponseToKlineData(response.data);
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}

export default ApiService;
