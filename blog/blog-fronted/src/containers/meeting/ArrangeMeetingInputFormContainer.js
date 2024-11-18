import React, { useEffect, useState } from 'react';
import ArrangeMeetingInputForm from '../../components/meetings/ArrangeMeetingInputForm';
import { useDispatch } from 'react-redux';
import { searchUsername, unloadSearchUsername } from '../../modules/meetings';

const ArrangeMeetingFormContainer = () => {
   const [keyword, setKeyword] = useState('');
   const dispatch = useDispatch();

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
            onSubmit={onSubmit}
         />
      </>
   )
}

export default ArrangeMeetingFormContainer;