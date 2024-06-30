// AssetsList.tsx
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
import {CoinData, WebSocketMessage} from '../services/types';
import ApiService from '../services/apiService';
import WebSocketService from '../services/websocket';

const AssetsList = () => {
  const apiService = ApiService.getInstance();
  const wsService = WebSocketService.getInstance();

  const [assets, setAssets] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const limit = 10;
  const [startPoint, setStartPoint] = useState<number>(1);

  const latestData = new Map<string, WebSocketMessage>();

  const fetchAssets = async (increase: number) => {
    setLoading(true);
    await apiService
      .getAssetsWithPagination(limit, startPoint + increase)
      .then(response => {
        const newAssets = response.data.body.data;
        setAssets(prev => [...prev, ...newAssets]);
        setStartPoint(startPoint + increase);

        const symbols = newAssets.map(asset => asset.symbol.toLowerCase());
        wsService.connect(symbols);
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

    const messageInterval = 60000; // 1 minute in milliseconds

    const handleWebSocketMessage = (data: WebSocketMessage) => {
      latestData.set(data.s, data);
    };

    wsService.onMessage(handleWebSocketMessage);

    const intervalId = setInterval(() => {
      setAssets(prevAssets =>
        prevAssets.map(asset => {
          const data = latestData.get(`${asset.symbol.toUpperCase()}USDT`);
          if (data) {
            return {
              ...asset,
              quote: {
                ...asset.quote,
                USD: {
                  ...asset.quote.USD,
                  price: parseFloat(data.w),
                },
              },
            };
          }
          return asset;
        }),
      );
      latestData.clear();
    }, messageInterval);

    return () => {
      wsService.disconnect();
      clearInterval(intervalId);
    };
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
