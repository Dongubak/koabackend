import React, { useEffect } from 'react';
import Pagination from '../../components/comments/Pagination'; // comments 관련 Pagination 컴포넌트 경로
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const PaginationContainer = () => {
  // comments, loading 상태를 가져옴
  const comments = useSelector((state) => state.comments);
  const loading = useSelector((state) => state.loading['comments/LIST_COMMENTS']);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;

  // comments 데이터가 없거나 로딩 중이면 아무것도 보여주지 않음
  if (!comments || loading) return null;

  // page가 없으면 1을 기본값으로 사용

  // lastPage를 comments 상태에서 가져옴
  const lastPage = comments.lastPage || 1;

  return (
    <Pagination
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default PaginationContainer;