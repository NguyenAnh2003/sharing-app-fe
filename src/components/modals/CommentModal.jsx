import React, { useEffect, useState } from 'react';
import { getCommentsByPostId } from '../../libs';

const CommentModal = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    /** fetch data */
    const fetchData = async () => {
      const { data, status } = await getCommentsByPostId(postId);
      if (status === 200) console.log('comments', data);
    };

    fetchData();

    /** remove data */
    return () => {
      setComments([]);
    };
  }, []);

  return <div>hello</div>;
};

export default CommentModal;
