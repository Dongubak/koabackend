import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { listComments, removeComment, updateComment } from '../../modules/comments';
import CommentsList from '../../components/comments/CommentsList';

const CommentsListContainer = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const {postId} = useParams();

  const page = searchParams.get('page') || 1;

  const comments = useSelector((state) => state.comments.comments);
  const error = useSelector((state) => state.comments.error);
  const loading = useSelector((state) => state.loading['comments/LIST_COMMENTS']);
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.user.user);


  const onEdit = async (id, text) => { /// id는 comment의 id
    await dispatch(updateComment({
      comment_id: id,
      text
    }));
    navigator(`/${post.post.username}/${postId}?page=1`);
  }

  const onRemove = async (id) => {
    await dispatch(removeComment(id));
    navigator(`/${post.post.username}/${postId}?page=1`);
  };

  useEffect(() => {
    dispatch(listComments({ post_id: postId, page, per_page: 10 }));
  }, [dispatch, page, postId]);

  return (
    <CommentsList comments={comments} loading={loading} error={error} onEdit={onEdit} onRemove={onRemove} user={user}/>
  );
};

export default CommentsListContainer;