import client from './client';

export const searchFood = (keyword) => {
   console.log(keyword);
  return client.get(`http://203.234.48.76:43306/recommend`, {
    params: {word : keyword },
  })
}