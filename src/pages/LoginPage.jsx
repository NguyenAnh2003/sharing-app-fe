import React from 'react';
import { useRef } from 'react';
import { login, setToken } from '../libs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const SignInPage = () => {
  const navigate = useNavigate();
  /** useForm */
  const gmail = useRef('');
  const password = useRef('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await login(gmail.current.value, password.current.value);
      console.log('response', data);
      /** Store access token in header **/
      if (status === 200) {
        setToken(data.accessToken);
        toast.success('Login sucessfully');
        navigate('/');
      }
      /** Store current user info in state*/
    } catch (error) {
      /* Validate app here use error status to check */
      console.log(error);
      /** notify with error */
      toast.error('Internal error');
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
    </div>
  );
};

export default SignInPage;
