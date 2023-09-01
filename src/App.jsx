import { getCurrentUser } from './libs/apis/authAPI';
import AppRoutes from './routes';
import React, { useEffect } from 'react';

// apply move to top button on this?

/**
 * App info :
 * @NguyenAnh2003 author
 * 
 * Save current user info in app
 * store current user info in state
 */

function App() {
  /* Check current user 403 ERROR_CODE navigate to signin page */
  useEffect(() => {
    const fetchAPI = async () => {
      /**
       * token from cookie stored in header
       */
      const data = await getCurrentUser();
      console.log('current user', data);
    };
    fetchAPI();
  }, []);
  
  return <AppRoutes/>;
}

export default App;
