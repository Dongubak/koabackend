import client from './client';

const apiURL = process.env.REACT_APP_API_URL;

export const writePost = ({ title, body, user_id, subject }) =>
  client.post(`${apiURL}/api/posts`, { title, body, user_id, subject });

export const readPost = id => client.get(`${apiURL}/api/posts/${id}`);

export const listPosts = ({page, username}) => {
  return client.get(`${apiURL}/api/posts?page=${page}`, {
    params: { username },
  })
}

export const updatePost = ({id, title, body}) => {
  const {token} = JSON.parse(localStorage.getItem('user')).user; // localStorage에서 토큰 가져오기
  console.log(token);
  return client.patch(`${apiURL}/api/posts/${id}`, 
    { title, body },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export const removePost = ({id, navigate}) => {
  const {token} = JSON.parse(localStorage.getItem('user')).user; // localStorage에서 토큰 가져오기
  console.log('remove post');
  console.log(id);
  return client.delete(`${apiURL}/api/posts/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
};