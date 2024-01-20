import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { followUser } from '../../libs';
import toast from 'react-hot-toast';

const UserCard = React.memo(({ userId, username, avatarURL }) => {
  const currentUser = useSelector((state) => state.currentUser.userId);
  console.log('Re-render from userCard');

  const followHandler = useCallback(async () => {
    try {
      /** userId -> the person in card */
      const { data, status } = await followUser(currentUser.userId, userId);
      if (status === 200) toast.success('You have followed this person');
    } catch (error) {
      console.error(error);
      toast.error(error.data);
    }
  }, [userId, currentUser]);

  return (
    <div className="flex flex-col bg-card py-4 px-6">
      <div class="overflow-hidden rounded-none">
        <img
          src={avatarURL}
          alt={userId}
          style={{ objectFit: 'cover' }}
          className="w-full h-[177px]"
        />
      </div>
      <div class="p-6">
        <h4 class="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {username}
        </h4>
      </div>
      {/** follow button */}
      <div className='px-4'>
        <button
          onClick={followHandler}
          className="font-semibold py-2 px-4 w-full rounded bg-btn text-white"
          type="button"
        >
          Follow
        </button>
      </div>
    </div>
  );
});

export default UserCard;
