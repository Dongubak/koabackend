import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewerContainer from '../containers/post/PostViewerContainer';
import CommentsListContainer from '../containers/comments/CommentsListContainer';
import PaginationContainer from '../containers/comments/PaginationContainer';
import WriteCommentContainer from '../containers/comments/WriteCommentContainer';

const PostPage = () => {

   return(
      <>
         <HeaderContainer></HeaderContainer>
         <PostViewerContainer></PostViewerContainer>
         <WriteCommentContainer></WriteCommentContainer>
         <CommentsListContainer></CommentsListContainer>
         <PaginationContainer></PaginationContainer>
      </>
   )
}

export default PostPage;