import React, { Component } from "react";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";
import {SkypeIndicator} from 'react-native-indicators';

const Loader = props => {
  const { loading, ...attributes } = props;

  return (
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <SkypeIndicator color="red" animating={loading} count={5} size={100} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "black",
    color: "black"

  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default Loader;
