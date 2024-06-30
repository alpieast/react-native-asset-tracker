import {CoinData} from '../services/types';

export type RootStackParamList = {
  AssetsScreen: undefined;
  AssetDetailScreen: {
    asset: CoinData;
    assetImage: JSX.Element;
    backButton: JSX.Element;
  };
};
