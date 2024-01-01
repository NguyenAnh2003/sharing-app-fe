import React, { useState } from 'react';

/**
 *
 */

const PostCard = React.memo(({postId}) => {
  const [postData, setPostData] = useState({});
  console.log('Re-render from postCard?');
  return <div></div>;
});

export default PostCard;
