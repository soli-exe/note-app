import React, { PureComponent } from 'react'
import styled from 'styled-components';
import starIcon from '../assets/icons/star.svg';
import trashIcon from '../assets/icons/trash.svg';
import startFillIcon from '../assets/icons/star-filled.svg';
import editIcon from '../assets/icons/pen.svg';

import {
    NoteDiv,
    NoteFooter,
    NoteHeader,
    NoteTextArea,
    NoteTitle,
} from './NewNote';

import '../assets/css/App.css';


const SpanDate = styled.span`
    display: block;
    font-size: 10pt;
    margin-right: auto;
    font-weight: 550;
`;

const ActionBtn = styled.button`
    display: grid;
    place-items: center;
    background-color: var( --bg-dark-color);
    border-radius: 50%;
    border: none;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    margin: 0 .2rem;
`;

export default class Note extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            updatedTitle: props.title,
            updatedBody: props.body,
        }
    }

    titleOnChange = (e) => {
        this.setState({
            updatedTitle: e.target.value
        })
    }

    bodyOnChange = (e) => {
        this.setState({
            updatedBody: e.target.value
        })
    }

    render() {
        const { id, bgColor, isBookmarked, createdAt, deleteNote, bookmarkNote, editNote } = this.props;
        const { updatedTitle, updatedBody } = this.state;
        return (
            <NoteDiv className={`${bgColor}`} data-id={id}>
                <NoteHeader>
                    <NoteTitle onChange={this.titleOnChange} type='text' placeholder='Title...' value={updatedTitle} />
                    <ActionBtn onClick={() => bookmarkNote(id, isBookmarked)}>
                        <img src={isBookmarked ? startFillIcon : starIcon} className='icon-sm' alt='star icon' />
                    </ActionBtn>
                </NoteHeader>
                <NoteTextArea onChange={this.bodyOnChange} value={updatedBody} placeholder="Your Note Here..."></NoteTextArea>
                <NoteFooter>
                    <SpanDate>{createdAt}</SpanDate>
                    <ActionBtn onClick={() => editNote(id, updatedTitle, updatedBody)}>
                        <img src={editIcon} className='icon-sm' alt='edit icon' />
                    </ActionBtn>
                    <ActionBtn onClick={() => deleteNote(id)}>
                        <img src={trashIcon} className='icon-sm' alt='trash icon' />
                    </ActionBtn>
                </NoteFooter>
            </NoteDiv >
        )
    }
}
