import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LineChart, lineDataItem} from 'react-native-gifted-charts';
import {CoinData, Interval} from '../services/types';
import {useEffect, useState} from 'react';
import ApiService from '../services/apiService';
import {
  apiDataToChartData,
  findLastIsPositive,
  findMinMax,
} from '../services/helper';

const AssetDetailLineChart = ({
  asset,
  isMini,
  setDisabled,
}: {
  asset: CoinData;
  isMini?: boolean;
  setDisabled?: (value: boolean) => void;
}) => {
  const apiService = ApiService.getInstance();

  const [loading, setLoading] = useState<boolean>(true);

  const [lineData, setLineData] = useState<lineDataItem[]>([]);
  const [interval, setInterval] = useState<Interval>(
    isMini ? Interval.ONE_DAY : Interval.ONE_HOUR,
  );

  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(100);

  useEffect(() => {
    const fetchAsset = async () => {
      setLoading(true);
      await apiService
        .getAssetDetailByName(asset.symbol, interval)
        .then(response => {
          const chartData = apiDataToChartData(response, interval, isMini);
          setLineData(chartData);

          const {min, max} = findMinMax(chartData);

          setMaxValue(max);
          setMinValue(min);
        })
        .catch(error => {
          console.log(error);
          if (setDisabled) setDisabled(true);
        })
        .finally(() => {
          console.log('Asset detail fetched');
          setLoading(false);
        });
    };

    fetchAsset();
  }, [asset.symbol, interval]);

  return (
    <View style={isMini ? styles.miniChartContainer : styles.chartContainer}>
      {loading ? (
        isMini ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading asset detail...</Text>
          </View>
        )
      ) : (
        <LineChart
          maxValue={isMini ? maxValue : undefined}
          mostNegativeValue={isMini ? minValue : undefined}
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
          color={
            isMini
              ? findLastIsPositive(lineData)
                ? '#21BF73'
                : '#D90429'
              : '#0063F5'
          }
          animationDuration={1000}
          animationEasing="ease-in-out"
          dataPointsHeight={-30}
          dataPointsWidth={40}
          height={isMini ? 25 : 345}
          width={isMini ? 80 : undefined}
        />
      )}

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 345,
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
