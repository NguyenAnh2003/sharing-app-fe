import AppRoutes from './core/routes';
import React, { useEffect, useState } from 'react';
/** Toaster simple setup */
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { getCurrentUser } from './libs';

/**
 * App info :
 * @NguyenAnh2003 author
 */

function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const { data, status } = await getCurrentUser();
      if (status === 200 && data) setAuth(true);
      else setAuth(false);
    };
    fetchUser();
  }, []);
  return (
    <>
      {/** Toaster applied for all page
      simple call toast.error() || toast.success()
      */}
      <Toaster reverseOrder={false} position="top-right" />
      {/** App routes */}
      <Provider store={store}>
        <AppRoutes isAuth={auth} />
      </Provider>
    </>
  );
}

export default App;
