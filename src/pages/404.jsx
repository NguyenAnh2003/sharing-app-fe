import React from 'react';
import { Link } from 'react-router-dom';

export const Page404 = () => {
  return (
    <div>
      Page not found {" "}
      <Link to={'/'}>
        <b>Back to Home</b>
      </Link>
    </div>
  );
};
