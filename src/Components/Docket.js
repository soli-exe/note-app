import React, { Component } from 'react'
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import plusIcon from '../assets/icons/plus.svg';


const SideMenu = styled.aside`
    box-shadow: 0 1px 6px var(--color-dark-shadow);
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    padding: 1rem 0;
    width: max(10rem, 15rem);
    
    @media (max-width: 768px){
      position: relative;
      flex-direction: row;
      box-shadow: unset;
      width: 100%;
      align-items: start;
      padding: 1rem 2rem 0 2rem;
      height: max-content;
    }
`;

const H1 = styled.h1`
  margin-bottom: 1.5rem;
  font-family: 'Poppins Bold';
  
  @media (max-width: 768px){
    margin: 0;
 }
  
`;

const SpanPlus = styled.span`
    background-color: var(--bg-dark-color);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    border-radius: 50%;
    margin-bottom: .5rem;
`;

const ColorItemList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
`;


const ColorItem = styled.li`
    display: block;
    margin-bottom: .5rem;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    cursor: pointer;
`;

const Details = styled.details`

 @media (max-width: 768px){
   position: absolute;
   right: 2rem;
   z-index: 100;
 }
`;


export default class Docket extends Component {


  render() {
    return (
      <SideMenu className='docket'>
        <H1>Easy Notes</H1>
        <Details className='detailsReset detailsAnimation'>
          <summary>
            <SpanPlus data-tip='Add Note'>
              <img src={plusIcon} className='icon' alt='add note icon' />
            </SpanPlus>
          </summary>
          <ColorItemList>
            <ColorItem onClick={this.props.addNote} className='colorYellowgreen'></ColorItem>
            <ColorItem onClick={this.props.addNote} className='colorDarkgrey'></ColorItem>
            <ColorItem onClick={this.props.addNote} className='colorRoyalblue'></ColorItem>
            <ColorItem onClick={this.props.addNote} className='colorSandybrown'></ColorItem>
            <ColorItem onClick={this.props.addNote} className='colorBittersweet'></ColorItem>
          </ColorItemList>
        </Details>
        <ReactTooltip place='bottom' />
      </SideMenu >
    )
  }
}
