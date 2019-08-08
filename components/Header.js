import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Constants from 'expo-constants';

const Header = ({ title }) => {
  const { headerContainer, headerText } = styles;
  return (
    <View style={headerContainer}>
      <Text style={headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    elevation: 8,
  },
  headerText: {
    margin: 20,
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Header;
