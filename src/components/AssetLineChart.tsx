import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LineChart, lineDataItem} from 'react-native-gifted-charts';
import {CoinData, Interval} from '../services/types';
import {useEffect, useState} from 'react';
import ApiService from '../services/apiService';
import {apiDataToChartData, findMinMax} from '../services/helper';

const AssetDetailLineChart = ({
  asset,
  isMini,
}: {
  asset: CoinData;
  isMini?: boolean;
}) => {
  const apiService = ApiService.getInstance();

  const [lineData, setLineData] = useState<lineDataItem[]>([]);
  const [interval, setInterval] = useState<Interval>(
    isMini ? Interval.ONE_DAY : Interval.ONE_HOUR,
  );

  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(100);

  useEffect(() => {
    const fetchAsset = async () => {
      const assetResponse = await apiService.getAssetDetailByName(
        asset.symbol,
        interval,
      );
      const chartData = apiDataToChartData(assetResponse, interval, isMini);
      setLineData(chartData);

      const values = chartData.map(item => {
        return item.value;
      });

      const {min, max} = findMinMax(values);

      const minimumVerticalRange = 100;

      const calculatedRange = max - min;
      let yMin = min;
      let yMax = max;

      if (calculatedRange < minimumVerticalRange) {
        const padding = (minimumVerticalRange - calculatedRange) * 2;
        yMin = minValue - padding;
        yMax = maxValue + padding;
        setMaxValue(max + padding);
        setMinValue(min - padding);
      } else {
        const padding = calculatedRange * 0.1;
        yMin = minValue - padding;
        yMax = maxValue + padding;
        setMaxValue(max + padding);
        setMinValue(min - padding);
      }
    };

    fetchAsset();
  }, [asset.symbol, interval]);

  return (
    <View style={isMini ? styles.miniChartContainer : styles.chartContainer}>
      <LineChart
        maxValue={isMini ? maxValue : undefined}
        mostNegativeValue={isMini ? minValue : undefined}
        yAxisOffset={10}
        focusEnabled
        showDataPointOnFocus
        showTextOnFocus
        curved
        scrollToEnd={!isMini}
        data={lineData}
        thickness={2}
        adjustToWidth={isMini}
        hideRules
        hideYAxisText
        yAxisColor={'#fff'}
        hideAxesAndRules={isMini}
        showXAxisIndices={!isMini}
        color={isMini ? 'red' : '#0063F5'}
        animateOnDataChange
        animationDuration={1000}
        animationEasing="ease-in-out"
        dataPointsHeight={-30}
        dataPointsWidth={40}
        height={isMini ? 25 : 345}
        width={isMini ? 80 : undefined}
      />
      {!isMini && (
        <View style={styles.buttonGroup}>
          {Object.values(Interval).map(value => (
            <TouchableOpacity
              key={value}
              style={[
                styles.button,
                interval === value && styles.selectedButton,
              ]}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginBottom: 16,
  },
  miniChartContainer: {
    width: 80,
    height: 25,
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
