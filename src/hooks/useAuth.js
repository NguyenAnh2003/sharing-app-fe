import { useEffect, useState } from 'react';

const useAuth = () => {
  /** used for authenticate */
  const [isAuth, setIsAuth] = useState(false);
  
  useEffect(() => {

  }, []);

  return isAuth;
};

export default useAuth;
