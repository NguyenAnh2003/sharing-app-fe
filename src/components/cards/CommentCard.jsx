import React, { useState } from 'react';

const CommentCard = React.memo(({ commentId }) => {
  /** props
   * @prop commnetId -> id
   * @prop userId
   * @prop postId
   * @prop content
   */
  const [record, setRecord] = useState({}); // set comment entity

  return <div></div>;
});

export default CommentCard;
