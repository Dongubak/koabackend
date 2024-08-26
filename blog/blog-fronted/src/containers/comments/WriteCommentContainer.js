import React, { useEffect, useState } from 'react';
import { writeComment } from '../../modules/comments'
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import WriteComment from '../../components/comments/WriteComment';

const WriteCommentContainer = () => {
   const { postId } = useParams();
   const navigator = useNavigate();
   const dispatch = useDispatch();
   
   // const error = useSelector((state) => state.comments.error);
   // const loading = useSelector((state) => state.loading['comments/WRITE_COMMENT']);
   const user = useSelector((state) => state.user.user);
   const post = useSelector((state) => state.post);
   const loading = useSelector((state) => state.loading['post/READ_POST']);
   // console.log(user);
   // useState(() => {
   //    console.log(error, loading, user);
   // }, [])

   const [text, setText] = useState('');

   useEffect(() => {
      if(!user) setText('로그인 후 이용해주세요');
      else setText('');
   }, [user]);

   const onPublish = async () => {
      await dispatch(writeComment({post_id: postId, user_id: user.user.id, text}));
      setText('');
      navigator(`/${post.post.username}/${postId}?page=1`);
   }

   const onChange = (e) => {
      setText(e.target.value);
   }

   return(
      <>
         {
            !loading ? <WriteComment text={text} onPublish={onPublish} onChange={onChange} user={user}></WriteComment> : 
            null
         }
      </>
      
   )
}

export default WriteCommentContainer;