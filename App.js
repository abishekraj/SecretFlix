import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import firebase from 'react-native-firebase';

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import PhoneLogin from "./screens/PhoneLogin";
import UserProfileScreen from "./screens/UserProfileScreen";
import InfoScreen from "./screens/InfoScreen";
import HowToScreen from "./screens/HowToScreen";

const RootStack = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  InfoScreen: {
    screen: InfoScreen,
    navigationOptions: {
      title:"help page",
      headerTitleStyle :{textAlign: 'center',alignSelf:'center', color: "white",  fontFamily:"Lato-Bold"},
      headerStyle:{
       backgroundColor:'#E50914',
      },
      headerTintColor: "white",
     },
    },
    HowToScreen: {
      screen: HowToScreen,
      navigationOptions: {
        title:"how to use",
        headerTitleStyle :{textAlign: 'center',alignSelf:'center', color: "white",  fontFamily:"Lato-Bold"},
        headerStyle:{
         backgroundColor:'#E50914',
        },
        headerTintColor: "white",
       },
      },
  PhoneLogin: {
    screen: PhoneLogin,
    navigationOptions: {
      title: 'phone number login',
      largeTitle: true,
      headerLeft: null,
       headerTitleStyle :{textAlign: 'center',alignSelf:'center', color: "white",  fontFamily:"Lato-Bold"},
       headerStyle:{
        backgroundColor:'#E50914',
       },
       gesturesEnabled: false,
       headerTintColor: "white",
      },
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
       gesturesEnabled: false,
       headerTintColor: "white",
    },
  },
  UserProfileScreen: {
    screen: UserProfileScreen,
    navigationOptions: {
      title: 'my profile',
      largeTitle: true,
       headerTitleStyle :{textAlign: 'center',alignSelf:'center', color: "white",  fontFamily:"Lato-Bold"},
       headerStyle:{
        backgroundColor:'#E50914',
       },
       headerTintColor: "white",
    },
  },
  
});

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
 
  render() {
    return <AppContainer />;
  }
}


