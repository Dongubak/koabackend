import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import GroupList from '../../components/meetings/GroupList';

// Wrapper 스타일
// Wrapper 스타일
const Wrapper = styled(Responsive)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 4rem;
  padding: 1.5rem;
  border: 1px solid #dee2e6; /* 사이드바와 동일한 테두리 색상 */
  background: #f8f9fa; /* 밝은 회색 배경 */
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
  border-radius: 8px;
  width: 400px;

  /* 반응형 스타일: 너비가 480px 이하일 경우 */
  @media (max-width: 480px) {
    width: calc(100% - 2rem); /* 양쪽에 1rem 마진 추가 */
    margin: 4rem auto; /* 중앙 정렬 */
  }
`;

// 제목 스타일
const Title = styled.h2`
  font-size: 1.5rem;
  color: #343a40; /* 어두운 회색 */
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: bold;
`;

// 버튼 스타일 (회전 효과 추가)
const Button = styled.button`
  display: inline-block;
  width: 100%;
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: #343a40; /* 어두운 회색 */
  background: #ffffff; /* 흰색 배경 */
  border: 1px solid #dee2e6; /* 연한 회색 테두리 */
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #e9ecef; /* 마우스 오버 시 더 짙은 회색 배경 */
    transform: translateY(-2px) rotate(5deg); /* 위로 올라가며 약간 회전 */
  }

  &:active {
    background: #d9d9d9; /* 클릭 시 더 짙은 배경 */
    transform: rotate(-5deg); /* 클릭 시 반대 방향으로 회전 */
  }

  &:disabled {
    background: #f8f9fa; /* 비활성화된 버튼은 연한 배경 */
    color: #adb5bd; /* 연한 회색 글자 */
    border-color: #e9ecef;
    cursor: not-allowed;
  }
`;

// 버튼 컨테이너
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.5rem;
`;

// GroupListWrapper 스타일
const GroupListWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

const MeetingForm = ({
  onGoCreatePage,
  createBlur,
  onEdit,
  onDelete,
  blur,
  groups,
  onClick,
  selectedGroupId,
  setSelectedGroupId,
  selectedGroupName,
  setSelectedGroupName,
}) => {
  return (
    <Wrapper>
      <Title>미팅 일정 관리</Title>
      <ButtonContainer>
        <Button onClick={onGoCreatePage} disabled={createBlur}>
          일정 생성하기
        </Button>
        <Button onClick={onEdit} disabled={blur}>
          일정 수정하기
        </Button>
        <Button onClick={onDelete} disabled={blur}>
          일정 삭제하기
        </Button>
      </ButtonContainer>
      <GroupListWrapper>
        <GroupList
          groups={groups}
          onClick={onClick}
          selectedGroupId={selectedGroupId}
          setSelectedGroupId={setSelectedGroupId}
          selectedGroupName={selectedGroupName}
          setSelectedGroupName={setSelectedGroupName}
        />
      </GroupListWrapper>
    </Wrapper>
  );
};

export default MeetingForm;