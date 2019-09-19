import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Linking } from "react-native";
import { ListItem, Button } from "react-native-elements";
import Loader from "../components/Loader";
import firebase from "react-native-firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class UserProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      userid: "",
      loggedIn: false
    };
    this.categoryList = [];
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({loggedIn: true, userid: user.uid});
        this.getUserData();
      } else {
        this.setState({loggedIn: false});
      }
    });
     
    }
  componentDidMount(){

  }

  signOut = () => {
    debugger;
    this.props.navigation.navigate("HomeScreen");
    firebase.auth().signOut();
  };

  getUserData = () => {
    this.setState({ loading: true });
    let userid= firebase.auth().currentUser.uid
    let ref = firebase.database().ref('Users/'+userid+'/favourites/')
    ref.on("value", snapshot => {
      var tasks = [];
      snapshot.forEach(child => {
        tasks.push({
          name: child.val().name,
          id: child.val().id,
          key: child.key
        });
      });

      this.setState({
        data: tasks,
        loading: false
      });
      dataSource=tasks;
    });
  };
  renderFooter = () => {
    //View to set in Footer
    return (
      <View style={{height: 50, backgroundColor: "#242424"  }}>
       
      </View>
    );
  };

  _renderItem(data) {
    const item = data;
    return (
      <ListItem
        containerStyle={{ backgroundColor: "gray" }}
        titleStyle={{ color: "black", fontFamily: "Lato-Regular" }}
        item={data}
        key={data.id}
        title={data.name}
        onPress={() => {
          let netflixURL = "nflx://www.netflix.com/browse/genre/";
          Linking.openURL(netflixURL + item.id).catch(err =>
            alert("Please try again!")
          );
        }}
        />
        );
      }
    

  render() {
    if (this.state.loading) {
      return <Loader loading={this.state.loading} />;
    }
    return (

      <View style={{ flex: 1, backgroundColor: "black", height:"100%" }}>
        <View style={{ padding:50, backgroundColor: "black" , borderBottomColor:"red"}}>
        <Text
          style={{
            color: "white",
            textAlign: "left",
            width: "100%",
            fontSize: 40,
            fontFamily: "Lato-Regular"
          }}
        >
          My Favourites List
        </Text>
        </View>
        {this.state.data<=0 ?
        <View style={{height: "65%",backgroundColor: "#242424", borderTopRightRadius: 50, borderTopLeftRadius: 50, padding:20 }}>
        <Text  style={{
          color: "white",
          textAlign: "center",
          width: "100%",
          fontSize: 17,
          fontFamily: "Lato-Regular"
        }}>
        You dont have any favourites yet! 
        </Text>
        </View>
        :
        <View>
        <FlatList
        style={{height: "65%",backgroundColor: "#242424", borderTopRightRadius: 50, borderTopLeftRadius: 50, padding:20 }}
          data={this.state.data}
          ListFooterComponent={this.renderFooter}
          renderItem= {({item}) =>
            <ListItem
              containerStyle={{ backgroundColor: "#242424" }}
              titleStyle={{ color: "white", fontFamily: "Lato-Regular" }}
              key={item.id}
              title={item .name}
              onPress={() => {
                let netflixURL = "nflx://www.netflix.com/browse/genre/";
                Linking.openURL(netflixURL + item.id).catch(err =>
                  console.error("An error occurred", err)
                );
              }}
              onLongPress={() => {
                  Alert.alert(
                    "Remove from Favourites",
                    "Do you want to remove this category to your favourites list?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      {
                        text: "Remove",
                        onPress: () => {
                          let userid = firebase.auth().currentUser.uid
                          let ref = firebase.database().ref('Users/'+userid+'/favourites/'+item.key)
                          ref.remove();
                        }
                      }
                    ],
                    { cancelable: false }
                  )
                }}
              />
              }
        />
      </View>
        }
          <Button
            containerStyle={{ 
            position: 'absolute',
            bottom:0,   
            center:0 ,
            width:"100%"
          }}
            title="logout"
            onPress={this.signOut}
            titleStyle={{
              color: "white",
              fontFamily: "Lato-Bold",
              fontSize: 20,   
            }}
            buttonStyle={{
              width: "100%",
              height: 50,
              borderColor: "red",
              borderWidth: 1,
              backgroundColor: "red",
              justifyContent: "center",
            }}
          />
      </View>
    );
   } 
  }
