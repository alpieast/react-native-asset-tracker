import {CoinData} from '../services/types';

export type RootStackParamList = {
  AssetsScreen: undefined;
  AssetDetailScreen: {asset: CoinData};
};
