import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import { Link } from 'react-router-dom';

const CommentsListBlock = styled(Responsive)`
  margin-top: 3rem;
`;


const CommentItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
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
`;

const CommentItem = ({ comment }) => {
  const { id, post_id, user_id, text, created_date } = comment;
  return (
    <CommentItemBlock>
      {/* <h2>
        <Link to={`/${post.username}/${id}`}>{title}</Link>
      </h2> */}
      <SubInfo
        username={user_id}
        publishedDate={new Date(created_date)}
      />
      <p>{text}</p>
    </CommentItemBlock>
  );
};

const CommentsList = ({comments, loading, error}) => {
   // 에러 발생 시
   if (error) {
      return <CommentsListBlock>에러가 발생했습니다.</CommentsListBlock>;
   }

  return (
    <CommentsListBlock>
      {!loading && comments && (
        <div>
          {comments.map(comment => (
            <CommentItem comment={comment} key={comment.id} />
          ))}
        </div>
      )}
    </CommentsListBlock>
  );
};

export default CommentsList;