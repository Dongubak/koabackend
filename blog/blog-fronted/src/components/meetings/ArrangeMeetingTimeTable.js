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

const Wrapper2 = styled.div`
   display: flex;
`

const NameBox = styled.div`
   padding: 0.5rem;
`

const ArrangeMeetingTimeTable = ({cart, onDelete}) => {
   return (
      <Wrapper>
         <h2>ArrangeMeetingTimeTable</h2>
         <Wrapper2>
            {
               cart.map((userData) => (<NameBox onClick={() => {
                  onDelete(userData.username);
               }}>{userData.username}</NameBox>))
            }
         </Wrapper2>
      </Wrapper>
   )
}

export default ArrangeMeetingTimeTable;