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
            notes:[
                {
                    title:"我在这里欢笑，我在这里哭泣",
                    content:'咖啡馆与广场有三个街区\n就象霓虹灯到月亮的距离\n人们在挣扎中相互告慰和拥抱\n寻找着 追著着 奄奄一息的碎梦\n我们在这欢笑 我们在这哭泣\n我们在这活着也在这死去\n我们在这祈祷 我们在这迷惘\n我们在这寻找 也在这失去'
                },
                {
                    title:"快刀斩乱麻",
                    content:'咖啡馆与广场有三个街区\n就象霓虹灯到月亮的距离\n人们在挣扎中相互告慰和拥抱\n寻找着 追著着 奄奄一息的碎梦\n我们在这欢笑 我们在这哭泣\n我们在这活着也在这死去\n我们在这祈祷 我们在这迷惘\n我们在这寻找 也在这失去'
                },
                {
                    title:"效率才是第一",
                    content:'咖啡馆与广场有三个街区\n就象霓虹灯到月亮的距离\n人们在挣扎中相互告慰和拥抱\n寻找着 追著着 奄奄一息的碎梦\n我们在这欢笑 我们在这哭泣\n我们在这活着也在这死去\n我们在这祈祷 我们在这迷惘\n我们在这寻找 也在这失去'
                }
            ]
        }
        /*fetch('http://10.10.10.3:3000/getNoteBookList',{method:'GET'})
        .then((response)=>{
            return response.json();
        })
        .then((json)=>{
            this.setState({notebooklist:json});
        })*/
    }
    render(){
        return this.getNotes();
    }
    
    getContent=(content)=>{
    lines=content.split('\n');
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
        return(
            <TouchableOpacity key={uuid.v4()}>
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
        alert("hah")
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
        margin:20,
        justifyContent: 'center',
        elevation:5
    },
    deletetext:{
        color:'#FFFFFF',
        textAlign:'center',
        fontSize:15
    }
})