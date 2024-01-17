import React, { useEffect, useMemo, useState } from 'react';
import { getCategoryById, getDataByPostId, getUserById } from '../../libs';

/**
 *
 */

const PostCard = React.memo(({ postId }) => {
  console.log(postId);
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
  const [categoryData, setCategoryData] = useState({});

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
        const { data: userData, status: userStatus } = await getUserById(data.userId);
        if (userStatus === 200 && data) {
          console.log(userData);
          setUserData(userData);
        }

        const { data: categoryData, status: categoryStatus } = await getCategoryById(
          data.categoryId
        );
        if (categoryStatus === 200 && categoryData) {
          console.log('category', categoryData);
          setCategoryData(categoryData);
        }
      }
      console.log(data);
    };

    /** call */
    fetchDataa();

    /** validate user info with custom edit */

    /** remove postData */
    return () => {
      setPostData({});
      setUserData({});
      setCategoryData({});
    };
  }, [postId]);

  console.log('Re-render from postCard?');
  return (
    postData && (
      <div>
        {/** post content */}
        <div class="border border-gray-400 lg:border-gray-400 bg-white p-4 flex flex-col justify-between leading-normal">
          <div class="mb-8">
            <div className="flex flex-row items-center gap-5 mb-3">
              <div class="text-gray-900 font-bold text-xl">{postData.title}</div>
              {/** category */}
              <p class="text-primary font-semibold">{categoryData.category}</p>
            </div>
            <p class="text-gray-700 text-base">{postData.description}</p>
            {/** post image */}
            <img className='w-full mt-3' src={postData.imageURL} alt={postData.id} />
          </div>
          <div class="flex items-center">
            <img class="w-10 h-10 rounded-full mr-4" src={userData.imageURL} alt={userData.name} />
            <div class="text-sm">
              <p class="text-primary font-semibold">{userData.name}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
});

export default PostCard;
