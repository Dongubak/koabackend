import client from './client';

const apiURL = process.env.REACT_APP_API_URL;

export const listCourses = ({professor, course_name, page}) => {
  //  console.log(professor, course_name, page);
   
  return client.get(`${apiURL}/api/courses?professor=${professor}&course_name=${course_name}&page=${page}`);
}