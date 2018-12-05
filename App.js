import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { Font, Asset, AppLoading } from 'expo';

import Store from './src/store/index';
import AppEntry from './src/index';

function cacheFonts() {
  return Font.loadAsync({
    'robotoBold': require('./src/assets/fonts/Roboto-Bold.ttf'),
    'robotoLight': require('./src/assets/fonts/Roboto-Light.ttf'),
    'robotoMedium': require('./src/assets/fonts/Roboto-Medium.ttf'),
    'robotoRegular': require('./src/assets/fonts/Roboto-Regular.ttf'),
  });
}

function cacheImages(images){
  return Asset.loadAsync([
    require('./src/assets/img/logo/logo.png'),
    require('./src/assets/img/lock/lock.png'),
    require('./src/assets/img/user/user.png'),
  ])
}


export default class App extends React.Component {

  state = {
    isReady: false,
  };

  async componentDidMount() {
      await cacheImages();
      await cacheFonts();
      this.setState({ isReady: true });
  }

  render() {
    console.disableYellowBox = true;
    if (!this.state.isReady) {
      return (
        <AppLoading/>
      );
    }
      let store = Store;
      return (
        <Provider store = {store}>
          <AppEntry />
        </Provider>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
