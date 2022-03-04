import React, { Component } from 'react';
import styled from 'styled-components';
import searchIcon from '../assets/icons/search.svg';

const AppHeader = styled.header` 
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    width: 100%;
    background-color: white;
`;

const HeaderForm = styled.form`
    display: flex;
    align-items: center;
    position: relative;
    height: 2rem;
    width: 100%;
`;

const ImgSearch = styled.img`
    position: absolute;
    left: 0;
    margin: 0 .5rem;
`;

const SearchInput = styled.input`
    width: min(100%, 17rem);
    height: 100%;
    padding: 0 2rem;
    transition: all 0.2s ease-in-out, background-color .3s linear;
    
    &:focus{
        border-bottom: 1px solid rgb(0, 89, 255);
    }

    &::placeholder {
        color: var(--color-secondary-gray);
    }
`;


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        }
    }

    searchInputOnChange = (e) => {
        this.setState({
            searchValue: e.target.value
        }, () => { this.props.seachNotes(this.state.searchValue) })
    }

    preventInputDefault = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    }


    render() {
        return (
            <AppHeader className='header'>
                <HeaderForm>
                    <ImgSearch className='icon' src={searchIcon} alt='search icon' />
                    <SearchInput className='inputReset' type='text' placeholder='Search title...' value={this.state.searchValue} onChange={this.searchInputOnChange} onKeyPress={this.preventInputDefault} />
                </HeaderForm>
            </AppHeader >
        )
    }
}

export default Header;