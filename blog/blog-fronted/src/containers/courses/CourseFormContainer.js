import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import {listCourses, unloadCourses} from '../../modules/courses';
import {useSearchParams} from 'react-router-dom';

import CourseForm from '../../components/courses/CourseForm';

const CourseFormContainer = () => {
   const [keyword, setKeyword] = useState('');
   const dispatch = useDispatch();
   const [searchParams, setSearchParams] = useSearchParams();
   const isFirstRun = useRef(true);  // 마운트 시 최초 실행을 막기 위한 useRef

   const page = searchParams.get('page') || 1;

   const onChange = (e) => {
      setKeyword(e.target.value);
   }

   const onSearch = () => {
      console.log(keyword);
      setSearchParams({page: 1});
      dispatch(listCourses({
         professor: keyword,
         course_name: '',
         page
      }));
   }

   useEffect(() => {
      if (isFirstRun.current) {
         isFirstRun.current = false;
         return;
      }

      dispatch(listCourses({
         professor: keyword,
         course_name: '',
         page
      }));
   }, [page]);

   useEffect(() => {
      return () => {
         dispatch(unloadCourses());
      }
   }, []);

   return(
      <CourseForm 
      keyword={keyword} 
      onChange={onChange}
      onSearch={onSearch}
      />
   )
}

export default CourseFormContainer;