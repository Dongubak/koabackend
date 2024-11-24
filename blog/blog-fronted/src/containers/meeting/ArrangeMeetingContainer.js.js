import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ArrangeMeeting from '../../components/meetings/ArrangeMeeting';
import { useDispatch, useSelector } from 'react-redux';
import { updateMeetingGroup, uploadMeetingGroup } from '../../modules/meetings';

const ArrangeMeetingContainer = () => {
   const navigator = useNavigate();
   const dispatch = useDispatch();
   const [groupName, setGroupName] = useState('');

   const onGoBack = () => {
      navigator('/meeting');
   }
   
   const user = useSelector((state) => state.user);
   const meetings = useSelector((state) => state.meetings);
   const loading = useSelector((state) => state.loading['meetings/UPLOAD_MEETING_GROUP']);

   // const { uid, groupName, cart } = ctx.query;

   const onCreate = () => {
      if(groupName === '') {
         alert('미팅 그룹의 이름을 입력하세요');
         return;
      }

      if(user && meetings) {
         if(meetings.cart.length === 0) {
            alert('그룹원을 추가해주세요');
            return;
         }
         const req = {
            uid: user.user.user.id,
            groupName: groupName,
            cart: meetings.cart
         }
         if(meetings.updateFlag) {
            req['group_id'] = meetings.group_id;
            dispatch(updateMeetingGroup(req));
         } else {
            dispatch(uploadMeetingGroup(req));
         }
      }
   }

   const onChange = (e) => {
      setGroupName(e.target.value);
   }

   useEffect(() => {
      if (!loading && meetings.success) {
         navigator('/meeting');
      }
   }, [loading, meetings.success, navigator]);

   useEffect(() => {
      console.log(meetings.groupName);
      setGroupName(meetings.groupName);
   }, []);


   return (
      <ArrangeMeeting
         onGoBack={onGoBack} onCreate={onCreate} onChange={onChange} groupName={groupName}
      ></ArrangeMeeting>
   )
}

export default ArrangeMeetingContainer;