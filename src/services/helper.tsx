import {KlineDataType} from './types';

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

export const apiDataToChartData = (data: any[], interval: string) => {
  return data.map((item, index) => {
    const dataPointText = `${parseFloat(item.closePrice)}`;

    return {
      value: parseFloat(item.closePrice),
      dataPointText,
      date: item.closeTime,
      label: closeTimeUnixToDateString(item.closeTime, interval),
    };
  });
};
