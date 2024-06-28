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
  date_added: string;
  quote: {USD: Quote};
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
