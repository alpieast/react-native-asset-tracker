import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';
import {ScrollView} from 'react-native-gesture-handler';
import AssetDetailStats from '../components/AssetDetailStats';
import AssetDetailLineChart from '../components/AssetLineChart';
import AssetDetailHeader from '../components/AssetDetailHeader';

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
      <AssetDetailHeader asset={asset} />
      <ScrollView>
        <AssetDetailLineChart asset={asset} />
        <AssetDetailStats asset={asset} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AssetDetailScreen;
