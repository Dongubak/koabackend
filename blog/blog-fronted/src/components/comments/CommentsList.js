import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import CommentActionButtons from './CommentActionButtons';

const CommentsListBlock = styled(Responsive)`
  /* margin-top: 1rem; */
`;

const CommentItemBlock = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;

  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }

  textarea {
    width: 100%;
    height: 100px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid ${palette.gray[4]};
    border-radius: 4px;
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`;

const CommentItem = ({ comment, onRemove, onEdit, user }) => {
  const { id, user_id, text, created_date, username } = comment;
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const onEditComment = () => {
    setIsEditing(true);
  }

  const onSaveComment = () => {
    onEdit(id, editedText);
    setIsEditing(false);
  }

  const onCancelEdit = () => {
    setIsEditing(false);
    setEditedText(text);
  }

  const onRemoveComment = () => {
    onRemove(id);
  }

  return (
    <CommentItemBlock>
      <SubInfo
        username={username}
        publishedDate={new Date(created_date)}
      />
      {
        isEditing ? (
          <>
            <textarea 
              value={editedText} 
              onChange={(e) => setEditedText(e.target.value)}
            />
            <div className="button-group">
              <Button onClick={onSaveComment} cyan>저장</Button>
              <Button onClick={onCancelEdit}>닫기</Button>
            </div>
          </>
        ) : (
          <p>{text}</p>
        )
      }
      {
        (user && user.user.id === user_id) && !isEditing && (
          <CommentActionButtons 
            onEditComment={onEditComment} 
            onRemoveComment={onRemoveComment}
          />
        )
      }
    </CommentItemBlock>
  );
};

const CommentsList = ({ comments, loading, error, onRemove, onEdit, user }) => {
  if (error) {
    return <CommentsListBlock>에러가 발생했습니다.</CommentsListBlock>;
  }

  return (
    <CommentsListBlock>
      {!loading && comments && (
        <div>
          {comments.map(comment => (
            <CommentItem 
              comment={comment} 
              key={comment.id} 
              onRemove={onRemove} 
              onEdit={onEdit} 
              user={user}
            />
          ))}
        </div>
      )}
    </CommentsListBlock>
  );
};

export default CommentsList;