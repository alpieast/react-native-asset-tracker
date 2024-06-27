import {AssetType} from '../screens/AssetsScreen';

export type RootStackParamList = {
  AssetsScreen: undefined;
  AssetDetailScreen: {asset: AssetType};
};
