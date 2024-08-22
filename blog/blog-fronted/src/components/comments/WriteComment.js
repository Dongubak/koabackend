import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import WriteCommentActionButtons from './WriteCommentActionButtons';

const WriteCommentBlock = styled(Responsive)`
  margin-top: 2rem;
  padding-top: 1rem;
  border-radius: 8px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
  resize: none;

  &:focus {
    outline: none;
    border-color: #8e44ad;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const WriteComment = ({ onChange, text, onPublish, user }) => {
  return (
    <WriteCommentBlock>
      <TextArea
        placeholder="Write your comment here..."
        value={text}
        onChange={onChange}
        disabled={user ? false : true}
      />
      <ButtonWrapper>
        <WriteCommentActionButtons onPublish={onPublish} user={user}/>
      </ButtonWrapper>
    </WriteCommentBlock>
  );
};

export default WriteComment;