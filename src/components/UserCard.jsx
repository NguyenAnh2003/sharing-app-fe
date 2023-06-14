import React from 'react'

/**
 * UserCard used for searching page the properties of
 * userCard are Name, Avatar, And userId -> to UserAccount 
 * that we need to fetch all the user info by Id
*/

const UserCard = React.memo((props) => {
  console.log("Re-render from userCard");
  return (
    <div>
      
    </div>
  )
})

export default UserCard;
