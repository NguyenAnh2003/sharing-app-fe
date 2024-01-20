import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createLike,
  deleteLike,
  getCategoryById,
  getCommentsByPostId,
  getDataByPostId,
  getLikesByPostId,
  getSavesByPostId,
  getUserById,
  savePostByUserIdAndPostId,
  unSavePost,
} from '../../libs';
import { useSelector } from 'react-redux';
import { CiEdit } from 'react-icons/ci';
import { BsFillSave2Fill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { FaRegCommentAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import CommentModal from '../modals/CommentModal';

const PostCard = React.memo(({ postId }) => {
  const currentUser = useSelector((state) => state.currentUser.userId);
  /**
   * Post data ()
   * @param userId
   * @param categoryId
   * @param category
   * @param title
   * @param description
   * @param imageURL
   */
  const [postData, setPostData] = useState({});
  const [userData, setUserData] = useState({});
  /** likes */
  const [likesDataa, setLikes] = useState([]);
  /** saves */
  const [savesDataa, setSaves] = useState([]);
  /** validate save and like */
  const [isLiked, setLiked] = useState(false);
  const [isSaved, setSaved] = useState(false);
  /** open comment modal */
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchDataa = async () => {
      /**
       * @param postData
       * @param userData
       * @param categoryData
       * @param likeData
       * @param saveData
       * -> using Promise.all()
       */

      const { data, status } = await getDataByPostId(postId);
      if (status === 200 && data) {
        setPostData(data);

        /** setCategory data, setUser, setLikes, saves, comments */
        Promise.all([
          getCategoryById(data.categoryId), // category data
          getUserById(data.userId), // user data
          getLikesByPostId(data.id), // category data
          getSavesByPostId(data.id), // save data
        ]).then(
          ([
            /** raw define (too exhausted) sequentially */
            { data: cateData, status: cateStatus },
            { data: userData, status: userStatus },
            { data: likesData, status: likesStatus },
            { data: saveData, status: saveStatus },
          ]) => {
            if (
              cateStatus === 200 &&
              userStatus === 200 &&
              likesStatus === 200 &&
              saveStatus === 200
            ) {
              /** set like data */
              setLikes(likesData);
              /** set save data */
              setSaves(saveData);
              //
              setUserData(userData); // set user data for user info part
              setPostData((prev) => {
                return { ...prev, username: userData.name, category: cateData.category };
              });
            }
          }
        );
      }
    };

    /** call */
    fetchDataa();

    /** remove postData */
    return () => {
      setPostData({}); //
      setUserData({});
      setLikes([]);
      setSaves([]);
    };
  }, [postId, currentUser]);

  /** like validation */
  useEffect(() => {
    const liked = likesDataa.some((x) => x.userId === currentUser.userId);
    if (liked === true) setLiked(true);
    else setLiked(false);
  }, [likesDataa, currentUser]);

  /** saved validation */
  useEffect(() => {
    const saved = savesDataa.some((x) => x.userId === currentUser.userId);
    if (saved === true) setSaved(true);
    else setSaved(false);
  }, [savesDataa, currentUser]);

  /** currentLikes */
  const currentLikes = useMemo(() => {
    // if (isLiked === false) {
    //   if (likesDataa.length === 0) return likesDataa.length;
    //   else return likesDataa.length - 1;
    // }
    return likesDataa.length;
  }, [isLiked, likesDataa]);

  /** like submit handler */
  const likeSubmitHandler = useCallback(async () => {
    try {
      const { data, status } = await createLike(currentUser.userId, postData.id);
      if (status === 200) {
        setLiked(!isLiked); // set liked (boolean)
        setLikes((prev) => {
          return [...prev, data];
        });
        console.log(likesDataa);
        console.log('liked', data);
      }
    } catch (error) {
      toast.error('Server error');
    }
  }, [currentUser, postId, postData]);

  const deleteLikeHandler = useCallback(async () => {
    try {
      const { status } = await deleteLike(currentUser.userId, postData.id);
      if (status === 204) {
        setLiked(!isLiked);
        setLikes((prev) => {
          return prev.filter((x) => x.userId !== currentUser.userId);
        });
        toast.success('Unliked this post');
      }
    } catch (error) {
      toast.error('Server error');
    }
  }, [currentUser, postId, postData]);

  /** save submit handler validate with owner*/
  const saveSubmitHandler = useCallback(async () => {
    const { data, status } = await savePostByUserIdAndPostId(currentUser.userId, postData.id);
    if (status === 200) {
      setSaved(!isSaved);
      console.log('saved', data);
    }
  }, [currentUser, postId, postData]);

  /** save submit handler validate with owner*/
  const unsaveSubmitHandler = useCallback(async () => {
    const { status } = await unSavePost(currentUser.userId, postData.id);
    if (status === 204) {
      setSaved(false);
      console.log('unsaved');
      toast.success('Unsaved this post');
    }
  }, [currentUser, postId, postData]);

  return (
    postData && (
      <div>
        {/** post content */}
        <div className="border border-gray-400 lg:border-gray-400 bg-card p-4">
          <Link
            to={`/account/${postData.userId}`}
            className="flex items-center hover:bg-primary p-2 duration-300"
          >
            {/** user image setup with userData */}
            <img
              className="w-10 h-10 rounded-full mr-2"
              src={userData.avatarURL}
              alt={userData.name}
            />
            <div className="text-sm">
              <p className="text-primary font-semibold">{postData.username}</p>
            </div>
          </Link>
          <div className="mb-5">
            <div className="flex flex-row items-center gap-5 mb-2 justify-between">
              <div>
                <div className="text-gray-900 font-bold text-xl">{postData.title}</div>
                {/** category */}
                <p className="inline-block bg-primary rounded-full px-2 text-sm font-semibold text-primary">
                  #{postData.category}
                </p>
              </div>

              {/** edit button */}
              {postData && postData.userId === currentUser.userId ? (
                <Link to={`/update-post/${postId}`}>
                  <CiEdit size={24} className="cursor-pointer" />
                </Link>
              ) : (
                <></>
              )}
            </div>
            <p className="text-gray-700 text-base">{postData.description}</p>
            {/** post image */}
            <img className="w-full mt-3" src={postData.imageURL} alt={postData.id} />
          </div>
          {/** interact with post */}
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              {/** like button include create like and delete */}
              {isLiked === false ? (
                <FaHeart
                  size={20}
                  className="cursor-pointer"
                  onClick={likeSubmitHandler}
                  style={{ fill: 'black' }}
                />
              ) : (
                <FaHeart
                  size={20}
                  className="cursor-pointer"
                  onClick={deleteLikeHandler}
                  style={{ fill: 'red' }}
                />
              )}
              {currentLikes}
            </div>
            {/** comment action */}
            <FaRegCommentAlt size={20} className="cursor-pointer" onClick={handleOpen} />
            {open ? <CommentModal postId={postId} handleClose={handleClose} open={open} /> : <></>}
            {/** save validate with owner including create save and delete save*/}
            {isSaved === false ? (
              <BsFillSave2Fill
                size={20}
                className="cursor-pointer"
                style={{ fill: 'black' }}
                onClick={saveSubmitHandler}
              />
            ) : (
              <BsFillSave2Fill
                size={20}
                className="cursor-pointer"
                style={{ fill: 'red' }}
                onClick={unsaveSubmitHandler}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
});

export default PostCard;
