import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';

const SidebarWrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  background: #f8f9fa; /* 밝은 회색 배경 */
  border-right: 1px solid #dee2e6; /* 오른쪽 테두리만 적용 */
  position: fixed; /* 사이드바를 고정 */
  top: 4rem; /* 헤더 아래에 위치 */
  height: calc(100% - 4rem); /* 전체 높이에서 헤더 높이를 뺀 만큼 차지 */
  padding: 1rem;
  box-shadow: 2px 0px 8px rgba(0, 0, 0, 0.1); /* 사이드바에 그림자 추가 */
  z-index: 1000;
`;

const LinkItem = styled.div`
  width: 100%;
  border-radius: 4px; /* 모서리를 둥글게 */
  margin-bottom: 0.75rem; /* 항목 간 간격 */
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: #343a40; /* 어두운 회색 글자 */
  background: #ffffff; /* 흰색 배경 */
  text-align: center;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #e9ecef; /* 마우스 오버 시 배경 색상 */
    transform: translateY(-2px); /* 살짝 위로 올라가는 애니메이션 효과 */
  }
`;

const Sidebar = ({onGoHome, onGoCourse, onGoMeeting, onGoSearchFood}) => {
  return (
    <Responsive style={{ display: 'flex' }}>
      <SidebarWrapper>
        <LinkItem onClick={onGoHome}>홈</LinkItem>
        <LinkItem onClick={onGoCourse}>시간표</LinkItem>
        <LinkItem onClick={onGoMeeting}>미팅</LinkItem>
        <LinkItem onClick={onGoSearchFood}>개발 예정</LinkItem>
      </SidebarWrapper>
      {/* 여기에 다른 콘텐츠를 추가할 수 있습니다 */}
    </Responsive>
  );
};

export default Sidebar;