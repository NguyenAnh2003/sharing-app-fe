import React, { useEffect, useMemo, useState } from 'react';
import {
  getCategoryById,
  getCommentsByPostId,
  getDataByPostId,
  getLikesByPostId,
  getSavesByPostId,
  getUserById,
} from '../../libs';
import { useSelector } from 'react-redux';
import { CiEdit } from 'react-icons/ci';
import { BsSave } from 'react-icons/bs';
import { SlLike } from 'react-icons/sl';
import { FaRegCommentAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PostCard = React.memo(({ postId }) => {
  const currentUser = useSelector((state) => state.currentUser.userId);
  const navigate = useNavigate();
  /**
   * Post data ()
   * @param userId
   * @param categoryId
   * @param category
   * @param title
   * @param description
   * @param imageURL
   * @param timestamp
   */
  const [postData, setPostData] = useState({});
  const [userData, setUserData] = useState({});
  /** likes */
  const [likesDataa, setLikes] = useState([]);
  /** saves */
  const [savesDataa, setSaves] = useState([]);

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
              console.log({ likesData, saveData });
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
    };
  }, [postId, currentUser]);

  /** like submit handler */

  /** save submit handler validate with owner*/

  return (
    postData && (
      <div>
        {/** post content */}
        <div className="border border-gray-400 lg:border-gray-400 bg-card p-4">
          <>
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
          </>
          <div className="mb-5">
            <div className="flex flex-row items-center gap-5 mb-2 justify-between">
              <div>
                <div className="text-gray-900 font-bold text-xl">{postData.title}</div>
                {/** category */}
                <p className="inline-block bg-primary rounded-full px-2 text-sm font-semibold text-primary">{postData.category}</p>
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
          <div classname="w-full flex flex-row justify-between">
            {/** like button */}
            <button>
              <SlLike size={20} />
            </button>
            {/** save validate with owner */}
            {postData && postData.userId !== currentUser.userId ? (
              <button>
                <BsSave size={20} />
              </button>
            ) : (
              <></>
            )}
            {/** comment action */}
            <button>
              <FaRegCommentAlt size={20} classname="inline-block" />
            </button>
          </div>
        </div>
      </div>
    )
  );
});

export default PostCard;
