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

const ArrangeMeetingUserListItem = ({userData}) => {
   return(
      <div>{userData.username}</div>
   )
}

const ArrangeMeetingUserList = ({userDatas}) => {
   console.log(userDatas);
   return (
      <Wrapper>
         {
            userDatas.map((userData) =>                
                  (<ArrangeMeetingUserListItem userData={userData} />)
            )  
         }
      </Wrapper>
   )
}

export default ArrangeMeetingUserList;