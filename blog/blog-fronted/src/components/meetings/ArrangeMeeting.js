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

const Button = styled.button`

`

const CustomButton = ({
   content, callBack = () => {}
}) => {
   return(
      <Button onClick={callBack}>{content}</Button>
   )
}

const ArrangeMeeting = ({
   onGoBack
}) => {
   return (
      <Wrapper>
         <h2>
            ArrangeMeeting
         </h2>
         <div>
            <CustomButton content="취소" callBack={onGoBack}></CustomButton>
            <CustomButton content="확인"></CustomButton>
         </div>
      </Wrapper>
   )
}

export default ArrangeMeeting;