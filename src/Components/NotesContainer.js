import React, { Component, createRef } from 'react'
import styled from 'styled-components';
import Note from './Note';

const NoteContainer = styled.main`
    display: grid;
    height: 100vh;
    width: 100%;
    overflow-y: auto;
    grid-template-columns: repeat(auto-fill,minmax(min(100%, 17rem), 1fr));
    grid-template-rows: 1fr 1fr 1fr 1fr;
    justify-items: center;
    grid-gap: 1rem;
    padding: .5rem 2rem 10rem 2rem;
    @media (max-width: 768px){
        width: 100vw;
        padding-top: 0;
    }
`;

class NotesContainer extends Component {
    constructor(props) {
        super(props);
        this.containerRef = createRef(this.containerRef);
    }

    render() {
        const { notes, unmount, allSavedNotes, loadSavedNotes, deleteNote, bookmarkNote, editNote, notifySuccess } = this.props;
        let savedNotes;
        if (allSavedNotes.length > 0) {
            savedNotes = allSavedNotes.map(note => <Note key={note.id} id={note.id} title={note.title} body={note.body} bgColor={note.bgColor} isBookmarked={note.isBookmarked} createdAt={note.createdAt} deleteNote={deleteNote} bookmarkNote={bookmarkNote} editNote={editNote} />)
        }

        let allNotes = notes.map(note => <note.note key={note.key} id={note.id} bgColor={note.bgColor} loadSavedNotes={loadSavedNotes} unmount={unmount} notifySuccess={notifySuccess} />)
        return (
            <NoteContainer ref={this.containerRef}>
                {savedNotes}
                {allNotes}
            </NoteContainer>
        )
    }
}


export default NotesContainer;