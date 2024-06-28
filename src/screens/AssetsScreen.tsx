import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import AssetItem from '../components/AssetItem';
import {CoinData} from '../services/types';
import ApiService from '../services/apiService';

const AssetsList = () => {
  const apiService = ApiService.getInstance();

  const [assets, setAssets] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const limit = 10;
  const [startPoint, setStartPoint] = useState<number>(1);

  const fetchAssets = async () => {
    setLoading(true);
    const assetsResponse = await apiService.getAssetsWithPagination(
      limit,
      startPoint,
    );

    setAssets(assetsResponse.data.body.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAssets().then(() => {
      if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
          UIManager.setLayoutAnimationEnabledExperimental(true);
        }
      }

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    });
  }, []);

  const renderItem = ({item}: {item: CoinData}) => {
    return <AssetItem asset={item} />;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending Coins</Text>
      <FlatList
        data={assets}
        renderItem={renderItem}
        keyExtractor={item => item.symbol}
        style={styles.flatList}
        refreshing={loading}
        onEndReached={() => console.log('End reached')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 12,
    padding: 16,
  },
  fixedLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: '#F8F9FA80',
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '700',
  },
  flatList: {
    flex: 1,
    paddingTop: 16,
  },
});

export default AssetsList;
