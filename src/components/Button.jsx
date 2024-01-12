import React from 'react';

const Button = forwardRef(({ props, ref }) => {
  /**
   * including spinner
   */
  const { text } = props;
  return (
    <>
      <button ref={ref}>{text}</button>
    </>
  );
});

export default Button;
