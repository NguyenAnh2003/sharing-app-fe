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
        <h1 className="text-xl font-semibold underline">{postData.title}</h1>
        <p>{postData.description}</p>
        {/** user data */}
        <p>{userData.name}</p>
        {/** category data */}
        <p>{categoryData.category}</p>
      </div>
    )
  );
});

export default PostCard;
