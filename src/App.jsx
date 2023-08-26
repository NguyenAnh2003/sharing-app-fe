import AppRoutes from './routes';
import React from 'react';

// apply move to top button on this?
function App() {
  useEffect(() => {
    const fetchAPI = async () => {
      /**
       * token from cookie stored in header
       */
      const data = await getCurrentUser();
      console.log(data);
    };
    fetchAPI();
  }, []);
  
  return <AppRoutes/>;
}

export default App;
