import React, { Component } from 'react';
import Header from './Components/Header';
import Docket from './Components/Docket';
import NotesContainer from './Components/NotesContainer';
import Note from './Components/NewNote';
import { v4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './assets/css/font.css';
import './assets/css/App.css';
import './assets/css/var.css';
import { nanoid } from 'nanoid';

class App extends Component {

  constructor() {
    super();
    this.state = {
      notes: [],
      allSavedNotes: [],
      searchResult: []
    }
  }

  componentDidMount() {
    this.loadSavedNotes()
  }

  unmount = (id) => {
    const { notes } = this.state;
    this.setState((prevState) => ({
      notes: this.removeNote(prevState.notes, id)
    }))
  }

  loadSavedNotes = () => {
    if (localStorage.getItem('notes') !== null) {
      let loadedNotes = JSON.parse(localStorage.getItem('notes'));
      this.setState({
        allSavedNotes: [...loadedNotes]
      })
    }
  }

  addNote = (e) => {
    this.setState(prevState => ({
      notes: [...prevState.notes, {
        id: nanoid(),
        note: Note,
        bgColor: e.target.classList[2],
        key: v4()
      }]
    }))
  }

  seachNotes = (searchValue) => {
    const { allSavedNotes } = this.state;
    let result = allSavedNotes.filter((obj) => obj.title.includes(searchValue));
    if (result) {
      this.setState({
        searchResult: [...result]
      })
    }

  }

  removeNote = (arr, value) => {
    const newNotes = arr.filter((obj) => {
      return obj.id !== value;
    });
    return newNotes
  }

  deleteNote = (id) => {
    let notes = JSON.parse(localStorage.getItem('notes'))
    const newNotes = this.removeNote(notes, id)
    this.setState((prevState) => ({
      allSavedNotes: this.removeNote(prevState.allSavedNotes, id)
    }));
    return localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  editNote = (id, updatedTitle, updatedBody) => {
    const notesData = [...this.state.allSavedNotes]
    const index = notesData.findIndex(obj => obj.id === id)
    notesData[index].title = updatedTitle
    notesData[index].body = updatedBody
    this.setState((prevState) => ({
      allSavedNotes: notesData
    }))
    localStorage.setItem('notes', JSON.stringify(notesData))
    this.notifySuccess("Edited!");
  }

  bookmarkNote = (id, isBookmarkedStatus) => {
    const notesData = [...this.state.allSavedNotes]
    const index = notesData.findIndex(obj => obj.id === id)
    notesData[index].isBookmarked = !isBookmarkedStatus
    this.setState((prevState) => ({
      allSavedNotes: notesData
    }))
    return localStorage.setItem('notes', JSON.stringify(notesData))
  }

  notifySuccess = (alertMsg) => {
    toast.success(alertMsg, {
      theme: "dark",
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }

  render() {
    const { notes, allSavedNotes, searchResult } = this.state;
    return (
      <main className='gridContainer'>
        <Header seachNotes={this.seachNotes} />
        <Docket addNote={this.addNote} />

        <NotesContainer unmount={this.unmount}
          loadSavedNotes={this.loadSavedNotes}
          notes={notes}
          allSavedNotes={searchResult.length > 0 ? searchResult : allSavedNotes}
          deleteNote={this.deleteNote}
          bookmarkNote={this.bookmarkNote}
          editNote={this.editNote}
          notifySuccess={this.notifySuccess}
        />

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
      </main>
    );
  }
}

export default App;