import React, { useState } from 'react';
import styled from 'styled-components';

const GroupListItemWrapper = styled.div`
   color: ${(props) => (props.$isSelected ? 'red' : 'black')};
   cursor: pointer;
`;

const GroupListWrapper = styled.div`
`;

const GroupListItem = ({ group, onClick, isSelected }) => {
   return (
      <GroupListItemWrapper
         onClick={() => onClick(group.group_id, group.group_name)}
         $isSelected={isSelected} // $로 시작하는 prop을 사용하여 styled-components 내부에서만 사용
      >
         <p>{group.group_name}</p>
      </GroupListItemWrapper>
   );
};

const GroupList = ({ groups, onClick, selectedGroupId, setSelectedGroupId,
   selectedGroupName, setSelectedGroupName
 }) => {
   const handleClick = (groupId, groupName) => {
      setSelectedGroupId(groupId);
      setSelectedGroupName(groupName);

      onClick(groupId);
   };

   if (groups.length === 0) {
      return <div>그룹이 없음</div>;
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