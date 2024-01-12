import React, { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
  /**
   * @param name
   * @param type
   * @param placeHolder
   */

  const { placeHolder, name, type, label } = props; // get props
  // custom input
  return (
    <div class="relative mb-3" data-te-input-wrapper-init>
      <input
        name={name}
        ref={ref}
        type={type}
        class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary"
        placeholder={placeHolder}
      />
    </div>
  );
});

export default Input;
