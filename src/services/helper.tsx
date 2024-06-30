import {lineDataItem} from 'react-native-gifted-charts';
import {KlineData, KlineDataType} from './types';

export const transformDataResponseToKlineData = (data: KlineDataType[]) => {
  return data.map(item => ({
    openTime: item[0],
    open: item[1],
    high: item[2],
    low: item[3],
    closePrice: item[4],
    volume: item[5],
    closeTime: item[6],
    quoteAssetVolume: item[7],
    numberOfTrades: item[8],
    takerBuyBaseAssetVolume: item[9],
    takerBuyQuoteAssetVolume: item[10],
  }));
};

const closeTimeUnixToDateString = (closeTime: number, interval: string) => {
  const date = new Date(closeTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;

  if (interval === '1h') {
    return `${hours}:${minutes}`;
  }

  return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}`;
};

export const apiDataToChartData = (
  data: KlineData[],
  interval: string,
  isMini?: boolean,
) => {
  return data.map((item, index) => {
    const dataPointText = `${parseFloat(item.closePrice)}`;

    return {
      value: parseFloat(item.closePrice),
      dataPointText,
      date: item.closeTime,
      label: isMini ? '' : closeTimeUnixToDateString(item.closeTime, interval),
    };
  });
};

export const findMinMax = (chartData: lineDataItem[]) => {
  const data = chartData.map(item => {
    return item.value;
  });

  let min = data[0];
  let max = data[0];

  const sortedData = data.sort((a, b) => a - b);

  min = sortedData[0];
  max = sortedData[sortedData.length - 1];

  const minimumVerticalRange = 100;
  const calculatedRange = max - min;

  if (calculatedRange < minimumVerticalRange) {
    const padding = (minimumVerticalRange - calculatedRange) * 2;
    min = min - padding * 2;
    max = max + padding * 2;
  } else {
    const padding = calculatedRange * 0.1;
    min = min - padding * 2;
    max = max + padding * 2;
  }

  return {min, max};
};

export const findLastIsPositive = (lineData: lineDataItem[]) => {
  if (lineData.length < 2) {
    return false;
  }
  const lastItem = lineData[lineData.length - 1];
  const lastButOneItem = lineData[lineData.length - 2];

  return lastItem.value > lastButOneItem.value;
};
