import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { register } from '../libs';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const navigate = useNavigate();
  /** useForm */
  const gmail = useRef('');
  const password = useRef('');
  const name = useRef('');

  // input props
  const inputProps = [
    /** name */
    {
      props: {
        name: 'text',
        placeHolder: 'Your name',
        type: 'text',
      },
      ref: name,
    },
    /** gmail */
    {
      props: {
        name: 'gmail',
        placeHolder: 'Your gmail',
        type: 'gmail',
      },
      ref: gmail,
    },
    /** password */
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
      if (
        name.current.value === '' ||
        gmail.current.value === '' ||
        password.current.value === ''
      ) {
        toast.error('No value provided');
        return;
      } else {
        /** call api */
        const { status } = await register(
          name.current.value,
          gmail.current.value,
          password.current.value
        );
        /** Store access token in header **/
        if (status === 200) {
          toast.success('Signup sucessfully');
          navigate('/signin');
        }
        /** Store current user info in state*/
      }
    } catch (error) {
      /* Validate app here use error status to check */
      console.log(error);
      /** notify with error */
      toast.error(error.data);
    }
  };

  return (
    <div className="flex place-content-center">
      <form
        className="shadow-md rounded px-8 py-6 flex flex-col w-[500px] translate-y-[50%]"
        onSubmit={submitHandler}
      >
        <h1 className="mb-4 font-semibold text-center text-xl">Sign up</h1>
        <div className="flex flex-col gap-4 mb-4">
          {inputProps.map((i, index) => (
            <Input {...i.props} ref={i.ref} key={index} />
          ))}
          <button className="font-semibold py-2 px-4 rounded bg-btn text-white" type="submit">
            Sign up
          </button>
        </div>
        <Link to={'/signin'} className="text-subtitle underline">
          Already have account
        </Link>
      </form>
    </div>
  );
};

export default SignUpPage;
