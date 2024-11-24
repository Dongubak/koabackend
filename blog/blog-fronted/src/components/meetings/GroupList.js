import React from 'react';
import styled from 'styled-components';

// 그룹 리스트 아이템 스타일
const GroupListItemWrapper = styled.div`
  color: ${(props) => (props.$isSelected ? '#212529' : '#495057')};
  font-weight: ${(props) => (props.$isSelected ? 'bold' : 'normal')};
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  margin: 0.3rem 0;
  font-size: 0.9rem; /* 폰트 크기 줄임 */
  border: ${(props) => (props.$isSelected ? '2px solid #212529' : '1px solid #dee2e6')};
  border-radius: 4px;
  background-color: ${(props) => (props.$isSelected ? '#f8f9fa' : '#fff')};
  transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: #f1f3f5; /* 마우스 오버 시 연한 회색 */
    transform: translateY(-3px); /* 살짝 위로 올라가는 효과 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
  }

  &:active {
    transform: translateY(0px); /* 클릭 시 다시 원래 위치로 */
    box-shadow: none; /* 클릭 시 그림자 제거 */
  }
`;

// 그룹 리스트 전체를 감싸는 Wrapper 스타일
const GroupListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 350px; /* 크기 줄임 */
  margin: 1rem 0;
  padding: 0.5rem; /* 내부 여백 줄임 */
  border: 1px solid #dee2e6;
  border-radius: 5px;
  background-color: #ffffff;
`;

const GroupListItem = ({ group, onClick, isSelected }) => {
  return (
    <GroupListItemWrapper
      onClick={() => onClick(group.group_id, group.group_name)}
      $isSelected={isSelected} // $로 시작하는 prop은 styled-components 내부에서만 사용
    >
      {group.group_name}
    </GroupListItemWrapper>
  );
};

const GroupList = ({
  groups,
  onClick,
  selectedGroupId,
  setSelectedGroupId,
  selectedGroupName,
  setSelectedGroupName,
}) => {
  const handleClick = (groupId, groupName) => {
    setSelectedGroupId(groupId);
    setSelectedGroupName(groupName);

    onClick(groupId);
  };

  if (groups.length === 0) {
    return <div style={{ color: '#868e96', fontSize: '0.9rem' }}>그룹이 없음</div>;
  }

  return (
    <GroupListWrapper>
      {groups.map((group) => (
        <GroupListItem
          key={group.group_id}
          group={group}
          onClick={handleClick}
          isSelected={group.group_id === selectedGroupId}
        />
      ))}
    </GroupListWrapper>
  );
};

export default GroupList;