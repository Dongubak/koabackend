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
   const deleteLoading = useSelector((state) => state.loading['meetings/DELETE_MEETING_GROUP']); // deleteMeetingGroup 로딩 상태
   const initLoading = useSelector((state) => state.loading['meetings/INIT_MEETINGS']);

   useEffect(() => {
      setBlur(!isOwner);
   }, [isOwner]);

   // useEffect(() => {
   //    if (user.user) {
   //       const { id: user_id } = user.user.user;
   //       dispatch(initMeetings(user_id));
   //       setCreateBlur(false);
   //    } else {
   //       setCreateBlur(true);
   //    }
   // }, [dispatch, user.user]);

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
   useEffect(() => {
      if (!initLoading && user.user) {
         // 로딩이 완료된 후에 초기화하거나 필요한 동작 수행
         dispatch(initMeetings(user.user.user.id));
         setSelectedGroupId(null); // 선택된 그룹 초기화
         setCreateBlur(false);
      }
   }, [dispatch, user.user]);

   // useEffect(() => {
   //    if (!deleteLoading && !initLoading) {
   //       // 로딩이 완료된 후에 초기화하거나 필요한 동작 수행
   //       dispatch(initMeetings(user.user.user.id));
   //       setSelectedGroupId(null); // 선택된 그룹 초기화
   //    }
   // }, [dispatch, user.user, deleteLoading]);

   return (
      <>
         {deleteLoading || initLoading ? (
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
      </>
   );
};

export default MeetingFormContainer;