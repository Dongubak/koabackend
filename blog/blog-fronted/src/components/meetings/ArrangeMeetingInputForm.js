import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

const Wrapper = styled(Responsive)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  flex-direction: column;
  border: 1px solid black;
`;

const ArrangeMeetingInputForm = (
   {keyword, onChange = () => {}, onSubmit = () => {}}
) => {

   return (
      <Wrapper>
         <h2>ArrangeMeetingInputForm</h2>
         <form onSubmit={onSubmit}>
            <input onChange={onChange} value={keyword}></input>
            <button onClick={onSubmit}>검색</button>
         </form>
      </Wrapper>
   )
}

export default ArrangeMeetingInputForm;