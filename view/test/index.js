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
import Mid from '../mid'
import Bootom from '../bottom'
import Top from '../top'
import NoteView from '../noteview'
export default class Test extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <NoteView NoteBookName="Game" NoteId="1"></NoteView>
        );
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column'
    },

})