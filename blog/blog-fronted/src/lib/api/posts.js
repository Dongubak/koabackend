import client from './client';

export const writePost = ({ title, body, user_id }) =>
  client.post('http://localhost:4000/api/posts', { title, body, user_id });

export const readPost = id => client.get(`http://localhost:4000/api/posts/${id}`);

export const listPosts = ({page, username}) => {
  return client.get(`http://localhost:4000/api/posts?page=${page}`, {
    params: { username },
  })
}

export const updatePost = ({id, title, body}) => {
  const {token} = JSON.parse(localStorage.getItem('user')).user; // localStorage에서 토큰 가져오기
  console.log(token);
  return client.patch(`http://localhost:4000/api/posts/${id}`, 
    { title, body },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export const removePost = id => {
  const {token} = JSON.parse(localStorage.getItem('user')).user; // localStorage에서 토큰 가져오기
  console.log(token);
  return client.delete(`http://localhost:4000/api/posts/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
};