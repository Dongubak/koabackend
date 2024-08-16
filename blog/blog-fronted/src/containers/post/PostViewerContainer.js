import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = () => {
  const navigator = useNavigate();
  // 처음 마운트될 때 포스트 읽기 API 요청
  const { postId } = useParams();

  const dispatch = useDispatch();
  // const { post, error, loading, user } = useSelector(({ post, loading, user }) => ({
  //   post: post.post,
  //   error: post.error,
  //   loading: loading['post/READ_POST'],
  //   user: user.user
  // }));

  const post = useSelector((state) => state.post.post);
  const error = useSelector((state) => state.post.error);
  const loading = useSelector((state) => state.loading['post/READ_POST']);
  const user = useSelector((state) => state.user.user);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    navigator('/write');
  }

  const onRemove = async () => {
    try {
      await removePost(postId);
      navigator('/');
    } catch(e) {
      console.log(e);
    }
  }

  // console.log(post);

  useEffect(() => {
    dispatch(readPost(postId));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);
  return <PostViewer post={post} loading={loading} error={error}  actionButtons={
    (user && user.user.id === (post && post.user_id)) && <PostActionButtons onEdit={onEdit}onRemove={onRemove}/>}/>;
};

export default PostViewerContainer;