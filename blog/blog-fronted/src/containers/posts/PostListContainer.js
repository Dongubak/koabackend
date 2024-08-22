import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const PostListContainer = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const {username} = useParams();
  const [searchParams] = useSearchParams()

  const page = searchParams.get('page') || 1;

  const posts = useSelector((state) => state.posts.posts);
  const error = useSelector((state) => state.posts.error);
  const loading = useSelector((state) => state.loading['posts/LIST_POSTS']);
  const user = useSelector((state) => state.user.user);


  const onGoWritePage = useCallback(() => {
   navigator('/write');
  }, [navigator]);

  useEffect(() => {
    dispatch(listPosts({ username, page }));
  }, [dispatch, username, page, searchParams]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
      onGoWritePage={onGoWritePage}
    />
  );
};

export default PostListContainer;