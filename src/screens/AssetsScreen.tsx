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

    let lastMessageTimestamp = 0;
    const messageInterval = 1000;

    const handleWebSocketMessage = (data: WebSocketMessage) => {
      const now = Date.now();
      if (now - lastMessageTimestamp >= messageInterval) {
        console.log('WebSocket message:', data);

        setAssets(prevAssets =>
          prevAssets.map(asset =>
            `${asset.symbol.toUpperCase()}USDT` === data.s
              ? {
                  ...asset,
                  quote: {
                    ...asset.quote,
                    USD: {
                      ...asset.quote.USD,
                      price: parseFloat(data.w),
                    },
                  },
                }
              : asset,
          ),
        );
        lastMessageTimestamp = now;
      }
    };

    wsService.onMessage(handleWebSocketMessage);

    return () => {
      wsService.disconnect();
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
