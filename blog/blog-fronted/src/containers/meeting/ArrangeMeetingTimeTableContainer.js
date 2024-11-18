import React from 'react';
import ArrangeMeetingTimeTable from '../../components/meetings/ArrangeMeetingTimeTable';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem } from '../../modules/meetings';

const ArrangeMeetingTimeTableContainer = () => {
   const { cart } = useSelector((state) => state.meetings);
   const dispatch = useDispatch();
   
   const onDelete = (username) => {
      dispatch(deleteCartItem(username));
   }

   return (
      <ArrangeMeetingTimeTable cart={cart} onDelete={onDelete}></ArrangeMeetingTimeTable>
   )
}

export default ArrangeMeetingTimeTableContainer;