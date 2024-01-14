import AppRoutes from './core/routes';
import React, { useEffect, useState } from 'react';
/** Toaster simple setup */
import { Toaster } from 'react-hot-toast';
import { getCurrentUser } from './libs';
import { useSelector } from 'react-redux';

/**
 * App info :
 * @NguyenAnh2003 author
 */

function App() {
  const currentUser = useSelector((state) => state.currentUser.userId);

  return (
    <>
      {/** Toaster applied for all page
      simple call toast.error() || toast.success()
      */}
      <Toaster reverseOrder={false} position="top-right" />
      {/** App routes */}
      <AppRoutes />
    </>
  );
}

export default App;
