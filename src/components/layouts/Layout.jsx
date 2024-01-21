import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  return (
    <React.Fragment>
        <Outlet />
    </React.Fragment>
  );
};

export default Layout;
