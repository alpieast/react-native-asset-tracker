import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';

type AssetDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'AssetDetailScreen'
>;

type Props = {
  route: AssetDetailScreenRouteProp;
};

const AssetDetailScreen = ({route}: Props) => {
  const {asset} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{uri: asset.icon}} style={styles.icon} />
        <Text style={styles.name}>{asset.name}</Text>
        <Text style={styles.symbol}>({asset.symbol})</Text>
      </View>
      <Text style={styles.price}>{asset.price}</Text>
      <Text style={[styles.change, {color: asset.changeColor}]}>
        {asset.change}
      </Text>
      <View style={styles.chartContainer}>
        {/* Replace this View with your chart component */}
        <View style={styles.chartPlaceholder}>
          <Text>Chart Placeholder</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Market Stats</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Market Cap</Text>
          <Text style={styles.statValue}>10</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Volume</Text>
          <Text style={styles.statValue}>100</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Circulating Supply</Text>
          <Text style={styles.statValue}>1000</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Popularity</Text>
          <Text style={styles.statValue}>low</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  symbol: {
    fontSize: 18,
    color: '#666',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  change: {
    fontSize: 16,
    marginBottom: 16,
  },
  chartContainer: {
    height: 200,
    marginBottom: 16,
  },
  chartPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  statsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 16,
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
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AssetDetailScreen;
