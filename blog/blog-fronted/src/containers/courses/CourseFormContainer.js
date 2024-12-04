import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {listCourses, unloadCourses} from '../../modules/courses';
import {useNavigate, useSearchParams} from 'react-router-dom';

import CourseForm from '../../components/courses/CourseForm';
import { loadCart, saveCart, unloadCart } from '../../modules/cart';

const CourseFormContainer = () => {
   const [keyword, setKeyword] = useState('');
   const dispatch = useDispatch();
   const navigator = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams();
   const [searchByCourse, setSearchByCourse] = useState(false);
   const saveLoading = useSelector((state) => state.loading['cart/SAVE_CART']);
   const loadLoading = useSelector((state) => state.loading['cart/LOAD_CART']);
   const listLoading = useSelector((state) => state.loading['cart/LIST_COURSES']);

   const handleToggle = () => {
      setSearchByCourse((state) => !state);
   };

   const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
         e.preventDefault();
         onSearch(e);
      }
   };

   const isFirstRun = useRef(true);  // 마운트 시 최초 실행을 막기 위한 useRef

   const page = searchParams.get('page') || 1;

   const user = useSelector((state) => state.user);
   const cart = useSelector((state) => state.cart);

   const onChange = (e) => {
      setKeyword(e.target.value);
   }

   const onSearch = (e) => {
      if(!listLoading) {
         e.preventDefault();
         // console.log(keyword);
         setSearchParams({page: 1});
         dispatch(listCourses({
            professor: !searchByCourse ? keyword : '',
            course_name: searchByCourse ? keyword: '',
            page
         }));
      }
   }

   const onSave = (e) => {
      e.preventDefault();
      if(user.user) {
         const {id: user_id} = user.user.user;
         const course_ids = cart.cart.map((e) => e.id);
         // console.log(course_ids);

         dispatch(saveCart(user_id, course_ids));
      } else {
         alert('로그인 후 이용해주세요');
         navigator('/login');
      }
   }

   useEffect(() => {
      if (isFirstRun.current) {
         isFirstRun.current = false;
         return;
      }

      dispatch(listCourses({
         professor: searchByCourse ? '' : keyword,
         course_name: searchByCourse ? keyword : '',
         page
      }));
   }, [page]);

   useEffect(() => {
      // dispatch(loadCart());
      if(!user.user) {
         dispatch(unloadCart());
      } else if(!loadLoading){
         const {id} = user.user.user;
         dispatch(loadCart({user_id : id}));   
      }
   }, [dispatch, user]);


   return(
      <CourseForm
      keyword={keyword} 
      onChange={onChange}
      onSearch={onSearch}
      onSave={onSave}
      searchByCourse={searchByCourse}
      handleToggle={handleToggle}
      handleKeyPress={handleKeyPress}
      />
   )
}

export default CourseFormContainer;