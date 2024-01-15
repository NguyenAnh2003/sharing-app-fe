import React, { useEffect, useState } from 'react';
import { getDataByPostId } from '../../libs';

/**
 *
 */

const PostCard = React.memo(({ postId }) => {
  /**
   * Post data ()
   * @param userId
   * @param categoryId, category
   * @param title
   * @param description
   * @param imageURL
   * @param timestamp
   */
  const [postData, setPostData] = useState({});

  useEffect(() => {
    const fetchDataa = async () => {
      const { data, status } = await getDataByPostId(postId);
      if (status === 200) setPostData(data);
      console.log(data);
    };
    fetchDataa();
    /** remove postData */
    return () => {
      setPostData({});
    };
  }, [postId]);

  console.log('Re-render from postCard?');
  return (
    postData && (
      <div>
        <h1 className="text-xl font-semibold underline">{postData.title}</h1>
        <p>{postData.description}</p>
      </div>
    )
  );
});

export default PostCard;
