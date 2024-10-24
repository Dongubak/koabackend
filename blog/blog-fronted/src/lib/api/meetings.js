import client from './client';

const apiURL = process.env.REACT_APP_API_URL;

export const initMeetings = (user_id) => { 
   console.log(user_id);
  return client.get(
   `${apiURL}/api/meeting`,
   {
      params: {
         user_id,
      }
   }
   );
}


export const listGroupTimeTable = (group_id) => {
   console.log(group_id);
   return client.get(
      `${apiURL}/api/meeting/listGroupTimeTable`,
      {
         params: {
            group_id,
         }
      }
      );
}