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

export default class Bottom extends Component {
    constructor(props)
    {
        super(props);
        this.state={
          notes:[],
        };
        fetch('http://10.10.10.3:3000/getNoteList',{method:'POST',headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:'notebookname='+this.props.NoteBookName
             })
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json!=null)
                {
                    this.setState({notes:json});
                }
            })
    }
    render(){
        return this.getNotes();
    }
    
    getContent=(content)=>{
    var lines=content.split('\n');
    return(
        lines.map((line)=>{
            return(
            <View key={uuid.v4()}>
                <Text style={styles.content}>
                {line.substring(0,10)+"..."}
                </Text>
                <View style={styles.contentline}></View>
            </View>
            );
        })
    );}
    getNote=(note)=>{
        if(this.props.searchText!=note.title.substring(0,this.props.searchText.length))return (<View key={uuid.v4()}/>);
        return(
            <TouchableOpacity onPress={this.ChangeToNote.bind(null,note.id)} key={uuid.v4()}>
            <View  style={styles.notewarp}>
                <View style={styles.note}>
                    <Text style={styles.title}>{note.title}</Text>
                    <View style={styles.titleline}></View>
                    {this.getContent(note.content)}
                </View>
            </View>
            </TouchableOpacity>
        );
    }
    getNotes=()=>{

        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                   {this.state.notes.map((note)=>{return this.getNote(note)})}
                   <TouchableOpacity onPress={this.ChangeToNote}>
                   <View style={styles.addnote}>
                       <Image  style={styles.img} source={require('../../res/img/add2.png')}/>
                       <Text style={styles.addnotetext}>
                           新建一个记事
                       </Text>
                   </View>
                  </TouchableOpacity>
                <TouchableOpacity onPress={this.deletenootbook}>
                   <View style={styles.delete}>
                       <Text style={styles.deletetext}>
                           删除这个记事本
                       </Text>
                   </View>
                </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
    deletenootbook=()=>{
        alert("hah");
    }
    ChangeToNote=(id)=>{
        if(id==null){
            id=uuid.v4();
        }
        this.props.ChangeToNote(id);
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
    note:{
        backgroundColor:'#FFFFFF',
        width:240.6,
        height:240.6,
        elevation:5,
        flexDirection:'column',
    },
    notebook:{
        backgroundColor:'#FFFFFF',
    },
    title:{
        textAlign:'center',
        fontSize:21,
        color:'#666666',
    },
    titleline:{
        height:1,
        backgroundColor:'#000000',
        marginLeft:10,
        marginRight:10,
        marginBottom:15
    },
    content:{
        //textAlign:'center',
        marginLeft:26,
        fontSize:15
    },
    contentline:{
        height:1,
        backgroundColor:'#DBDBDB',
        marginLeft:25,
        marginRight:25,
        marginBottom:4
    },
    scroll:{
        
    },
    notewarp:{
        margin:20
    },
    delete:{
        width:240.6,
        height:30,
        backgroundColor:'#FF6666',
        marginLeft:20,
        marginRight:20,
        marginBottom:20,
        justifyContent: 'center',
        elevation:5
    },
    deletetext:{
        color:'#FFFFFF',
        textAlign:'center',
        fontSize:15
    },
    addnote:{
        width:240.6,
        height:30,
        backgroundColor:'#FFFFFF',
        marginLeft:20,
        marginRight:20,
        marginBottom:10,
        justifyContent: 'center',
        alignItems:'center',
        elevation:5,
        flexDirection:'row'
    },
    addnotetext:{
        color:'#000000',
        textAlign:'center',
        fontSize:15
    },
    img:{
        width:20,
        height:20,
        margin:5
    }
})