import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePost, writePost } from '../../modules/write';

const WriteActionButtonsContainer = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(({user}) => user.user);

  const navigator = useNavigate();

  const {id : user_id, username} = user;

  // const { title, body, post, postError, originalPostId } = useSelector(({ write }) => ({
  //   title: write.title,
  //   body: write.body,
  //   post: write.post,
  //   postError: write.postError,
  //   originalPostId: write.originalPostId,
  // }));

  const title = useSelector((state) => state.write.title);
  const body = useSelector((state) => state.write.body);
  const post = useSelector((state) => state.write.post);
  const postError = useSelector((state) => state.write.postError);
  const originalPostId = useSelector((state) => state.write.originalPostId);

  // 포스트 등록
  const onPublish = () => {
    if(originalPostId) {
      dispatch(updatePost({
        title, body, id: originalPostId
      }));
      return;
    }
    dispatch(
      writePost({
        title,
        body,
        user_id
      }),
    );
  };

  // 취소
  const onCancel = () => {
    navigator(-1);
  };

  // 성공 혹은 실패시 할 작업
  useEffect(() => {
    if (post) {
      const { id } = post;
      navigator(`/${username}/${id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [navigator, post, postError, username]);
  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} isEdit={!!originalPostId}/>;
};

export default WriteActionButtonsContainer;