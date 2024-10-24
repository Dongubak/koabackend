import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import MeetingsList from './MeetingsList';
import GroupList from '../../components/meetings/GroupList';

const Wrapper = styled(Responsive)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  flex-direction: column;
`;



const MeetingForm = ({onSubmit = () => {}, groups = [],
   onClick
}) => {
   if(groups) {
      groups.forEach((e) => {
         console.log(e);
      })
   }
   return (
      <Wrapper>
         <h2>developing Meeting Form</h2>
         <div>
            {/* <MeetingsList meetings={meetings}></MeetingsList> */}
            <GroupList groups={groups} onClick={onClick}/>
            <div>
               <button>create</button>
               <button>edit</button>
               <button>remove</button>
               <button>save</button>
            </div>
         </div>         
      </Wrapper>      
   )
}

export default MeetingForm;