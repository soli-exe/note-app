import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { bounceInLeft, bounceInDown } from 'react-animations';


const bounceInLeftAnimation = keyframes`${bounceInLeft}`;
const bounceInDownAnimation = keyframes`${bounceInDown}`;

const NoteDiv = styled.div`
    display:flex;
    align-items:center;
    flex-direction: column;
    justify-content: space-evenly;
    width: max(90%, 15rem);
    height: 17rem;
    max-height: 17rem;
    padding: 1.5rem;
    border-radius: 20px;
    z-index: 99;
    animation: ${bounceInLeftAnimation} 1s ease-in-out;
    @media (max-width: 768px){
        animation-name:  ${bounceInDownAnimation};
    }
`;

const NoteHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 2.5rem;
`;

const NoteTitle = styled.input`
    width: 9rem;
    border: none;
    outline: none;
    background-color: unset;
    padding: 0;
    font-family: 'Poppins Bold';
    color: var(--font-color-dark);
    &::placeholder {
        color: var(--font-color-dark);
        opacity: .7;
    }
`;

const NoteTextArea = styled.textarea`
    resize: none;
    outline: none;
    width: 100%;
    height: 100%;
    margin: .3rem 0;
    background-color: unset;
    border: none;
    color: var(--font-color-dark);
    font-weight: 600;
`;

const NoteFooter = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: max-content;
    width: 100%;
    padding: .5rem 0 0 0;
`;

const SaveBtn = styled.button`
    display: block;
    width: max-content;
    height: 2rem;
    border-radius: 50px;
    background-color: var( --bg-dark-color);
    border: none;
    color: white;
    padding: 0 .7rem;
    cursor: pointer;
    margin-left: auto;
`;


class NewNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            title: '',
            body: '',
            createdAt: this.getCurrentDate(),
            bgColor: props.bgColor,
            isBookmarked: false,
            saved: false
        }
    }

    getCurrentDate = () => {
        const monthsName = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const date = new Date();
        return `${monthsName[date.getMonth()].slice(0, 3)} ${date.getDay() - 1}, ${date.getFullYear()}`
    }

    saveNote = () => {
        if (this.state.body) {
            const { loadSavedNotes, unmount, notifySuccess } = this.props;
            let notes;
            if (localStorage.getItem("notes") === null) {
                notes = [];
            } else {
                notes = JSON.parse(localStorage.getItem('notes'))
            }
            this.setState({
                saved: true
            }, () => {
                const { id, title, body, bgColor, isBookmarked, createdAt } = this.state;
                const note = {
                    'id': id,
                    'title': title,
                    'body': body,
                    'createdAt': createdAt,
                    'bgColor': bgColor,
                    'isBookmarked': isBookmarked,
                }
                notes.push(note);
                localStorage.setItem('notes', JSON.stringify(notes))
                loadSavedNotes();
                unmount(id)
                notifySuccess("Saved!")
            })
        }


    }


    titleOnChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    bodyOnChange = (e) => {
        this.setState({
            body: e.target.value
        })
    }



    render() {
        const { bgColor } = this.props;
        const { title, body, saved } = this.state;
        return (
            <NoteDiv className={`${bgColor}`}>
                <NoteHeader>
                    <NoteTitle onChange={this.titleOnChange} type='text' placeholder='Title...' value={title} />
                </NoteHeader>
                <NoteTextArea onChange={this.bodyOnChange} placeholder="Your Note Here..." value={body}></NoteTextArea>
                <NoteFooter>
                    <SaveBtn saved={saved} onClick={this.saveNote}>
                        Save
                    </SaveBtn>
                </NoteFooter>
            </NoteDiv >
        );
    }
}

export default React.memo(NewNote);
export {
    NoteDiv,
    NoteHeader,
    NoteFooter,
    NoteTextArea,
    NoteTitle,
}
