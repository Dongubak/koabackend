import client from './client';

// 음식 검색 API 호출
export const searchFood = async (keyword) => {
  console.log(keyword);
  const response = await client.get(`http://203.234.48.76:43306/recommend`, {
    params: { word: keyword },
  });

  // 유니코드 데이터 디코딩 후 반환
  return response;
};
