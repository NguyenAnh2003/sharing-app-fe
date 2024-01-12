import { Link } from 'react-router-dom';
import React from 'react';

const Page404 = () => {
  return (
    <div className="flex flex-col gap-10 justify-center align-middle h-full mt-72">
      <p className='text-3xl font-bold underline text-center'>Page not found</p>
      <p className='text-3xl font-bold text-center'>404</p>
    </div>
  );
};

export default Page404;
