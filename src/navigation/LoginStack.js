import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Animated, Easing } from 'react-native';

//screens
import Login from '../screens/Login.screen';
import RequestOTP from '../screens/RequestOTP.screen';
import EnterOTP from '../screens/EnterOTP.screen';

const stackNavigatorConfig = {
    headerMode: 'none',
    mode: 'card',
    navigationOptions: {
      gesturesEnabled: false,
    },
    lazy: true,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  }; 

export const LoginStack = StackNavigator({
    Login: {
        screen: Login
    },
    RequestOTP: {
        screen: RequestOTP
    },
    EnterOTP: {
      screen: EnterOTP
    }
},stackNavigatorConfig);