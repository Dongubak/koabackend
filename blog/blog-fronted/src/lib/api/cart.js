import client from './client';

const apiURL = process.env.REACT_APP_API_URL;

export const loadCart = ({ user_id }) => {
   const { token } = JSON.parse(localStorage.getItem('user')).user; // localStorage에서 토큰 가져오기

   return client.get(
      `${apiURL}/api/cart/${user_id}`, // 기본 URL
      {
         headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 포함
         },
      }
   );
};

export const saveCart = ({ user_id, course_ids }) => {
   const { token } = JSON.parse(localStorage.getItem('user')).user; // localStorage에서 토큰 가져오기

   return client.post(
      `${apiURL}/api/cart/save`, // 기본 URL
      {  
         course_ids,
         user_id,
      },
      {
         headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 포함
         },
      }
   );
}