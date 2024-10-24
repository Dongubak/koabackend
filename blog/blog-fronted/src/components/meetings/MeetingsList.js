import React from 'react';

const MeetingsList = ({meetings}) => {
   if(meetings) {
      meetings.forEach((e) => {
         console.log(e);
      });
   }

   return (
      <>
         MeetingsList
      </>
   )
}

export default MeetingsList;