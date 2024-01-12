import AppRoutes from './core/routes';
import React, { useEffect, useState } from 'react';
/** Toaster simple setup */
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import { Provider } from 'react-redux';

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
