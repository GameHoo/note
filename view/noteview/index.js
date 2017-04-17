import React, {Component} from 'react';
import uuid from 'uuid'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Button
} from 'react-native';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import Markdown from 'react-native-simple-markdown'
export default class NoteView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: {
                id: this.props.NoteId,
                title: '无标题',
                content: ''
            },
            mode: 'markdown'//or input
        }


        fetch('http://119.29.62.43/getNote', {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'id=' + this.state.note.id + "&notebookname=" + this.props.NoteBookName
        })
            .then((response) => {
                json = response.json()
                    .then((json) => {
                    var temp=json;
                    temp._id=undefined;
                        this.setState({note:json})
                    })
            })
    }

    onTitleChange = (text) => {
        this.setState({note: {id: this.state.note.id, title: text, content: this.state.note.content}});
    }
    onContentChange = (event) => {
        this.setState({
            note: {
                id: this.state.note.id,
                title: this.state.note.title,
                content: event.nativeEvent.text || ''
            }
        });
    }
    changeMode = () => {
        if (this.state.mode == 'markdown') {
            this.setState({mode: 'input'});
            return;
        }
        this.setState({mode: 'markdown'});
    }
    onBlur = () => {

    }
    getContentView = () => {
        if (this.state.mode == 'markdown') {
            return (
                <Markdown >{this.state.note.content}</Markdown >
            );
        }
        else
            return (
                <AutoGrowingTextInput onBlur={this.onBlur} onChange={(event) => this.onContentChange(event)}
                                      style={styles.content} multiline={true}>{this.state.note.content}
                </AutoGrowingTextInput>
            );
    }
    deleteNote=()=>{
        fetch('http://119.29.62.43/deleteNote', {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'notebookname=' + this.props.NoteBookName + "&id=" + this.state.note.id
        }).then((response) => {
            this.props.ChangeToDefault();
        })
    }
    componentWillUnmount() {
        this.state.note.id = this.props.NoteId;
        fetch('http://119.29.62.43/updateNote', {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'notebookname=' + this.props.NoteBookName + "&note=" + JSON.stringify(this.state.note)
        }).then((response) => {

        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.ChangeToDefault}>
                    <View style={styles.imgcontainer}>
                        <Image style={styles.img} source={require('../../res/img/back.png')}/>
                        <Text style={styles.backtext}>返回主页</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.titlecontainer}>
                    <Text style={styles.biaoti} >标题:</Text>
                    <TextInput style={styles.title}  onChangeText={this.onTitleChange}>{this.state.note.title}</TextInput>
                </View>
                <View style={styles.contentcontainer}>
                    {this.getContentView()}
                </View>
                <View style={styles.button}>
                    <Button onPress={this.changeMode} title={this.state.mode=='markdown'?"编辑视图":"MarkDown视图"}></Button>
                </View>
                <View style={styles.button}>
                    <Button color="#FF6666" onPress={this.deleteNote} title={"删除该笔记"}></Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column'
    },
    title: {
        width: 280,
        textAlign: 'center',
    },
    content: {
        backgroundColor: '#eeeeee',
        fontSize: 17,
        borderRadius: 5
    },
    titlecontainer: {
        width: 330,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
    },
    contentcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 330,
        margin: 15,
        borderRadius: 5
    },
    biaoti: {},
    button: {
        width: 330,
        height: 50
    },
    img: {
        width: 20,
        height: 20,
        margin: 5
    },
    imgcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5
    },
    backtext: {
        textAlign: 'center',
        fontSize: 21
    }
});