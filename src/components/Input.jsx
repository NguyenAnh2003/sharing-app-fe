import React, { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
  /**
   * @param name
   * @param type
   * @param placeHolder
   */

  const { placeHolder, name, type } = props; // get props
  // custom input
  return <input ref={ref} name={name} placeholder={placeHolder} type={type} />;
});

export default Input;
