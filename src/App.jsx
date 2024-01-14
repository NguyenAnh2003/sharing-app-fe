import AppRoutes from './core/routes';
import React, { useEffect } from 'react';
/** Toaster simple setup */
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

/**
 * App info :
 * @NguyenAnh2003 author
 */

function App() {
  const currentUser = useSelector((state) => state.currentUser.userId);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

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
