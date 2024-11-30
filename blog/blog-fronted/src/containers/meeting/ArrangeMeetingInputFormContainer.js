import React, { useEffect, useState } from 'react';
import ArrangeMeetingInputForm from '../../components/meetings/ArrangeMeetingInputForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, searchUsername, unloadSearchUsername } from '../../modules/meetings';

const ArrangeMeetingFormContainer = () => {
   const [keyword, setKeyword] = useState('');
   const dispatch = useDispatch();

   const { cart } = useSelector((state) => state.meetings);

   const onDelete = (username) => {
      dispatch(deleteCartItem(username));
   }

   const onChange = (e) => {
      setKeyword(e.target.value);
   }

   const onSubmit = (e) => {
      e.preventDefault();
      console.log(keyword);
      dispatch(searchUsername(keyword));

      setKeyword('');
   }

   useEffect(() => {

      return () => {
         dispatch(unloadSearchUsername());
      }
   }, []);

   return (
      <>
         <ArrangeMeetingInputForm 
            keyword={keyword} onChange={onChange} 
            onSubmit={onSubmit} cart={cart} onDelete={onDelete}
         />
      </>
   )
}

export default ArrangeMeetingFormContainer;