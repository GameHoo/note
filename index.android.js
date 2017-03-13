/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Test from './view/test'
import App from './view/app'
export default class note extends Component {
  render() {
    return (
        <Test/>
    );
  }
}
AppRegistry.registerComponent('note', () => note);
