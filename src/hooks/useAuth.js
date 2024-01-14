import { useEffect, useState } from 'react';
import { getCurrentUser } from '../libs';

const useAuth = () => {
  /** used for authenticate */
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const { data, status } = await getCurrentUser();
      if (status === 200) setIsAuth(!isAuth);
      else setIsAuth(!isAuth);
    };
    fetchUser();
  }, [isAuth]);
  return isAuth;
};

export default useAuth;
