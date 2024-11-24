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
// userCart
const UsernameCart = ({userCart}) => {
   console.log(userCart);
   return (
      <Wrapper>
         {/* {
            userCart.map((userData) => (
               <p>{userData.username}</p> 
            ))
         } */}
      </Wrapper>
   )
}

export default UsernameCart;