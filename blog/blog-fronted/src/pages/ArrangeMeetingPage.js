import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import ArrangeMeetingContainer from '../containers/meeting/ArrangeMeetingContainer.js';
import ArrangeMeetingTimeTableContainer from '../containers/meeting/ArrangeMeetingTimeTableContainer.js';
import ArrangeMeetingInputFormContainer from '../containers/meeting/ArrangeMeetingInputFormContainer.js'
import ArrangeMeetingUserListConatiner from '../containers/meeting/ArrangeMeetingUserListContainer.js';

const ArrangeMeetingPage = () => {
   return (
      <>
         <HeaderContainer></HeaderContainer>
         <ArrangeMeetingContainer></ArrangeMeetingContainer>
         <ArrangeMeetingInputFormContainer></ArrangeMeetingInputFormContainer>
         <ArrangeMeetingUserListConatiner></ArrangeMeetingUserListConatiner>
         <ArrangeMeetingTimeTableContainer></ArrangeMeetingTimeTableContainer>
      </>
   )
}

export default ArrangeMeetingPage;