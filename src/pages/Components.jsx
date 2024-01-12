import React, { useRef } from 'react';
import Input from '../components/Input';

const Components = () => {
  const ref = useRef(null);
  const inputProps = {
    props: {
      name: 'input',
      label: 'Input',
      placeHolder: 'Your Input',
      type: 'text',
    },
    ref: ref,
  };
  return (
    <div className='container'>
      <Input {...inputProps.props} ref={inputProps.ref} />
    </div>
  );
};

export default Components;
