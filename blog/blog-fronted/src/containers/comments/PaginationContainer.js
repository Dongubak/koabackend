import React from 'react';
import Pagination from '../../components/comments/Pagination'; // comments 관련 Pagination 컴포넌트 경로
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const PaginationContainer = () => {
  // comments, loading 상태를 가져옴
  const comments = useSelector((state) => state.comments);
  const loading = useSelector((state) => state.loading['comments/LIST_COMMENTS']);

  // 현재 페이지와 검색 매개변수를 가져옴
  const [searchParams] = useSearchParams();
  
  // post_id를 가져오기 위해 searchParams에서 'post_id'를 추출
  const post_id = searchParams.get('post_id');

  // comments 데이터가 없거나 로딩 중이면 아무것도 보여주지 않음
  if (!comments || loading) return null;

  // page가 없으면 1을 기본값으로 사용
  const page = searchParams.get('page') || 1;

  // lastPage를 comments 상태에서 가져옴
  const lastPage = comments.lastPage || 1;

  return (
    <Pagination
      post_id={post_id}  // post_id를 Pagination 컴포넌트로 전달
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default PaginationContainer;