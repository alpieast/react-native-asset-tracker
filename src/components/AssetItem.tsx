import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {AssetType} from '../screens/AssetsScreen';
import {RootStackParamList} from '../navigation/types';

const AssetItem = ({asset}: {asset: AssetType}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onPress = () => {
    navigation.navigate('AssetDetailScreen', {asset});
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={{uri: asset.icon}} style={styles.icon} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{asset.name}</Text>
          <Text style={styles.symbol}>{asset.symbol}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{asset.price}</Text>
          <Text style={[styles.change, {color: asset.changeColor}]}>
            {asset.change}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  symbol: {
    color: '#666',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  change: {
    fontSize: 14,
  },
});

export default AssetItem;
