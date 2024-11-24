import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseList from '../../components/courses/CourseList';
import { insertCourse } from '../../modules/cart';


const CourseListContainer = () => {
  const dispatch = useDispatch();

  const courses = useSelector(state => state.courses.courses);
  const error = useSelector(state => state.courses.error);
  const loading = useSelector(state => state.loading['courses/LIST_COURSES']);


  const onInsertCourse = (course) => {
    if(!loading) {
      dispatch(insertCourse(course));
    }
  }

  const onDeleteCourse = (course) => {
   // dispatch(deleteCourse(course));
  }

  return (
    <CourseList
      loading={loading}
      error={error}
      courses={courses}
      onInsertCourse={onInsertCourse}
      onDeleteCourse={onDeleteCourse}
    />
  );
};

export default CourseListContainer;