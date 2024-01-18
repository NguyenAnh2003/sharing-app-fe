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
   * @param timestamp
   */
  const [postData, setPostData] = useState({});
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchDataa = async () => {
      /**
       * @param postData
       * @param userData
       * @param categoryData
       * @param likeData
       * @param saveData
       * @param commentData
       * -> using Promise.all()
       */

      const { data, status } = await getDataByPostId(postId);
      if (status === 200 && data) {
        setPostData(data);

        /** setCategory data, setUser, setLikes, saves, comments */
        Promise.all([
          getCategoryById(data.categoryId), // category
          getUserById(data.userId), // user data
          getLikesByPostId(data.id), // category
          getSavesByPostId(data.id), // save data
          getCommentsByPostId(data.id), // comments data
        ]).then(
          ([
            /** raw define (too exhausted) */
            { data: cateData, status: cateStatus },
            { data: userData, status: userStatus },
            { data: likesData, status: likesStatus },
            { data: saveData, status: saveStatus },
            { data: commentData, status: commentStatus },
          ]) => {
            if (
              cateStatus === 200 &&
              userStatus === 200 &&
              likesStatus === 200 &&
              saveStatus === 200 &&
              commentStatus === 200
            ) {
              console.log({ likesData, saveData, commentData });
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

  return (
    postData && (
      <div>
        {/** post content */}
        <div className="border border-gray-400 lg:border-gray-400 bg-card p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="flex flex-row items-center gap-5 mb-3">
              <div className="text-gray-900 font-bold text-xl">{postData.title}</div>
              {/** category */}
              <p className="text-primary font-semibold">{postData.category}</p>
            </div>
            <p className="text-gray-700 text-base">{postData.description}</p>
            {/** post image */}
            <img className="w-full mt-3" src={postData.imageURL} alt={postData.id} />
          </div>
          <div className="flex items-center">
            {/** user image setup with userData */}
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={userData.imageURL}
              alt={userData.name}
            />
            <div className="text-sm">
              <p className="text-primary font-semibold">{postData.username}</p>
            </div>
          </div>
          {postData && postData.userId === currentUser.userId ? <p>validate user</p> : <>nope</>}
        </div>
      </div>
    )
  );
});

export default PostCard;
