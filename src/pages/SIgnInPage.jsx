import React, { useEffect } from 'react';
import { login } from '../libs/apis/authAPI';
import { useRef } from 'react';

const SignInPage = () => {
  const gmail = useRef('');
  const password = useRef('');
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      /**
       * Encrypt data request
       */
      const data = await login(
        gmail.current.value,
        password.current.value
      );
      console.log(data);
      /**
       * Store current user info in state
       * Store access token in header
       */
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p>sign in simple</p>
      <form onSubmit={submitHandler}>
        <input
          ref={gmail}
          placeholder="Your Gmail"
          type="email"
          required
        />
        <input
          ref={password}
          placeholder="Your Password"
          type="password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
