import React, { Component } from "react";
import { ScrollView, Text, StyleSheet, View, Image } from "react-native";
import Loader from "../components/Loader";

export default class HowToScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "black", padding: 50 }}>
          <View>
          <Text style={{
            color: "red",
            textAlign: "left",
            width: "100%",
            fontSize: 40,
            fontFamily: "Lato-Regular"
          }}>Step 1</Text>
          <Text style={{
            color: "white",
            textAlign: "left",
            width: "100%",
            fontSize: 20,
            fontFamily: "Lato-Regular"
          }}>Press and hold on the category to add it to favourites.</Text>
       <Image source={require('../assets/AddToFav.gif')} style={{ width: 300, height: 500,borderColor: "white", borderWidth: 3, marginTop: 30}} />
          </View>
       
       <View style={{marginTop: 30}}>
       <Text style={{
            color: "red",
            textAlign: "left",
            width: "100%",
            fontSize: 40,
            fontFamily: "Lato-Regular"
          }}>Step 2</Text>
           <Text style={{
            color: "white",
            textAlign: "left",
            width: "100%",
            fontSize: 20,
            fontFamily: "Lato-Regular"
          }}>Press and hold on the category to remove it from favourites in the user favourites page.</Text>
        <Image source={require('../assets/RemoveFromFav.gif')} style={{ width: 300, height: 500, borderColor: "white", borderWidth: 3, marginTop: 30}} />
       </View>
       <View style={{height: 200}}/>
      </ScrollView>
    );
  }
}
