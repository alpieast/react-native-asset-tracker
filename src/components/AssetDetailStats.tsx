import {View, Text, Image, StyleSheet} from 'react-native';
import {CoinData} from '../services/types';

const AssetDetailStats = ({asset}: {asset: CoinData}) => {
  return (
    <View style={styles.statsContainer}>
      <Text style={styles.statsTitle}>Market Stats</Text>
      <View style={styles.statRow}>
        <View style={styles.labelContainer}>
          <Image source={require('../assets/icons/marketCap.png')} />
          <Text style={styles.statLabel}>Market Cap</Text>
        </View>
        <Text style={styles.statValue}>{asset.quote.USD.market_cap}</Text>
      </View>
      <View style={styles.statRow}>
        <View style={styles.labelContainer}>
          <Image source={require('../assets/icons/volume.png')} />
          <Text style={styles.statLabel}>Volume(24H)</Text>
        </View>
        <Text style={styles.statValue}>{asset.quote.USD.volume_24h}</Text>
      </View>
      <View style={styles.statRow}>
        <View style={styles.labelContainer}>
          <Image source={require('../assets/icons/circulatingSupply.png')} />
          <Text style={styles.statLabel}>Circulating Supply</Text>
        </View>
        <Text style={styles.statValue}>{asset.circulating_supply}</Text>
      </View>
      <View style={styles.statRow}>
        <View style={styles.labelContainer}>
          <Image source={require('../assets/icons/popularity.png')} />
          <Text style={styles.statLabel}>Popularity</Text>
        </View>

        <Text style={styles.statValue}>#{asset.cmc_rank}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    padding: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AssetDetailStats;
