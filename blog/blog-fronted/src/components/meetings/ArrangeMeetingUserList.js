import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

// Wrapper 스타일
const Wrapper = styled(Responsive)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #dee2e6; /* 연한 회색 테두리 */
  border-radius: 8px; /* 둥근 모서리 */
  background-color: #f8f9fa; /* 밝은 회색 배경 */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
  max-width: 400px; /* 리스트 너비 제한 */
  width: 100%;
`;

// 리스트 아이템 스타일
const UserListItemWrapper = styled.div`
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: normal;
  color: #495057; /* 어두운 회색 글자 */
  border: 1px solid #ced4da; /* 연한 회색 테두리 */
  border-radius: 4px; /* 둥근 모서리 */
  background-color: #ffffff; /* 흰색 배경 */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: #e9ecef; /* 마우스 오버 시 배경 */
    transform: translateY(-2px); /* 살짝 위로 올라감 */
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  }

  &:active {
    transform: translateY(0); /* 클릭 시 원래 위치로 복귀 */
    box-shadow: none; /* 클릭 시 그림자 제거 */
  }
`;

const ArrangeMeetingUserListItem = ({ userData, onClick }) => {
  return (
    <UserListItemWrapper
      onClick={() => {
        onClick(userData);
        console.log(userData);
      }}
    >
      {userData.username}
    </UserListItemWrapper>
  );
};

// 유저 리스트 스타일
const ArrangeMeetingUserList = ({ userDatas, onClick }) => {
  console.log(userDatas);

  if (userDatas.length === 0) {
    return (
      <Wrapper>
        <p style={{ textAlign: 'center', color: '#868e96', fontSize: '0.9rem' }}>
          검색된 사용자가 없습니다.
        </p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {userDatas.map((userData) => (
        <ArrangeMeetingUserListItem
          key={userData.id} /* 리스트의 고유 키 설정 */
          userData={userData}
          onClick={onClick}
        />
      ))}
    </Wrapper>
  );
};

export default ArrangeMeetingUserList;