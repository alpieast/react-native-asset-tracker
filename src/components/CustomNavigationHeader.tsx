import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = ({
  title,
  symbol,
  assetIconComponent,
  backButton,
}: {
  title: string;
  symbol: string;
  assetIconComponent: JSX.Element;
  backButton: JSX.Element;
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {backButton}
      </TouchableOpacity>
      {assetIconComponent}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    height: 56,
    paddingTop: 12,
  },
  icon: {
    width: 32,
    height: 32,
    marginLeft: 16,
    marginRight: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 1,
    color: '#212529',
  },
  symbol: {
    fontSize: 10,
    color: '#6C757D',
  },
});

export default CustomHeader;
