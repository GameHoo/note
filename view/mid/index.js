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
        this.state={
            pos:0
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
        this.props.ChangeNoteBookName(this.props.NoteBookList[this.state.pos-1].name);
        this.setState({pos:this.state.pos-1});
    }
    midPress=()=>{
        
    }
    rightPress=()=>{
        this.props.ChangeNoteBookName(this.props.NoteBookList[this.state.pos+1].name);
        this.setState({pos:this.state.pos+1});
    }
    createBrand=(cur)=>{
        if(cur<0 || cur>=this.props.NoteBookList.length)
        {
            return(
                <View style={styles.imgcontainer}>
                    <TouchableOpacity onPress={this.props.PreAddNoteBook}>
                        <Image  style={styles.img} source={require('../../res/img/add.png')}>
                        </Image>
                    </TouchableOpacity>
                </View>
            );
        }
        else if(this.state.pos==cur)
        {
            if(this.props.NoteBookList==null||this.props.NoteBookList.length==0)return(<View></View>);
            return(
                <Text key={cur} style={styles.chooseditems} onPress={this.midPress}>
                {this.props.NoteBookList[cur].name.toString()}
                </Text>
            );
        }
        else
        {
            if(this.props.NoteBookList==null||this.props.NoteBookList.length==0)return(<View></View>);
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
        flexDirection:'column',
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