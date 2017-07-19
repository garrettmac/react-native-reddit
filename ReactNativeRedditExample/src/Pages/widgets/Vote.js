/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class FrontPage extends Component {
  render() {
    return (
      <View style={{flex: 1,height,width,justifyContent: "center",alignItems: "center",backgroundColor: "#F5FCFF",}}>
        <Text style={{
fontWeight:"600",
fontSize:100,
  textAlignVertical: "center", textAlign: "center",}}>
          Hello
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
