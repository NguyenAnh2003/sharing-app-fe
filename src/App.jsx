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
