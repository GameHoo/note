import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Slide extends Component {
    constructor(props)
    {
        super(props);
        fetch('http://10.10.10.3:3000/getNoteBookList',{method:'GET'})
        .then((response)=>{
            return response.json();
        })
        .then((json)=>{
            this.setState({notebooklist:json});
        })
        this.state={
            pos:1,
            notebooklist:[]
        }
    }
    render(){
        
        return(
                <View style={styles.slide}>
                    {this.createBrand(this.state.pos-1)}
                    {this.createBrand(this.state.pos)}
                    {this.createBrand(this.state.pos+1)}
                </View>
        );
    }
    leftPress=()=>{
        this.setState({pos:this.state.pos-1});
    }
    midPress=()=>{
        alert('midPress');
    }
    rightPress=()=>{
        this.setState({pos:this.state.pos+1});
    }
    addpress=()=>{
        alert('addpress');
    }
    createBrand=(cur,onPress)=>{
        if(cur<0 || cur>=this.state.notebooklist.length)
        {
            return(
                <View style={styles.imgcontainer}>
                    <TouchableOpacity onPress={this.addpress}>
                        <Image  style={styles.img} source={require('../../res/img/add.png')}>
                        </Image>
                    </TouchableOpacity>
                </View>
            );
        }
        else if(this.state.pos==cur)
        {
            return(
                <Text key={cur} style={styles.chooseditems} onPress={this.midPress}>
                {this.state.notebooklist[cur].name.toString()}
                </Text>
            );
        }
        else
        {
                var PressFun;
                if(cur<this.state.pos)
                {
                    PressFun=this.leftPress;
                }
                else
                {
                    PressFun=this.rightPress;
                }
                return(
                <Text key={cur} style={styles.items} onPress={PressFun}>
                {this.state.notebooklist[cur].name.toString()}
                </Text>
            );
        }
    }
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
        flexDirection:'column'
    },
    slide:{
        height:52,
        backgroundColor:'#FFFFFF',
        elevation:3,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    statebar:{
        height:4,
        width:90,
        backgroundColor:'#68D7F3'
    },
    items:{
       flex:1,
       textAlign:'center',
       fontSize:21,
       color:'#AAAAAA'
    },
    chooseditems:{
       flex:1,
       textAlign:'center',
       fontSize:21,
       color:'#000000'
    },
    imgcontainer:{
        flex:1,
        alignItems:'center'
    },
    img:{
        width:45,
        height:45,
    }
})