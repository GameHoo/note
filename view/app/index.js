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
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NoteBookList: [],
            searchText: '',
            TopMode: 'idle',
            AllMode: 'DefaultView',
            NoteId: null,
            NoteBookName: '',
            Notes: []
        }
    }
    componentDidMount(){
        this.RefreshNoteBookList();
        setInterval(()=>{this.RefreshNoteBookList();},3000)
    }
    RefreshNoteBookList = () => {
        fetch('http://10.10.10.3:3000/getNoteBookList', {method: 'GET'})
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json != null) {
                    this.setState({NoteBookList: json});
                    this.ChangeNoteBookName(this.state.NoteBookName==""? this.state.NoteBookList[0].name:this.state.NoteBookName)
                }
            })
    }
    AddNoteBook = (inputText) => {
        fetch('http://10.10.10.3:3000/addNoteBook', {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'notebookname=' + inputText
        })
            .then((response) => {
                this.RefreshNoteBookList();
                this.TopModeChange('idle');
            })
    }
    PreAddNoteBook = () => {
        this.TopModeChange('AddNoteBook');
    }

    DeleteNoteBook = () => {
        fetch('http://10.10.10.3:3000/DeleteNoteBook', {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'notebookname=' + this.state.NoteBookName
        })
            .then((response) => {
                this.state.NoteBookName="";
                this.RefreshNoteBookList();
            })
    }
    ChangeToNote = (id) => {
        this.setState({AllMode: 'NoteView', NoteId: id});
    }
    ChangeToDefault = () => {
        this.setState({AllMode: 'DefaultView'});
    }
    TopModeChange = (mode) => {
        this.setState({TopMode: mode})
    }
    searchTextChange = (text) => {
        this.setState({searchText: text});
    }
    AddNote = (notebookname) => {
        var id = uuid.v4();
        fetch('http://10.10.10.3:3000/addNote', {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'id=' + id + "&notebookname=" + this.state.NoteBookName
        })
            .then((response) => {
                this.ChangeToNote(id);
            })
    }

    getNoteView = () => {
        return (
            <NoteView ChangeToDefault={this.ChangeToDefault} NoteBookName={this.state.NoteBookName}
                      NoteId={this.state.NoteId}/>
        );
    }
    ChangeNoteBookName = (name) => {
        fetch('http://10.10.10.3:3000/getNoteList', {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'notebookname=' + name
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json != null) {
                    this.setState({Notes: json});
                    this.setState({NoteBookName: name});
                }
            })
    }

    render() {
        if (this.state.AllMode == 'NoteView') {
            return this.getNoteView();
        }
        else {
            return (
                <View style={styles.container}>
                    <Top AddNoteBook={this.AddNoteBook} searchText={this.searchText} TopModeChange={this.TopModeChange}
                         TopMode={this.state.TopMode}
                         searchTextChange={this.searchTextChange}/>
                    <Mid ChangeNoteBookName={this.ChangeNoteBookName} PreAddNoteBook={this.PreAddNoteBook}
                         NoteBookList={this.state.NoteBookList}
                         AddNoteBook={this.PreAddNoteBook}/>
                    <Bootom RefreshNoteBookList={this.RefreshNoteBookList} AddNote={this.AddNote} DeleteNoteBook={this.DeleteNoteBook} Notes={this.state.Notes}
                            searchText={this.state.searchText} ChangeToNote={this.ChangeToNote}/>
                </View>
            );
        }
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