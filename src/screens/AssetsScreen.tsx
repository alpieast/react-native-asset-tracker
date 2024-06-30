import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
  ActivityIndicator,
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

  const fetchAssets = async (increase: number) => {
    setLoading(true);
    await apiService
      .getAssetsWithPagination(limit, startPoint + increase)
      .then(response => {
        setAssets(prev => [...prev, ...response.data.body.data]);
        setStartPoint(startPoint + increase);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAssets(0).then(() => {
      if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
          UIManager.setLayoutAnimationEnabledExperimental(true);
        }
      }

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    });
  }, []);

  const renderItem = useCallback(({item}: {item: CoinData}) => {
    return <AssetItem asset={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending Coins</Text>
      <FlatList
        data={assets}
        renderItem={renderItem}
        keyExtractor={item => item.symbol}
        style={styles.flatList}
        refreshing={loading}
        onEndReached={() => {
          if (!loading) fetchAssets(limit);
        }}
        getItemLayout={(data, index) => ({
          length: 100,
          offset: 10 * index,
          index,
        })}
        onEndReachedThreshold={0.5}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading assets...</Text>
        </View>
      )}
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
  title: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '700',
  },
  flatList: {
    flex: 1,
    paddingTop: 16,
  },
  loadingContainer: {
    position: 'absolute',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA80',
    bottom: 0,
    height: 50,
    width: '100%',
  },
});

export default AssetsList;
