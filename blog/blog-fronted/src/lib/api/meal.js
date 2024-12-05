import client from './client';

export const getMeal = async () => {
  const response = await client.get(`http://203.234.48.76:43306/today`);

  return response;
};
