import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const PostListContainer = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const {username} = useParams();
  const [searchParams, setSearchParams] = useSearchParams()

  const page = searchParams.get('page') || 1;

  const { posts, error, loading, user} = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user
    }),
  );

  const onGoWritePage = useCallback(() => {
   navigator('/write');
  }, []);

  useEffect(() => {
    dispatch(listPosts({ username, page }));
  }, [dispatch, username, page]);

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