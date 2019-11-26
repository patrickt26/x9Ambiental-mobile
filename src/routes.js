import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Map from './pages/Map';
import ReportFeed from './pages/ReportFeed';
import ReportDetail from './pages/ReportDetail';
import Profile from './pages/Profile';

import SelectType from './pages/New/SelectType';
import SelectZone from './pages/New/SelectZone';
import SelectLocation from './pages/New/SelectLocation';
import Confirm from './pages/New/Confirm';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Map,
            Report: {
              screen: createStackNavigator(
                {
                  ReportFeed,
                  ReportDetail,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Feed',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="explore" size={20} color={tintColor} />
                ),
              },
            },
            New: {
              screen: createStackNavigator(
                {
                  SelectType,
                  SelectZone,
                  SelectLocation,
                  Confirm,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: false,
                tabBarLabel: 'Relatar',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="add-circle-outline" size={20} color={tintColor} />
                ),
              },
            },
            Profile,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: false,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              style: {
                backgroundColor: '#20B2aB',
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
