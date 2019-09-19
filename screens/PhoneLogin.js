import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,  
  Alert
} from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loader from "../components/Loader";
import PhoneInput from "react-native-phone-input";
import firebase from "react-native-firebase";
import OtpInputs from 'react-native-otp-inputs';


const otpRef = React.createRef();
export default class PhoneLogin extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: "",
      codeInput: "",
      phoneNumber: "",
      confirmResult: null,
      loading: false
    };
  }
 
  clearOTP = () => {
    otpRef.current.clear()
  }


  componentDidMount() {
    debugger;
        this.setState({
          user: null,
          message: "",
          codeInput: "",
          phoneNumber: "",
          confirmResult: null,
          loading: false
        });

  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    debugger;
    const { phoneNumber } = this.state;
    let countryCodeVariable = this.phone.getCountryCode();
    let number = "+" + countryCodeVariable + phoneNumber;
    this.setState({ message: "Sending code ...", loading: true });

    firebase
      .auth()
      .signInWithPhoneNumber(number)
      .then(confirmResult =>
        this.setState({
          confirmResult,
          message: "Code has been sent!",
          loading: false
        })
      )
      .catch(error => this.setState({ message: `Oops! ${error.message}`,  loading: false }));
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;
    this.setState({ loading: true });
    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          const newUser = firebase.auth().currentUser;
          console.log('User metadata: ', user.metadata);
          if (newUser.metadata.creationTime == newUser.metadata.lastSignInTime) {
            firebase.database().ref('Users/'+newUser.uid).set(user).then((data)=>{
              console.log('data ' , data)
          }).catch((error)=>{
             alert('error ' , error)
          })
          this.setState({ message: "Code Confirmed!", loading: false });
          this.props.navigation.navigate("HomeScreen");
        } else {
          this.setState({ message: "Code Confirmed!", loading: false });
        }
          this.setState({ message: "Code Confirmed!", loading: false });
          this.props.navigation.navigate("HomeScreen");
         })
        .catch(error =>
          this.setState({ message: `Code Confirm Error: ${error.message}`, loading: false })
        );
    }
  };

  checkNumberInput = () => {
    if (this.state.phoneNumber != '') {
          this.signIn();
    } else {
      alert('Please Enter Number');
    }
  };
  checkOTPInput = () => {
    if (this.state.codeInput != '') {
      this.confirmCode();
    } else {
      alert('Please Enter OTP');
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;
    return (
      <View style={{ flex: 1, padding: 30, alignItems: "center" }}>
        <Text
          style={{
            color: "white",
            textAlign: "left",
            width: "100%",
            fontSize: 40,
            fontFamily: "Lato-Regular"
          }}
        >
          Enter your phone number
        </Text>
        <PhoneInput
          style={{
            backgroundColor: "white",
            width: "100%",
            height: 50,
            borderRadius: 20,
            padding: 20,
            marginTop: 50
          }}
          textStyle={{ fontFamily: "Lato-Regular", fontSize: 18 }}
          ref={ref => {
            this.phone = ref;
          }}
          onPressConfirm={value => this.setState({ countryCode: value })}
          onChangePhoneNumber={mobileNumber => this.setState({ phoneNumber: mobileNumber })}
          value={phoneNumber}
          pickerItemStyle={{ height: 300 }}
        />
        <Button
          raised={true}
          title="get OTP"
          type="outline"
          titleStyle={{
            color: "white",
            fontFamily: "Lato-Regular",
            fontSize: 18
          }}
          buttonStyle={{
            width: 180,
            height: 50,
            borderColor: "red",
            borderWidth: 1,
            backgroundColor: "red",
            justifyContent: "center"
          }}
          containerStyle={{ marginTop: 30 }}
          onPress={this.checkNumberInput}
        />
          <Button
          raised={true}
          title="go back"
          type="outline"
          titleStyle={{
            color: "white",
            fontFamily: "Lato-Regular",
            fontSize: 18
          }}
          buttonStyle={{
            width: 180,
            height: 50,
            borderColor: "red",
            borderWidth: 1,
            backgroundColor: "red",
            justifyContent: "center"
          }}
          containerStyle={{ marginTop: 30 }}
          onPress={()=>this.props.navigation.goBack()}
        />
      </View>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text
        style={{
          padding: 5,
          backgroundColor: "white",
          color: "red",
          textAlign: "center",
          fontFamily: "Lato-Regular",
          fontSize: 15
        }}
      >
        {message}
      </Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;
    return (
      <View style={{ flex: 1, padding: 30, alignItems: "center" }}>
        <Text
          style={{
            color: "white",
            textAlign: "left",
            width: "100%",
            fontSize: 40,
            fontFamily: "Lato-Regular"
          }}
        >
          Enter verification code below
        </Text>
        <OtpInputs
          autoFocus
          containerStyles={{padding: 100,}}
          inputContainerStyles={{backgroundColor:"white"}}
          inputsContainerStyles={{marginBottom: 300, height: 100,backgroundColor:"transparent",}}
          ref={this.otpRef}
          handleChange={value => this.setState({ codeInput: value })}
          numberOfInputs={6}
          value={codeInput}
          keyboardType="number-pad"
          returnKeyType="done"
        />
        <Button
          raised={true}
          title="confirm OTP"
          type="outline"
          titleStyle={{
            color: "white",
            fontFamily: "Lato-Regular",
            fontSize: 18
          }}
          buttonStyle={{
            width: 180,
            height: 50,
            borderColor: "red",
            borderWidth: 1,
            backgroundColor: "red",
            justifyContent: "center"
          }}
         containerStyle={{ marginBottom: 300 }}
          onPress={this.checkOTPInput}
        />
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    if (!this.state.loading) {
      return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
          {this.renderMessage()}
          {!user && !confirmResult && this.renderPhoneNumberInput()}
          {!user && confirmResult && this.renderVerificationCodeInput()}

          {user && (
            <View
              style={{
                padding: 15,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#77dd77",
                flex: 1
              }}
            >
              <Text style={{ fontSize: 25 }}>Signed In!</Text>
              <Text>{JSON.stringify(user)}</Text>
              <Button title="Sign Out" color="red" onPress={this.signOut} />
            </View>
          )}
        </View>
      );
    } else {
      return <Loader loading={this.state.loading} />;
    }
  }
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "white",
    color: "white"
  },
  info: {
    // width: 200,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginTop: 20
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "white",
    color: "white"
  }
});
