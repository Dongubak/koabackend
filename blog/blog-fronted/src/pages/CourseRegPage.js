import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import TimeTableContainer from '../containers/courses/TimeTableContainer';
import CourseFormContainer from '../containers/courses/CourseFormContainer';
import CourseListContainer from '../containers/courses/CourseListContainer';
import PaginationContainer from '../containers/courses/PagenationContainer';

const CourseRegPage = () => {

   return(
      <>
         <HeaderContainer></HeaderContainer>
         <TimeTableContainer></TimeTableContainer>
         <CourseFormContainer></CourseFormContainer>
         <CourseListContainer></CourseListContainer>
         <PaginationContainer></PaginationContainer>
      </>
   )
}

export default CourseRegPage;