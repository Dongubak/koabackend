import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import MeetingsList from './MeetingsList';
import GroupList from '../../components/meetings/GroupList';

const Wrapper = styled(Responsive)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  flex-direction: column;
`;

const CustomButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

// 수정된 Button 컴포넌트
const Button = ({ blur, content, onClick }) => {
   return (
      <CustomButton disabled={blur} onClick={onClick}>
         {content}
      </CustomButton>
   );
}

const MeetingForm = ({ onSubmit = () => {}, groups = [], onClick, blur,
   onGoCreatePage
}) => {
   if(groups) {
      groups.forEach((e) => {
         console.log(e);
      });
   }

   return (
      <Wrapper>
         <h2>Developing Meeting Form</h2>
         <div>
            {/* <MeetingsList meetings={meetings}></MeetingsList> */}
            <Button content="create" onClick={onGoCreatePage} />
            <GroupList groups={groups} onClick={onClick} />
            <div>
               <Button content="edit" blur={blur} onClick={() => onSubmit('edit')} />
               <Button content="delete" blur={blur} onClick={() => onSubmit('delete')} />
               <Button content="save" blur={blur} onClick={() => onSubmit('save')} />
            </div>
         </div>         
      </Wrapper>      
   );
}

export default MeetingForm;