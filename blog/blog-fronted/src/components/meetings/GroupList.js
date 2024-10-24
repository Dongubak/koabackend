import React from 'react';
import styled from 'styled-components';

const GroupListItemWrapper = styled.div`
`
const GroupListWrapper = styled.div`
`


const GroupListItem = ({group, onClick}) => {
   return (
      <GroupListItemWrapper onClick={() => {
         onClick(group.group_id);
      }}>
         <p>{group.group_name}</p>
      </GroupListItemWrapper>
   )
}

const GroupList = ({groups, onClick}) => {
   if(!groups) {
      return (
         <div>그룹이 없음</div>
      )
   }
   return (
      <GroupListWrapper>
         {
            groups.map((group) => (
               <GroupListItem group={group} onClick={onClick}/>
            ))
         }
      </GroupListWrapper>
   )
}

export default GroupList;