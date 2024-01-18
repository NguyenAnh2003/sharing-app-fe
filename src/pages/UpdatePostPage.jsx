import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdatePostPage = () => {
  const { postId } = useParams();
  useEffect(() => {
    console.log('update post with', postId);
  }, []);
  return <div>
    Hello user
  </div>;
};

export default UpdatePostPage;
