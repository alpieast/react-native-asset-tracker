interface Quote {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: null;
  last_updated: string;
}

export interface CoinData {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  circulating_supply: number;
  date_added: string;
  quote: {USD: Quote};
  cmc_rank: number;
}

interface Status {
  timestamp: string;
  error_code: number;
  error_message: null;
  elapsed: number;
  credit_count: number;
  notice: string;
  total_count: number;
}

interface Body {
  status: Status;
  data: CoinData[];
}

export interface AllAssetsResponse {
  code: string;
  message: null;
  messageDetail: null;
  data: {body: Body};
}

export enum Interval {
  ONE_HOUR = '1h',
  ONE_DAY = '1d',
  ONE_WEEK = '1w',
  ONE_MONTH = '1M',
}

export type KlineDataType = [
  number, // Kline open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Kline close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string, // Ignore.
];
export interface KlineData {
  openTime: number;
  open: string;
  high: string;
  low: string;
  closePrice: string;
  volume: string;
  closeTime: number;
  quoteAssetVolume: string;
  numberOfTrades: number;
  takerBuyBaseAssetVolume: string;
  takerBuyQuoteAssetVolume: string;
  ignore?: string;
}
