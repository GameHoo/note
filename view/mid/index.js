import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Mid extends Component {
    constructor(props)
    {
        super(props);
    }
    render(){
        
        return(
                <View style={styles.slide}>
                    {this.createBrand(this.props.NoteBookPos-1)}
                    {this.createBrand(this.props.NoteBookPos)}
                    {this.createBrand(this.props.NoteBookPos+1)}
                </View>
        );
    }
    leftPress=()=>{
        this.props.SetNoteBookPos(this.props.NoteBookPos-1);
    }
    midPress=()=>{
        
    }
    rightPress=()=>{
        this.props.SetNoteBookPos(this.props.NoteBookPos+1);
    }
    addpress=()=>{
        alert('addpress');
    }
    createBrand=(cur)=>{
        if(cur<0 || cur>=this.props.NoteBookList.length)
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
        else if(this.props.NoteBookPos==cur)
        {
            return(
                <Text key={cur} style={styles.chooseditems} onPress={this.midPress}>
                {this.props.NoteBookList[cur].name.toString()}
                </Text>
            );
        }
        else
        {
                var PressFun;
                if(cur<this.props.NoteBookPos)
                {
                    PressFun=this.leftPress;
                }
                else
                {
                    PressFun=this.rightPress;
                }
                return(
                <Text key={cur} style={styles.items} onPress={PressFun}>
                {this.props.NoteBookList[cur].name.toString()}
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