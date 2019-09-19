import React, { Component } from "react";
import { View, TouchableOpacity, Text, Linking} from "react-native";
import { Button, Icon, Image } from "react-native-elements";
import Rate from 'react-native-rate';
import Share from 'react-native-share';

const shareOptions = {
    title: 'Share via',
    message: 'Download Secret Flix on App Store',
    url: 'https://itunes.apple.com/us/app/secretflix/id1476942913',
};

export default class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      userid: "",
      rated:false
    };
  }

  componentWillMount() {
  
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
        }}
      >
         <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          <TouchableOpacity
            onPress={() =>  {
                let options = {
                AppleAppID:"1476942913",
               // GooglePackageName:"com.mywebsite.myapp",
               // AmazonPackageName:"com.mywebsite.myapp",
               // OtherAndroidURL:"http://www.randomappstore.com/app/47172391",
              //  preferredAndroidMarket: AndroidMarket.Google,
                preferInApp:true,
                openAppStoreIfInAppFails:true,
            }
            Rate.rate(options, success=>{
                if (success) {
                    this.setState({rated:true})
                }
            })}}
            style={{
              top: "20%",
              right: "5%",
              width: 150,
              height: 150,
              backgroundColor: "#E50914",
              position: "absolute",
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              borderRadius: 80

            }}
          >
             <View style={{ 
                     justifyContent: "center",
                     alignItems: "center"
                    }}>
               <Icon
                    name="star"
                    type="font-awesome"
                    color="white"
                    size={50}
                  />
              <Text style={{ color:"white",alignSelf: "center", justifyContent: "center", fontSize: 15 , marginTop: 15, fontWeight:"600",  fontFamily: "Lato-Regular"}}>
                rate us
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("HowToScreen")}
            style={{
              top: "20%",
              left: "5%",
              width: 150,
              height: 150,
              backgroundColor: "#E50914",
              position: "absolute",
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              borderRadius: 80
            }}
          >
            <View style={{ 
                     justifyContent: "center",
                     alignItems: "center"
                    }}>
               <Icon
                    name="question-circle-o"
                    type="font-awesome"
                    color="white"
                    size={50}
                  />
              <Text style={{ color:"white",alignSelf: "center", justifyContent: "center", fontSize: 15 , marginTop: 15, fontWeight:"600",  fontFamily: "Lato-Regular"}}>
                how to use
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, flexDirection: "column", marginBottom: 250}}>
          <TouchableOpacity
            onPress={() =>  Share.open(shareOptions)}
            style={{
              top: 50,
              left: "5%",
              width: 150,
              height: 150,
              backgroundColor: "#E50914",
              position: "absolute",
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              borderRadius: 80
            }}
          >
             <View style={{ 
                     justifyContent: "center",
                     alignItems: "center"
                    }}>
               <Icon
                    name="share-alt"
                    type="font-awesome"
                    color="white"
                    size={50}
                  />
              <Text style={{color:"white", alignSelf: "center", justifyContent: "center", fontSize: 15 , marginTop: 15, fontWeight:"600",  fontFamily: "Lato-Regular"}}>
                share app
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('https://secret-flix.flycricket.io/privacy.html')}
            style={{
              top: 50,
              right: "5%",
              width: 150,
              height: 150,
              backgroundColor: "#E50914",
              position: "absolute",
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              borderRadius: 80

            }}
          >
             <View style={{ 
                     justifyContent: "center",
                     alignItems: "center",
                    }}>
               <Icon
                    name="file-text"
                    type="font-awesome"
                    color="white"
                    size={50}
                  />
              <Text style={{color:"white", alignSelf: "center", justifyContent: "center", fontSize: 15 , marginTop: 15, fontWeight:"600",  fontFamily: "Lato-Regular"}}>
                privacy policy
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
        <Button
            containerStyle={{ 
            // position: 'absolute',
            // bottom:0,   
            // center:0 ,
            width:"100%"
          }}
            title="contact us or send feedback"
            onPress={()=> {Linking.openURL('mailto:abishek.abi07@gmail.com?subject=Feedback on SecretFlix')}}
            titleStyle={{
              color: "red",
              fontFamily: "Lato-Bold",
              fontSize: 20,       
            }}
            buttonStyle={{
              width: "100%",
              height: 80,
              borderColor: "red",
              borderWidth: 1,
              backgroundColor: "white",
              justifyContent: "center",
            }}
          />
        </View>

      </View>
    );
  }
}
