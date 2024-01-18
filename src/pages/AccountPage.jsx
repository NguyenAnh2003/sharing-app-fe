import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById, setUserId } from '../libs';

/**
 *
 * check current user in account page
 * fetch user by Id
 */
const AccountPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  /**
   * Calling current user to check (state)
   * Allowing to update based on current userId
   */
  useEffect(() => {
    const fetchAPI = async () => {
      const { data, status } = await getUserById(userId);
      if (status === 200) {
        setUser(data);
        console.log(data);
      }
    };
    fetchAPI();
    return () => {
      setUser({})
    }
  }, [userId]);

  return (
    <div>
      <p>Account page</p>
    </div>
  );
};

export default AccountPage;
