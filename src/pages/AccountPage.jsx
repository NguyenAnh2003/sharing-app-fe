import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostsByUserId, getUserById, setUserId, uploadFile } from '../libs';
import UploadFile from '../components/UploadFile';
import PostCard from '../components/cards/PostCard';
import Input from '../components/Input';
import { FiEdit2 } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import UpdateNameModal from '../components/modals/UpdateNameModal';
import { GrUpdate } from 'react-icons/gr';
import toast from 'react-hot-toast';


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
  const [imageUrl, setImageUrl] = useState(); // imageUrl
  const [file, setFile] = useState();
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

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadHandler = useCallback(async () => {
    try {
      if (file === null) toast.error('No file chosen');
      else {
        const formData = new FormData();
        formData.append('file', file);

        const { data, status } = await uploadFile(formData); // form data
        if (status === 200) {
          console.log('image', data);
          setImageUrl(data); // parent
          toast.success('Uploaded successfully');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.data);
    }
  }, [currentUser]);

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
                src={imageUrl ? imageUrl : user.avatarURL}
                alt={user.id}
                className="w-60 h-60 rounded-full"
                style={{ objectFit: 'cover' }}
              />
              {currentUser.userId === userId ? (
                <div className="mt-5">
                  <input
                    class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    type="file"
                    onChange={fileChangeHandler}
                    id="formFileMultiple"
                  />
                  <GrUpdate
                    onClick={uploadHandler}
                    size={45}
                    className="p-3 rounded-full cursor-pointer absolute -right-2 -bottom-1 bg-card"
                    style={{ fill: 'white' }}
                  />
                </div>
              ) : (
                <></>
              )}
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
        <div className="col-span-2">
          <div className="grid grid-cols-2 auto-cols-min gap-4">
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
