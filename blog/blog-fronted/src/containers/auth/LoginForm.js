import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router';

const LoginForm = ({ history }) => {
  const navigate = useNavigate();

  const [error] = useState(null);
  const dispatch = useDispatch();
  // const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
  //   form: auth.login,
  //   auth: auth.auth,
  //   authError: auth.authError,
  //   user: user.user,
  // }));
  const form = useSelector((state) => state.auth.login);
  const auth = useSelector((state) => state.auth.auth);
  const authError = useSelector((state) => state.auth.authError);
  const user = useSelector((state) => state.user.user);
  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      return;
    }
    if (auth) {
      dispatch(check());
    }
    
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;