import React, {useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {RootStackParamList} from '../navigation/types';
import {CoinData} from '../services/types';
import AssetDetailLineChart from './AssetLineChart';

const AssetItem = ({asset}: {asset: CoinData}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const assetIconLink: string = `https://s2.coinmarketcap.com/static/img/coins/64x64/${asset.id}.png`;

  const assetPrice: string = asset.quote.USD.price.toFixed(2);
  const assetChange: string =
    asset.quote.USD.percent_change_24h.toFixed(2) + '%';

  const [disabled, setDisabled] = useState<boolean>(false);

  const assetImage = (
    <Image source={{uri: assetIconLink}} style={styles.imageForHeader} />
  );

  const backButton = (
    <Image source={require('../assets/icons/backButton.png')} />
  );

  const onPress = () => {
    navigation.navigate('AssetDetailScreen', {
      asset,
      assetImage,
      backButton,
    });
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.container, disabled && styles.disabledContainer]}>
        <Image source={{uri: assetIconLink}} style={styles.icon} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{asset.name}</Text>
          <Text style={styles.symbol}>{asset.symbol}</Text>
        </View>
        <View style={styles.chartAndPriceContainer}>
          <AssetDetailLineChart
            asset={asset}
            isMini
            setDisabled={setDisabled}
          />
          <View style={styles.priceContainer}>
            <Text style={styles.price}>$ {assetPrice}</Text>
            <Text
              style={[
                styles.change,
                {
                  color:
                    asset.quote.USD.percent_change_24h !== 0 &&
                    asset.quote.USD.percent_change_24h > 0
                      ? 'green'
                      : 'red',
                },
              ]}>
              {asset.quote.USD.percent_change_24h > 0 ? '+' : ''}
              {assetChange}
            </Text>
          </View>
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
    paddingHorizontal: 16,
  },
  disabledContainer: {
    opacity: 0.8,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  imageForHeader: {
    width: 24,
    height: 24,
    marginLeft: 16,
    marginRight: 8,
  },
  infoContainer: {
    flex: 1,
  },
  chartAndPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: 110,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343A40',
  },
  change: {
    fontSize: 14,
    paddingTop: 6,
  },
});

export default AssetItem;
