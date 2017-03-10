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
export default class Test extends Component {
    constructor(props)
    {
        super(props);
       
    }
    render(){
       return(
        <View style={styles.container}>
            <Text>hello</Text>
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