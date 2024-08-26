import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const WriteActionButtonsWrapper = styled.div`
  height: 4rem;
`

const WriteActionButtonsBlock = styled.div`
  margin-bottom: 5rem;
  button + button {
    margin-left: 0.5rem;
  }
  display: flex;
  width: 100%;
  
`;

/* TagBox에서 사용하는 버튼과 일치하는 높이로 설정 후 서로 간의 여백 지정 */
const StyledButton = styled(Button)`
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const WriteActionButtons = ({ onCancel, onPublish, isEdit }) => {
  return (
    <WriteActionButtonsWrapper>
      <WriteActionButtonsBlock>
        <StyledButton cyan onClick={onPublish}>
          포스트 {isEdit ? '수정' : '등록'}
        </StyledButton>
        <StyledButton onClick={onCancel}>취소</StyledButton>
      </WriteActionButtonsBlock>
    </WriteActionButtonsWrapper>
    
  );
};

export default WriteActionButtons;