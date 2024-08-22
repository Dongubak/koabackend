import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { removePost, setOriginalPost } from '../../modules/write';

const PostViewerContainer = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post);
  const error = useSelector((state) => state.post.error);
  const loading = useSelector((state) => state.loading['post/READ_POST']);
  const user = useSelector((state) => state.user.user);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    navigate('/write');
  };

  const onRemove = () => {
    dispatch(removePost({ id: postId,
    //    navigate: () => {
    //   navigate('/');
    // } 
  }));
    navigate('/');
  };

  useEffect(() => {
    dispatch(readPost(postId));
  }, [dispatch, postId]);
  


  return (
    <PostViewer 
      post={post} 
      loading={loading} 
      error={error}  
      actionButtons={
        (user && user.user.id === (post && post.user_id)) && 
        <PostActionButtons onEdit={onEdit} onRemove={onRemove}/>
      }
    />
  );
};

export default PostViewerContainer;