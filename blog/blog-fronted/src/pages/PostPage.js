import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewerContainer from '../containers/post/PostViewerContainer';
import CommentsListContainer from '../containers/comments/CommentsListContainer';
import PaginationContainer from '../containers/comments/PaginationContainer';

const PostPage = () => {

   return(
      <>
         <HeaderContainer></HeaderContainer>
         <PostViewerContainer></PostViewerContainer>
         <CommentsListContainer></CommentsListContainer>
         <PaginationContainer></PaginationContainer>
      </>
   )
}

export default PostPage;