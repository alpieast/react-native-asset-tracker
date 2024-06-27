import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import AssetItem from '../components/AssetItem';

export type AssetType = {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change: string;
  changeColor: string;
  icon: string;
};
// Mock data
const mockData: AssetType[] = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '₹2,509.75',
    change: '+9.77%',
    changeColor: 'green',
    icon: 'https://example.com/bitcoin.png',
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    price: '₹2,509.75',
    change: '-21.00%',
    changeColor: 'red',
    icon: 'https://example.com/ethereum.png',
  },
  {
    id: '3',
    name: 'Band Protocol',
    symbol: 'BAND',
    price: '₹553.06',
    change: '-22.97%',
    changeColor: 'red',
    icon: 'https://example.com/band.png',
  },
  {
    id: '4',
    name: 'Cardano',
    symbol: 'ADA',
    price: '₹105.06',
    change: '+16.31%',
    changeColor: 'green',
    icon: 'https://example.com/cardano.png',
  },
  {
    id: '5',
    name: 'TRON',
    symbol: 'TRX',
    price: '₹5.29',
    change: '-16.58%',
    changeColor: 'red',
    icon: 'https://example.com/tron.png',
  },
  {
    id: '6',
    name: 'Tether',
    symbol: 'USDT',
    price: '₹73.00',
    change: '+0.07%',
    changeColor: 'green',
    icon: 'https://example.com/tether.png',
  },
  {
    id: '7',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: '₹23.39',
    change: '+21.00%',
    changeColor: 'green',
    icon: 'https://example.com/dogecoin.png',
  },
];

const AssetsList = () => {
  const renderItem = ({item}: {item: AssetType}) => {
    return <AssetItem asset={item} />;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending Coins</Text>
      <FlatList
        data={mockData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
});

export default AssetsList;
