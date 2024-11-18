import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMeetingGroup, initCart, initMeetings, listGroupTimeTable, unloadGroupTimeTable } from '../../modules/meetings';
import MeetingForm from '../../components/meetings/MeetingForm';
import { useNavigate } from 'react-router';

const MeetingFormContainer = () => {
   const dispatch = useDispatch();
   const navigator = useNavigate();
   const [selectedGroupId, setSelectedGroupId] = useState(null);
   const [selectedGroupName, setSelectedGroupName] = useState(null);
   const [meetings, setMeetings] = useState([]);
   const [blur, setBlur] = useState(true);
   const [createBlur, setCreateBlur] = useState(true);
   
   const { groups, groupsTimetable, isOwner } = useSelector((state) => state.meetings);
   const user = useSelector((state) => state.user);
   const loading = useSelector((state) => state.loading['meetings/DELETE_MEETING_GROUP']); // deleteMeetingGroup 로딩 상태

   useEffect(() => {
      setBlur(!isOwner);
   }, [isOwner]);

   useEffect(() => {
      if (user.user) {
         const { id: user_id } = user.user.user;
         dispatch(initMeetings(user_id));
         setCreateBlur(false);
      } else {
         setCreateBlur(true);
      }
   }, [dispatch, user.user]);

   useEffect(() => {
      return () => {
         dispatch(unloadGroupTimeTable());
      };
   }, [dispatch]);

   const onClick = (group_id) => {
      dispatch(listGroupTimeTable({ group_id, user_id: user.user.user.id }));
   };

   const onGoCreatePage = () => {
      navigator('/meeting/create');
   };

   const onDelete = () => {
      dispatch(deleteMeetingGroup(selectedGroupId));
   };

   const onEdit = () => {
      const initData = {
         cart: groupsTimetable,
         groupName: selectedGroupName,
         group_id: selectedGroupId,
      }

      console.log(initData);
      dispatch(initCart(initData));
      navigator('/meeting/create');
   }

// }),
// [INIT_CART_SUCCESS]: (state, { payload: initData }) => ({
//   ...state,
//   cart: initData.cart,
//   groupName: initData.groupName,
// })


   // deleteMeetingGroup 로딩 상태가 변경될 때마다 확인하여 완료 시 리렌더링
   useEffect(() => {
      if (!loading) {
         // 로딩이 완료된 후에 초기화하거나 필요한 동작 수행
         dispatch(initMeetings(user.user.user.id)); // 삭제 후 다시 그룹 목록 로드
         setSelectedGroupId(null); // 선택된 그룹 초기화
      }
   }, [loading, dispatch, user.user]);

   return (
      <>
         {loading ? (
            <p>Loading...</p>
         ) : (
            <MeetingForm
               groups={groups}
               blur={blur}
               onClick={onClick}
               onDelete={onDelete}
               onGoCreatePage={onGoCreatePage}
               createBlur={createBlur}
               selectedGroupId={selectedGroupId}
               setSelectedGroupId={setSelectedGroupId}
               selectedGroupName={selectedGroupName}
               setSelectedGroupName={setSelectedGroupName}
               onEdit={onEdit}
            />
         )}
         {isOwner ? "owner" : "not owner"}
      </>
   );
};

export default MeetingFormContainer;