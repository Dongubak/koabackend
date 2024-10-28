import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initMeetings, listGroupTimeTable, unloadGroupTimeTable } from '../../modules/meetings';
import MeetingForm from '../../components/meetings/MeetingForm';
import { useNavigate } from 'react-router';

const MeetingFormContainer = () => {
   const dispatch = useDispatch();
   const navigator = useNavigate();
   
   const [meetings, setMeetings] = useState([]);
   const [blur, setBlur] = useState(true);
   const { groups } = useSelector((state) => state.meetings);
   const { groupsTimetable } = useSelector((state) => state.meetings);
   const { isOwner } = useSelector((state) => state.meetings);
   
   const user = useSelector((state) => state.user);

   useEffect(() => {
      setBlur(!isOwner);
   }, [isOwner]);

   useEffect(() => {
      if(user.user) {
         const {id: user_id} = user.user.user;
         dispatch(initMeetings(user_id));   
      }
   }, [dispatch]);

   const onClick = (group_id) => {
      dispatch(listGroupTimeTable({group_id, user_id: user.user.user.id}));
   }

   const onGoCreatePage = () => {
      navigator('/meeting/create');
   }

   return (
      <>
         <MeetingForm groups={groups} blur={blur} onClick={onClick}
         onGoCreatePage={onGoCreatePage}
         ></MeetingForm>
         {isOwner ? "owner" : "not owner"}
      </>
      
   )
};

export default MeetingFormContainer;