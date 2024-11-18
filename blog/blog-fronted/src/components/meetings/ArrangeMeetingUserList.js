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

const ArrangeMeetingUserListItem = ({userData, onClick}) => {
   return(
      <div onClick={() => {
         onClick(userData);
         console.log(userData);
      }}>{userData.username}</div>
   )
}

const ArrangeMeetingUserList = ({userDatas, onClick}) => {
   console.log(userDatas);

   return (
      <Wrapper>
         {
            userDatas.map((userData) =>                
                  (<ArrangeMeetingUserListItem userData={userData} 
                     onClick={onClick}/>)
            )  
         }
      </Wrapper>
   )
}

export default ArrangeMeetingUserList;