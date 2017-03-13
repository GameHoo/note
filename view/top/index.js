import React, { Component } from 'react';
import uuid from 'uuid'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
export default class Top extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            inputText:this.props.searchText
        }
    }
    render(){
      return this.getView();
    }
    TextChange=(text)=>{
        this.setState({inputText:text});
    }
    ChangeToSearch=()=>{
        this.props.TopModeChange('search');
    }
    ChangeToIdle=()=>{
         this.props.searchTextChange('');
        this.props.TopModeChange('idle');
    }
    Search=()=>{
       this.props.searchTextChange(this.state.inputText);
    }
    getView=()=>{
        if(this.props.TopMode=='idle')
        {
            return this.getIdleView();
        }else if(this.props.TopMode=='search')
        {
            return this.getSearchView();
        }
    }
    getSearchView=()=>{
        return(
        <View style={styles.container}>
            <View style={styles.container2}>
                <TextInput style={styles.input} onChangeText={this.TextChange} autoFocus ={true} placeholder='请输入要搜索的日记名' value={this.state.inputText}></TextInput>
                <TouchableOpacity onPress={this.Search}>
                    <Image  style={styles.img2} source={require('../../res/img/OK.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.ChangeToIdle}>
                    <Image  style={styles.img2} source={require('../../res/img/cancel.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
    getIdleView=()=>{
        return(
        <TouchableOpacity onPress={this.ChangeToSearch}>
        <View style={styles.container}>
            <View style={styles.container2}>
                <Image  style={styles.img} source={require('../../res/img/search.png')}/>
            </View>
        </View>
        </TouchableOpacity>
        );
    }
}


const styles=StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection:'column'
    },
    img:{
        width:20,
        height:20,
        margin:10
    },
    img2:{
        width:20,
        height:20,
        marginLeft:20,
        marginTop:20
    },
    container2:{
        backgroundColor:'#F5FCFF',
        justifyContent: 'center',
        flexDirection:'row',
    },
    input:{
        width:180
    }
})