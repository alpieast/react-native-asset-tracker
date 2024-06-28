import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';
import {LineChart} from 'react-native-gifted-charts';
import {CoinData} from '../services/types';

type AssetDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'AssetDetailScreen'
>;

type Props = {
  route: AssetDetailScreenRouteProp;
};

const AssetDetailScreen = ({route}: Props) => {
  const {asset} = route.params;

  const assetPrice: string = asset.quote.USD.price.toFixed(2);
  const assetChangePercent: string =
    asset.quote.USD.percent_change_24h.toFixed(2) + '%';
  const assetChangePercentToValue: string = (
    (asset.quote.USD.price * asset.quote.USD.percent_change_24h) /
    100
  ).toFixed(2);

  const lineData = [
    {value: 100, time: '1'},
    {value: 70, time: '2'},
    {value: 120, time: '3'},
    {value: 90, time: '4'},
    {value: 120, time: '5'},
    {value: 50, time: '6'},
    {value: 100, time: '7'},
    {value: 110, time: '8'},
    {value: 160, time: '9'},
    {value: 150, time: '10'},
    {value: 100, time: '11'},
    {value: 80, time: '12'},
    {value: 120, time: '13'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image source={{uri: asset.icon}} style={styles.icon} />
        <Text style={styles.name}>{asset.name}</Text>
        <Text style={styles.symbol}>({asset.symbol})</Text> */}
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

      <View style={styles.chartContainer}>
        {/* Replace this View with your chart component */}
        <LineChart
          focusEnabled
          showDataPointOnFocus
          showTextOnFocus
          focusedCustomDataPoint={() => {
            return {
              value: 100,
              time: '7',
            };
          }}
          focusedDataPointColor={'#0063F5'}
          focusedDataPointRadius={8}
          focusedDataPointWidth={2}
          focusedDataPointHeight={10}
          focusedDataPointShape="circle"
          onFocus={() => {
            console.log('Focused');
          }}
          curved
          data={lineData}
          spacing={30}
          hideDataPoints
          thickness={2}
          hideRules
          hideYAxisText
          yAxisColor={'#fff'}
          yAxisTextStyle={{color: '#fff'}}
          xAxisLabelTexts={[
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
          ]}
          color="#0063F5"
          animateOnDataChange
          animationDuration={1000}
          animationEasing="ease-in-out"
        />
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Market Stats</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Market Cap</Text>
          <Text style={styles.statValue}>{asset.quote.USD.market_cap}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Volume(24H)</Text>
          <Text style={styles.statValue}>{asset.quote.USD.volume_24h}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Circulating Supply</Text>
          <Text style={styles.statValue}>{asset.circulating_supply}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Popularity</Text>

          <Text style={styles.statValue}>Medium</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#212529',
  },
  change: {
    fontSize: 12,
    paddingLeft: 3,
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
