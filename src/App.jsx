import AppRoutes from './routes';
import React, { useEffect } from 'react';
/** Toaster simple setup */
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './redux';

/**
 * App info :
 * @NguyenAnh2003 author
 */

function App() {
  return (
    <>
      {/** Toaster applied for all page
      simple call toast.error() || toast.success()
      */}
      <Toaster reverseOrder={false} position="top-right" />
      {/** App routes */}
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </>
  );
}

export default App;
