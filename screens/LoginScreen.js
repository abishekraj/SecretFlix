import React, { Component } from "react";
import { View } from "react-native";
import { Button, Icon, Image } from "react-native-elements";
import firebase from "react-native-firebase";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      userid: ""
    };
  }

  componentWillMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("HomeScreen");
      } else {
        this.props.navigation.navigate("LoginScreen");
      }
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          alignContent: "center",
          justifyContent: "center",
          padding: 40
        }}
      >
        <View style={{
          alignItems: "center",
          marginBottom:100
        }}>
        <Image source={require('../assets/LoginImage.png')} style={{ width: 200, height: 200}} />
        </View>
        <View
          style={{
            backgroundColor: "black",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <Button
            raised={true}
            icon={
              <Icon
                name="mobile-phone"
                type="font-awesome"
                size={35}
                color="white"
              />
            }
            iconContainerStyle={{ marginLeft: 100 }}
            title="sign in with phone number"
            type="outline"
            titleStyle={{
              color: "white",
              fontFamily: "Lato-Regular",
              fontSize: 15,
              marginLeft: 28
            }}
            buttonStyle={{
              width: "100%",
              height: 50,
              borderColor: "red",
              borderWidth: 1,
              backgroundColor: "red",
              justifyContent: "flex-start"
            }}
            onPress={() => this.props.navigation.navigate("PhoneLogin")}
          />
        </View>
        <View
          style={{
            backgroundColor: "black",
            alignContent: "center",
            justifyContent: "center",
            marginTop: 20
          }}
        >
          <Button
            raised={true}
            icon={
              <Icon
                name="user-secret"
                type="font-awesome"
                size={30}
                color="black"
              />
            }
            title="proceed without login"
            type="outline"
            titleStyle={{
              color: "black",
              fontFamily: "Lato-Regular",
              fontSize: 15,
              marginLeft: 20
            }}
            buttonStyle={{
              width: "100%",
              height: 50,
              borderColor: "red",
              borderWidth: 1,
              backgroundColor: "transparent",
              justifyContent: "flex-start"
            }}
            onPress={() => this.props.navigation.navigate("HomeScreen")}
          />
        </View>
      </View>
    );
  }
}
