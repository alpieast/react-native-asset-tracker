import {View, Text, StyleSheet} from 'react-native';
import {CoinData} from '../services/types';

const AssetDetailHeader = ({asset}: {asset: CoinData}) => {
  const assetPrice: string = asset.quote.USD.price.toFixed(2);
  const assetChangePercent: string =
    asset.quote.USD.percent_change_24h.toFixed(2) + '%';
  const assetChangePercentToValue: string = (
    (asset.quote.USD.price * asset.quote.USD.percent_change_24h) /
    100
  ).toFixed(2);
  return (
    <View style={styles.header}>
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
        {assetChangePercentToValue}({assetChangePercent})
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#212529',
  },
  change: {
    fontSize: 12,
    paddingLeft: 3,
  },
});

export default AssetDetailHeader;
