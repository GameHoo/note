import React, { Component } from 'react';
import uuid from 'uuid'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Slide from '../slide'
import Bootom from '../bottom'
import Search from '../search'
export default class Test extends Component {
    constructor(props)
    {
        super(props);
       
    }
    render(){
       return(
        <View style={styles.container}>
            <Search/>
            <Slide/>
            <Bootom/>
        </View>
       );
    }
    
   
}


const styles=StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection:'column'
    },

})