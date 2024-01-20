import React, { useCallback, useState } from 'react';
import { deleteComment } from '../../libs';

const CommentCard = React.memo(({ commentId, userId, postId, content, setComments }) => {
  /** props
   * @prop commnetId -> id
   * @prop userId
   * @prop postId
   * @prop content
   * @prop setComments
   */

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

  return (
    <div className="cursor-pointer p-2">
      <div className="underline">{userId}</div>
      <p>{content}</p>
    </div>
  );
});

export default CommentCard;
