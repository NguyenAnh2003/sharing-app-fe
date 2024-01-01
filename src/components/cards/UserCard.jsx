import React from 'react';
import { useEffect } from 'react';

/**
 * UserCard used for searching page the properties of
 * userCard are Name, Avatar, And userId -> to UserAccount
 * that we need to fetch all the user info by Id
 */

const UserCard = React.memo(({ userId }) => {
  console.log('Re-render from userCard');
  /**
   * getUserById
   */
  return <div></div>;
});

export default UserCard;
