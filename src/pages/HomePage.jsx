import React, { useState } from 'react';
import { useEffect } from 'react';
import { getCurrentUser } from '../libs/apis/auth.api';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAllPostsByUserId, getAllUsers, getFollowersByUserId, getUserById } from '../libs';
import { useDispatch, useSelector } from 'react-redux';
import { saveCurrentUser } from '../redux';
import PostCard from '../components/cards/PostCard';
import FollwingUserCard from '../components/cards/FollwingUserCard';
import SideBar from '../components/SideBar';
import UserSlider from '../components/slider/UserSlider';

/* Replace for search page */

const HomePage = () => {
  /** init */
  const navigate = useNavigate(); // navigate define
  const dispatch = useDispatch(); // dispatch state
  const currentUser = useSelector((state) => state.currentUser.userId);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const [followers, setFollowers] = useState([]);
  /** list of users */
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      /**
       * @param posts data
       * @param user data
       * @param followers data
       * -> using Promise all
       */
      try {
        Promise.all([
          getAllPostsByUserId(currentUser.userId),
          getUserById(currentUser.userId),
          getFollowersByUserId(currentUser.userId),
          getAllUsers(), // get all users
        ]).then(
          ([
            { data: postsData, status: postsStatus },
            { data: userData, status: userStatus },
            { data: followersData, status: followersStatus },
            { data: allUser, status: allUserStatus },
          ]) => {
            if (
              postsStatus === 200 ||
              userStatus === 200 ||
              followersStatus === 200 ||
              allUserStatus === 200
            ) {
              setPosts(postsData);
              setUser(userData);
              setFollowers(followersData);
              setListUser(allUser.filter((x) => x.id !== currentUser.userId));
            }
          }
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentUser]);

  useEffect(() => {
    /** fetch user info direcly on Home page */
    const fetchUser = async () => {
      try {
        const { data, status } = await getCurrentUser();
        if (status === 200) {
          dispatch(saveCurrentUser(data));
        }
      } catch (error) {
        if (error) navigate('/signin');
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="container-2xl mx-10">
      <p className="text-3xl font-bold underline mb-3">Home page</p>
      {/** grid layout 3 */}
      <div className="grid grid-cols-3 gap-4">
        {/** side bar */}
        <SideBar />

        <div className="">
          {/** greeting user */}
          {user && (
            <Link to={'/create-post'}>
              <div className="p-5 text-center bg-btn">
                <p className="font-semibold text-white">
                  Hello <strong>{user.name}</strong> Create your post
                </p>
              </div>
            </Link>
          )}

          {/** list of user */}
          <UserSlider listUser={listUser} />

          {/** list of posts */}
          <div className="flex flex-col gap-4 mt-5">
            {posts.map((i, idx) => (
              /** post Data */
              <PostCard key={idx} postId={i.id} />
            ))}
          </div>
        </div>
        {/** list of followers */}
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold underline text-center">Followers</h1>
          <div className="flex flex-col gap-3">
            {followers.map((i, idx) => (
              <FollwingUserCard key={idx} followingUserId={i.followingId} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
