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
        this.state = {
            NoteBookList: [{
                "name": "歌词"
            }],
            searchText: '',
            NoteBookPos: 0,
            TopMode: 'idle',
            AllMode: 'DefaultView',
            NoteId: null
        }
        this.RefreshNoteBookList();
    }

    RefreshNoteBookList = () => {
        fetch('http://10.10.10.3:3000/getNoteBookList', {method: 'GET'})
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({NoteBookList: json});
            })
    }
    RefreshNoteList = (str) => {
        this.setState({NoteBookName: str})
    }
    AddNoteBook = (NoteBookName) => {

    }
    SetNoteBookPos = (pos) => {
        this.setState({NoteBookPos: pos});
    }
    DeleteNoteBook = () => {

    }
    ChangeToNote = (id) => {
        this.setState({AllMode: 'NoteView', NoteId: id});
    }
    TopModeChange = (mode) => {
        this.setState({TopMode: mode})
    }
    searchTextChange = (text) => {
        this.setState({searchText: text});
    }
    getNoteView = () => {
        return (
            <NoteView NoteBookName={this.state.NoteBookList[this.state.NoteBookPos].name} NoteId={this.state.NoteId}/>
        );
    }

    render() {
        if (this.state.AllMode == 'NoteView') {
            return this.getNoteView();
        }
        return (
            <View style={styles.container}>
                <Top searchText={this.searchText} TopModeChange={this.TopModeChange} TopMode={this.state.TopMode}
                     searchTextChange={this.searchTextChange}/>
                <Mid NoteBookList={this.state.NoteBookList} SetNoteBookPos={this.SetNoteBookPos}
                     NoteBookPos={this.state.NoteBookPos} AddNoteBook={this.AddNoteBook}/>
                <Bootom NoteBookName={this.state.NoteBookList[this.state.NoteBookPos].name}
                        searchText={this.state.searchText} ChangeToNote={this.ChangeToNote}/>
            </View>
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