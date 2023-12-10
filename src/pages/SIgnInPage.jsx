import React from 'react';
import { useRef } from 'react';
import { login, setToken } from '../libs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();
  const gmail = useRef('');
  const password = useRef('');
  const [error, setError] = useState('');
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      /** Encrypt data request*/
      const res = await login(gmail.current.value, password.current.value);
      console.log('res', res?.data);
      /** Store access token in header **/
      if (!res) return;
      else {
        setToken(res?.data.accessToken);
        navigate('/')
      }
      /** Store current user info in state*/
    } catch (error) {
      /* Validate app here use error status to check */
      console.log(error);
      setError('Message: ' + error.data.message + ' Status: ' + error.status);
    }
  };
  return (
    <div>
      <p>sign in simple</p>
      <form onSubmit={submitHandler} className="flex justify-center">
        <input ref={gmail} placeholder="Your Gmail" type="email" required />
        <input ref={password} placeholder="Your Password" type="password" required />
        <button type="submit">Sign In</button>
      </form>
      <b>{error}</b>
    </div>
  );
};

export default SignInPage;
