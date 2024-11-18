import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
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
   onGoCreatePage, createBlur, selectedGroupId, setSelectedGroupId, onDelete, onEdit,
   selectedGroupName, setSelectedGroupName,
}) => {

   return (
      <Wrapper>
         <h2>Developing Meeting Form</h2>
         <div>
            <Button content="create" blur={createBlur} onClick={onGoCreatePage} />
            <GroupList groups={groups} onClick={onClick} selectedGroupId={selectedGroupId} setSelectedGroupId={setSelectedGroupId} 
               selectedGroupName={selectedGroupName} setSelectedGroupName={setSelectedGroupName}
            />
            <div>
               <Button content="edit" blur={blur} onClick={onEdit} />
               <Button content="delete" blur={blur} onClick={onDelete} />
            </div>
         </div>
      </Wrapper>
   );
}

export default MeetingForm;