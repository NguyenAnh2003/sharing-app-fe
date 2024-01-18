import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserById } from '../../libs';

const FollwingUserCard = React.memo(({ followingUserId }) => {
  /** following userId can be seen as userId but it used for following users that the current user follow
   * @param followingUserId
   * @param username
   */
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const { data, status } = await getUserById(followingUserId);
      if (status === 200) setUser(data);
    };
    fetchUser();
  }, [followingUserId]);
  return (
    <div>
      <Link
        to={`/account/${followingUserId}`}
        className="flex items-center hover:bg-card p-2 duration-300"
      >
        {/** user image setup with userData */}
        <img className="w-10 h-10 rounded-full mr-2" src={user.avatarURL} alt={user.name} />
        <div className="text-sm">
          <p className="text-primary font-semibold">{user.name}</p>
        </div>
      </Link>
    </div>
  );
});

export default FollwingUserCard;
