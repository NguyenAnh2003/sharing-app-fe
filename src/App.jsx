import AppRoutes from './core/routes';
import React, { useEffect } from 'react';
/** Toaster simple setup */
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { PrimeReactProvider } from 'primereact/api';

/**
 * App info :
 * @NguyenAnh2003 author
 */

function App() {
  const currentUser = useSelector((state) => state.currentUser.userId);

  useEffect(() => {
    console.log('App contains', currentUser);
  }, [currentUser]);

  return (
    <>
      {/** App routes */}
      <PrimeReactProvider>
        <Toaster reverseOrder={false} position="top-right" />
        {/** Toaster applied for all page
        simple call toast.error() || toast.success()
        */}
        <AppRoutes />
      </PrimeReactProvider>
    </>
  );
}

export default App;
