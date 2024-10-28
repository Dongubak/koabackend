import React from 'react';
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

const ArrangeMeetingTimeTable = () => {

   return (
      <Wrapper>
         <h2>ArrangeMeetingTimeTable</h2>
      </Wrapper>
   )
}

export default ArrangeMeetingTimeTable;