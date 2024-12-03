import client from './client';

// 유니코드 디코딩 함수
const unicodeToUtf8 = (str) => {
  return str.replace(/\\u[\dA-F]{4}/gi, (match) => {
    return String.fromCharCode(parseInt(match.replace("\\u", ""), 16));
  });
};

// 응답 데이터 디코딩 처리 함수
const parseUnicodeResponse = (data) => {
  if (typeof data === 'string') {
    // 유니코드 JSON 문자열을 파싱
    return JSON.parse(unicodeToUtf8(data));
  }
  return data; // 데이터가 이미 JSON 객체라면 그대로 반환
};

// 음식 검색 API 호출
export const searchFood = async (keyword) => {
  console.log(keyword);
  const response = await client.get(`http://203.234.48.76:43306/recommend`, {
    params: { word: keyword },
  });

  // 유니코드 데이터 디코딩 후 반환
  return parseUnicodeResponse(response.data);
};
