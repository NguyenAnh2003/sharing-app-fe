import { Link } from 'react-router-dom';
import React from 'react';

const Page404 = () => {
  return (
    <div>
      Page not found{' '}
      <Link to={'/'}>
        <b>Back to Home</b>
      </Link>
    </div>
  );
};

export default Page404;
