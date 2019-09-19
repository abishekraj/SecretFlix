import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, Linking} from "react-native";
import { ListItem, Button } from "react-native-elements";
import CompleteFlatList from "react-native-complete-flatlist";
import Loader from "../components/Loader";
import firebase from "react-native-firebase";
import AsyncStorage from '@react-native-community/async-storage';


let dataSource = [];
const alreadyLaunched = 'alreadyLaunched';


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      loggedIn: false,
      userid: "",
      firstLaunch: false,
     };
    var { navigation } = this.props;
    this.categoryList = [];
    this._renderItem = this._renderItem.bind(this);
    this.checkLogin = this.checkLogin.bind(this);  
  }

  componentDidMount() {
    debugger;
    this.getCategoriesData();
    AsyncStorage.getItem(alreadyLaunched).then(value => {
      if(value === null){
           AsyncStorage.setItem(alreadyLaunched, 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
           this.setState({firstLaunch: true});
      }
      else {
           this.setState({firstLaunch: false});
      }})

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true, userid: user.uid });
      } else {
        this.setState({ loggedIn: false, userid: "" });
      }
    });
  }

  checkLogin = () => {
    if (this.state.loggedIn) {
      this.props.navigation.navigate("UserProfileScreen");
    } else {
      Alert.alert(
        "Oops!",
        "You need to be logged in to view saved categories!",
        [
          {
            text: "Dismiss",
            style: "cancel"
          },
          {
            text: "Login",
            onPress: () => {
              this.props.navigation.navigate("PhoneLogin");
            }
          }
        ],
        { cancelable: false }
      );
    }};

  getCategoriesData = () => {
    debugger;
    this.setState({ loading: true });
    let ref = firebase.database().ref("Categories");
    ref.on("value", snapshot => {
      const categories = snapshot.val();
      this.setState({
        data: categories,
        loading: false
      });
      dataSource.push(categories);
    });
    console.log("DATA RETRIEVED", this.state.data, dataSource[0]);
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "grey",
          marginLeft: "14%"
        }}
      />
    );
  };

  _renderItem(data) {
    const item = data.cleanData ? data.cleanData : data;
    return (
      <ListItem
        containerStyle={{ backgroundColor: "#242424" }}
        titleStyle={{ color: "#D6D5C9", fontFamily: "Lato-Regular" }}
        item={data}
        key={item.id}
        title={item.name}
        onPress={() => {
          let netflixURL = "nflx://www.netflix.com/browse/genre/";
          Linking.openURL(netflixURL + item.id).catch(err =>
            console.error("An error occurred", err)
          );
        }}
        onLongPress={() => {
          if (this.state.loggedIn) {
            Alert.alert(
              "Add to Favourites",
              "Do you want to add this category to your favourites list?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "Add",
                  onPress: () => {
                    let favData = { name: item.name, id: item.id };
                    let userid = firebase.auth().currentUser.uid;
                    firebase
                      .database()
                      .ref("Users/" + userid + "/favourites/")
                      .push(favData)
                      .then(data => {
                        console.log("data ", data);
                      })
                      .catch(error => {
                        alert("error ", error);
                      });
                  }
                }
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert(
              "Oops!",
              "You need to be logged in to save categories!",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "Login",
                  onPress: () => {this.props.navigation.navigate("PhoneLogin");}
                }
              ],
              { cancelable: false }
            );
          }
        }}
      />
    );
  }

  render() {
    if (this.state.loading) {
      return <Loader loading={this.state.loading} />;
    }
    if (this.state.firstLaunch){
        Alert.alert(
        "Hello!",
        "Thank you for downloading Secret Flix. Hope you have a fun and easy experience. FYI to save a category press and hold on the name to save it as a favourite so you can access it anytime! For more details, please visit the help screen!",
        [
          {
            text: "Great!",
          }
        ],
        { cancelable: false }
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#E50914",
            height: 90,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "space-around"
          }}
        >
          <Button
            containerStyle={{ marginRight: 90 }}
            icon={{
              name: "info-circle",
              type: "font-awesome",
              size: 28,
              color: "black"
            }}
            buttonStyle={{ backgroundColor: "transparent" }}
            onPress={() => this.props.navigation.navigate("InfoScreen")}
          />
          <Text
            style={{
              color: "#D6D5C9",
              fontFamily: "Lato-Bold",
              fontSize: 20,
              textAlign: "center",
              marginBottom: 10
            }}
          >
            Secret Flix
          </Text>
          <Button
            containerStyle={{ marginLeft: 90 }}
            icon={{
              name: "user-circle",
              type: "font-awesome",
              size: 28,
              color: "black"
            }}
            buttonStyle={{ backgroundColor: "transparent" }}
            onPress={this.checkLogin}
          />
        </View>
        <CompleteFlatList
          searchTextInputStyle={{ color: "white", alignItems: "center" }}
          backgroundColor="black"
          searchKey={["name"]}
          highlightColor="yellow"
          data={this.state.data}
          ref={c => (this.completeFlatList = c)}
          renderSeparator={null}
          renderItem={this._renderItem}
          onEndReachedThreshold={0}
        />
      </View>
    );
  }
}
