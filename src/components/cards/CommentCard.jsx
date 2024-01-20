import React, { useCallback, useState } from 'react';
import { deleteComment } from '../../libs';

const CommentCard = React.memo(({ commentId, userId, postId, setComments }) => {
  /** props
   * @prop commnetId -> id
   * @prop userId
   * @prop postId
   * @prop content
   * @prop setComments
   */

  const [record, setRecord] = useState({}); // set comment entity

  /** delete handler */
  const deleteCommentHandler = useCallback(async () => {
    try {
      const { status } = await deleteComment(commentId);
      if (status === 204) {
        setComments((prev) => {
          return prev.filter((x) => x.id !== commentId);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [commentId]);

  return <div></div>;
});

export default CommentCard;
