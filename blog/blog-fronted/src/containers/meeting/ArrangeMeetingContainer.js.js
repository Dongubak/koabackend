import React from 'react';
import { useNavigate } from 'react-router';
import ArrangeMeeting from '../../components/meetings/ArrangeMeeting';

const ArrangeMeetingContainer = () => {
   const navigator = useNavigate();

   const onGoBack = () => {
      navigator('/meeting');
   }

   return (
      <ArrangeMeeting
         onGoBack={onGoBack}

      ></ArrangeMeeting>
   )
}

export default ArrangeMeetingContainer;