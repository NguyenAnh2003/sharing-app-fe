import { getCurrentUser } from './libs/apis/authAPI';
import AppRoutes from './routes';
import React, { useEffect } from 'react';

// apply move to top button on this?
/**
 * Save current user info in app
 */

function App() {
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
