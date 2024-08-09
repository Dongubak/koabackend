import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/posts/PostListContainer.js'
import PaginationContainer from '../containers/posts/PaginationContainer.js';
const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostListContainer></PostListContainer>
      <PaginationContainer></PaginationContainer>
    </>
  );
};

export default PostListPage;