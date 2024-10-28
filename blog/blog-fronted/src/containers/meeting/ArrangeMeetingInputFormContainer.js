import React, { useState } from 'react';
import ArrangeMeetingInputForm from '../../components/meetings/ArrangeMeetingInputForm';
import { useDispatch } from 'react-redux';
import { searchUsername } from '../../modules/meetings';

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

   return (
      <ArrangeMeetingInputForm 
         keyword={keyword} onChange={onChange} 
         onSubmit={onSubmit}
      />
   )
}

export default ArrangeMeetingFormContainer;