import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {RootStackParamList} from '../navigation/types';
import {CoinData} from '../services/types';

const AssetItem = ({asset}: {asset: CoinData}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onPress = () => {
    navigation.navigate('AssetDetailScreen', {asset});
  };

  const assetIcon: string = `https://s2.coinmarketcap.com/static/img/coins/64x64/${asset.id}.png`;

  const assetPrice: string = asset.quote.USD.price.toFixed(2);
  const assetChange: string =
    asset.quote.USD.percent_change_24h.toFixed(2) + '%';

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={{uri: assetIcon}} style={styles.icon} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{asset.name}</Text>
          <Text style={styles.symbol}>{asset.symbol}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{assetPrice}</Text>
          <Text
            style={[
              styles.change,
              {color: asset.quote.USD.percent_change_24h > 0 ? 'green' : 'red'},
            ]}>
            {assetChange}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#fff',
    height: 72,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 8,
  },
  icon: {
    width: 40,
    height: 40,
    margin: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
  },
  symbol: {
    color: '#666',
  },
  priceContainer: {
    alignItems: 'flex-end',
    marginRight: 14,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  change: {
    fontSize: 14,
  },
});

export default AssetItem;
