import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { followUser, getFollowersByUserId, unfollowUser } from '../../libs';
import toast from 'react-hot-toast';
import styled from 'styled-components'; // styled the component with multiple variants
import { Link } from 'react-router-dom';

const UserCard = React.memo(({ userId, username, avatarURL }) => {
  /** variants
   * @var slider
   * @var following
   * @var searched
   */
  const currentUser = useSelector((state) => state.currentUser.userId);
  const [isFollowed, setFollowed] = useState(false);

  useEffect(() => {
    try {
      const fetchDataa = async () => {
        const { data, status } = await getFollowersByUserId(currentUser.userId);
        if (status === 200) {
          console.log(data);
          const followed = data.some((x) => x.followingId === userId);
          console.log(followed);
          if (!followed) setFollowed(true);
          else setFollowed(false);
        }
      };
      fetchDataa();
    } catch (error) {
      console.error(error);
    }
  }, [userId, currentUser]);

  const followHandler = useCallback(async () => {
    try {
      /** userId -> the person in card */
      const { data, status } = await followUser(currentUser.userId, userId);
      if (status === 200) {
        setFollowed(!isFollowed);
        toast.success('You have followed this person');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.data);
    }
  }, [userId, currentUser]);

  const unFollowHandler = useCallback(async () => {
    try {
      const { status } = await unfollowUser(currentUser.userId, userId);
      if (status === 204) {
        setFollowed(!isFollowed);
        toast.success('You have unfollowed this person');
      }
    } catch (error) {
      console.error(error);
    }
  }, [userId, currentUser]);

  return (
    <div className="flex flex-col bg-card">
      <div class="overflow-hidden rounded-none">
        <img
          src={avatarURL}
          alt={userId}
          style={{ objectFit: 'cover' }}
          className="w-full h-[177px]"
        />
      </div>
      <div class="p-6">
        <Link
          to={`account/${userId}`}
          class="block underline font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased"
        >
          {username}
        </Link>
      </div>
      {/** follow button */}
      {!isFollowed ? (
        <div className="px-6 pb-6">
          <button
            onClick={unFollowHandler}
            className="font-semibold py-2 px-4 w-full rounded bg-btn text-white"
            type="button"
          >
            Unfollow
          </button>
        </div>
      ) : (
        <div className="px-6 pb-6">
          <button
            onClick={followHandler}
            className="font-semibold py-2 px-4 w-full rounded bg-btn text-white"
            type="button"
          >
            Follow
          </button>
        </div>
      )}
    </div>
  );
});

export default UserCard;
