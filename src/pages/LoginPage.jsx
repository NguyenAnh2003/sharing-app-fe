import React from 'react';
import { useRef } from 'react';
import { login, setToken } from '../libs';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Input from '../components/Input';

const SignInPage = () => {
  const navigate = useNavigate();
  /** useForm */
  const gmail = useRef('');
  const password = useRef('');

  // input props
  const inputProps = [
    {
      props: {
        name: 'gmail',
        placeHolder: 'Your gmail',
        type: 'gmail',
      },
      ref: gmail,
    },
    {
      props: {
        name: 'password',
        placeHolder: 'Your Password',
        type: 'password',
      },
      ref: password,
    },
  ];

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
    <div className="flex place-content-center">
      <form
        className="shadow-md rounded px-8 py-6 flex flex-col w-[500px] translate-y-[50%]"
        onSubmit={submitHandler}
      >
        <h1 className='mb-4 font-bold'>Hello</h1>
        {inputProps.map((i, index) => (
          <Input {...i.props} ref={i.ref} key={index} />
        ))}
        <button className="font-semibold py-2 px-4 rounded" type="button peer">
          Sign in
        </button>
        <Link to={'/signup'} className="text-subtitle underline">
          Dont have account?
        </Link>
      </form>
    </div>
  );
};

export default SignInPage;
