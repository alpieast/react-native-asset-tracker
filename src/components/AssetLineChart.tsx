import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LineChart, lineDataItem} from 'react-native-gifted-charts';
import {CoinData, Interval} from '../services/types';
import {useEffect, useState} from 'react';
import ApiService from '../services/apiService';
import {apiDataToChartData} from '../services/helper';

const AssetDetailLineChart = ({asset}: {asset: CoinData}) => {
  const apiService = ApiService.getInstance();

  const [lineData, setLineData] = useState<lineDataItem[]>([]);
  const [interval, setInterval] = useState<Interval>(Interval.ONE_HOUR);

  useEffect(() => {
    const fetchAsset = async () => {
      const assetResponse = await apiService.getAssetDetailByName(
        asset.symbol,
        interval,
      );
      setLineData(apiDataToChartData(assetResponse, interval));
    };

    fetchAsset();
  }, [asset.symbol, interval]);
  return (
    <View style={styles.chartContainer}>
      <LineChart
        focusEnabled
        showDataPointOnFocus
        showTextOnFocus
        curved
        scrollToEnd
        data={lineData}
        thickness={2}
        hideRules
        hideYAxisText
        yAxisColor={'#fff'}
        color="#0063F5"
        animateOnDataChange
        animationDuration={1000}
        animationEasing="ease-in-out"
        dataPointsHeight={-30}
        dataPointsWidth={40}
        height={345}
      />
      <View style={styles.buttonGroup}>
        {Object.values(Interval).map(value => (
          <TouchableOpacity
            key={value}
            style={[styles.button, interval === value && styles.selectedButton]}
            onPress={() => setInterval(value)}>
            <Text
              style={[
                styles.buttonText,
                interval === value && styles.selectedButtonText,
              ]}>
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginBottom: 16,
  },
  chartPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: '#DFE2E4',
    borderRadius: 20,
    marginHorizontal: 5,
    width: 60,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#ECF4FF',
    borderColor: '#0063F5',
  },
  buttonText: {
    color: '#6C757D',
  },
  selectedButtonText: {
    color: '#0063F5',
  },
});

export default AssetDetailLineChart;
