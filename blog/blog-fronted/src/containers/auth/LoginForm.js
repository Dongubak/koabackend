import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router';

const LoginForm = ({ history }) => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const form = useSelector((state) => state.auth.login);
  const auth = useSelector((state) => state.auth.auth);
  const authError = useSelector((state) => state.auth.authError);
  const user = useSelector((state) => state.user.user);
  
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

  
  const onSubmit = e => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log(authError.response.status);
      if(authError.response.status === 401) {
        setError('존재하지 않는 아이디 또는 비밀번호가 틀렸습니다');
      }
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