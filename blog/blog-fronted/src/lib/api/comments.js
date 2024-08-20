import { GiConsoleController } from 'react-icons/gi';
import client from './client';

const apiURL = process.env.REACT_APP_API_URL;

// 댓글 작성
export const writeComments = ({ post_id, user_id, text }) => {
   const { token } = JSON.parse(localStorage.getItem('user')).user; // localStorage에서 토큰 가져오기
   return client.post(
      `${apiURL}/api/comments`,
      { post_id, user_id, text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
};

// 댓글 목록 조회
export const listComments = ({ post_id, page, per_page }) => {
  return client.get(
    `${apiURL}/api/comments?post_id=${post_id}&page=${page}&per_page=${per_page}`
  );
};

// 댓글 수정
export const updateComments = ({ comment_id, text }) => {
  const { token } = JSON.parse(localStorage.getItem('user')).user; // localStorage에서 토큰 가져오기
  console.log(token);

  return client.patch(
    `${apiURL}/api/comments/${comment_id}`, 
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// 댓글 삭제
export const removeComment = (comment_id) => {
  const { token } = JSON.parse(localStorage.getItem('user')).user; // localStorage에서 토큰 가져오기
  return client.delete(
    `${apiURL}/api/comments/${comment_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};