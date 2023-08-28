import React, { useEffect } from 'react';
import { getUserById } from '../libs/apis/userAPI';
import { useParams } from 'react-router-dom';

/**
 *
 * check current user in account page
 * fetch user by Id
 */
const AccountPage = () => {
  const { id: userId } = useParams();
  /**
   * Calling current user to check (state)
   * Allowing to update based on current userId
   */
  useEffect(() => {
    const data = getUserById(userId);
    console.log('user info', data);
  }, [userId]);
  return (
    <div>
      <p>Account page</p>
    </div>
  );
};

export default AccountPage;
