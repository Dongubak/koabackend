import React from 'react';
import Pagination from '../../components/courses/Pagination';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const PaginationContainer = () => {
  // const { all, courses, loading } = useSelector(({ courses, loading }) => ({
  //   all: courses,
  //   courses: courses.courses,
  //   loading: loading['courses/LIST_COURSES'],
  // }));

  const all = useSelector(state => state.courses);
  const courses = useSelector(state => state.courses.courses);
  const loading = useSelector(state => state.loading['courses/LIST_COURSES']);
  
  const [searchParams] = useSearchParams()

  // 포스트 데이터가 없거나 로딩 중이면 아무것도 보여주지 않음
  if (!courses || loading) return null;

  // page가 없으면 1을 기본값으로 사용
//   const { tag, username, page = 1 } = qs.parse(location.search, {
//     ignoreQueryPrefix: true,
//   });


  const page = searchParams.get('page') || 1;
  const lastPage = all.courses.pagination.totalPages || 1;

  return (
    <Pagination
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default PaginationContainer;