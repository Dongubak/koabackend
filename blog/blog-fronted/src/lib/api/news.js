import client from './client';

// 음식 검색 API 호출
export const getNews = async () => {
  const response = await client.get(`https://newsdata.io/api/1/news?apikey=pub_61280be18b1f0d6167dbf810fe335343ff91b&country=kr`);
  // 유니코드 데이터 디코딩 후 반환
  return response;
};
