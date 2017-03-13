import React, {Component} from 'react';
import uuid from 'uuid'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';

export default class NoteView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: {
                title: '',
                content: ''
            }
        }
        fetch('http://10.10.10.3:3000/getNote', {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'id=' + this.props.NoteId + "&notebookname=" + this.props.NoteBookName
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json == null) {

                }
                this.setState({note: json});
            })
    }

    render() {
        return (
            <View>
                <Text>{this.state.note.title}</Text>
                <Text>{this.state.note.content}</Text>
            </View>
        );
    }
}