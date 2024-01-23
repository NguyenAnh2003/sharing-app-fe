import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostsByUserId, getUserById, setUserId } from '../libs';
import UploadFile from '../components/UploadFile';
import PostCard from '../components/cards/PostCard';
import Input from '../components/Input';
import { FiEdit2 } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import UpdateNameModal from '../components/modals/UpdateNameModal';

/**
 *
 * check current user in account page
 * fetch user by Id
 */
const AccountPage = () => {
  const currentUser = useSelector((state) => state.currentUser.userId);
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  /**
   * Calling current user to check (state)
   * Allowing to update based on current userId
   */
  /** open comment modal */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchAPI = async () => {
      /** Promise all for fetching user, post data */
      try {
        Promise.all([getUserById(userId), getPostsByUserId(userId)]).then(
          ([{ data: userData, status: userStatus }, { data: postDataa, status: postStatus }]) => {
            if (userStatus === 200 || postStatus === 200) {
              console.log(userData, postDataa);
              setUser(userData); //
              setPosts(postDataa);
            }
          }
        );
      } catch (error) {
        console.error();
      }
    };
    fetchAPI();
    return () => {
      setUser({});
    };
  }, [userId]);

  return (
    <div className="container-2xl mx-10 mb-10">
      {/** modal */}
      {open ? <UpdateNameModal open={open} handleClose={handleClose} /> : <></>}
      <div className="grid grid-cols-3 mt-10 gap-10">
        <div className="">
          {/** avatar */}
          <div className="flex mb-10">
            <div className="relative">
              <img
                src={user.avatarURL}
                alt={user.id}
                className="w-60 h-60 rounded-full"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="flex flex-row items-center mt-5 gap-4 ml-5">
            <h1 className="headingPage ">{user.name}</h1>
            {currentUser.userId === userId ? (
              <FiEdit2 size={20} className="cursor-pointer" onClick={handleOpen} />
            ) : (
              <></>
            )}
          </div>
        </div>
        {/** post part */}
        <div className="">
          <div className="flex flex-col gap-4">
            {posts.length !== 0 ? (
              posts.map((i, idx) => (
                /** post Data */
                <PostCard key={idx} postId={i.id} />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
