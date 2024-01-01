import AppRoutes from './routes';
import React, { useEffect } from 'react';
/** Toaster simple setup */
import { Toaster } from 'react-hot-toast';

/**
 * App info :
 * @NguyenAnh2003 author
 *
 * Save current user info in app
 * store current user info in state
 */

function App() {
  /* Check current user 403 ERROR_CODE navigate to signin page */
  /** get currentUser directly validate in App file */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getCurrentUser();
        console.log('current user', data);
      } catch (error) {
        if (error.status === 403) navigate('/signin');
      }
    };
    fetchData();
  }, []);

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
