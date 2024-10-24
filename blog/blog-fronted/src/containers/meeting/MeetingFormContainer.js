import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initMeetings, listGroupTimeTable } from '../../modules/meetings';
import MeetingForm from '../../components/meetings/MeetingForm';

const MeetingFormContainer = () => {
   const dispatch = useDispatch();
   
   const [meetings, setMeetings] = useState([]);
   const { groups } = useSelector((state) => state.meetings);
   const user = useSelector((state) => state.user);

   useEffect(() => {
      if(user.user) {
         const {id: user_id} = user.user.user;
         dispatch(initMeetings(user_id));   
      }
      console.log(groups);
      
   }, [dispatch]);

   const onClick = (group_id) => {
      dispatch(listGroupTimeTable(group_id));
   }

   return (
      <MeetingForm groups={groups} onClick={onClick}></MeetingForm>
   )
};

export default MeetingFormContainer;