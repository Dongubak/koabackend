import client from './client';

// 로그인
export const login = ({ username, password }) =>
  client.post('http://localhost:4000/api/auths/login', { username, password });

// 회원가입
export const register = ({ username, password }) =>
  client.post('http://localhost:4000/api/auths/register', { username, password });

// 로그인 상태 확인

export const check = () => {
   const {token} = JSON.parse(localStorage.getItem('user')).user; // localStorage에서 토큰 가져오기

  return client.get('http://localhost:4000/api/auths/check', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// export const check = () => client.get('http://localhost:4000/api/auths/check');

// 로그아웃
export const logout = () => client.post('http://localhost:4000/api/auths/logout');