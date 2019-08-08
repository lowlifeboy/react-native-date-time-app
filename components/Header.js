import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Header = ({ title, onPressBack }) => {
  const { headerContainer, headerText, logOut } = styles;
  return (
    <View style={headerContainer}>
      <Text style={headerText}>{title}</Text>
      <TouchableOpacity>
        <Feather name="log-out" style={logOut} onPress={onPressBack} />
      </TouchableOpacity>
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
  logOut: {
    marginRight: 20,
    fontSize: 35,
    color: '#fff',
  },
});

export default Header;
