import React, { useCallback, useEffect, useState } from 'react';
import { deleteComment, getUserById } from '../../libs';
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-hot-toast';

const CommentCard = React.memo(({ commentId, userId, postId, content, setComments }) => {
  /** props
   * @prop commnetId -> id
   * @prop userId
   * @prop postId
   * @prop content
   * @prop setComments
   */
  const [user, setUser] = useState({});

  /** fetch user info */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status } = await getUserById(userId);
        if (status === 200) {
          setUser(data);
        }
      } catch (error) {
        console.error(error.data);
        toast.error(error.data);
      }
    };

    /** function call */
    fetchData();

    /** remove */
    return () => {
      setUser({});
    };
  }, [commentId, userId]);

  /** delete handler */
  const deleteCommentHandler = useCallback(async () => {
    try {
      const { status } = await deleteComment(commentId);
      if (status === 204) {
        setComments((prev) => {
          return prev.filter((x) => x.id !== commentId);
        });
        toast.success("Deleted comment")
      }
    } catch (error) {
      console.error(error);
    }
  }, [commentId]);

  return (
    <div className="cursor-pointer flex flex-row justify-between items-center p-2 hover:bg-primary duration-300 border-b-gray">
      <div>
        <Link to={`/account/${user.id}`} className="flex flex-row items-center">
          {/** user image setup with userData */}
          <img className="w-8 h-8 rounded-full mr-2" src={user.avatarURL} alt={user.name} />
          <p className="text-primary text-sm font-semibold">{user.name}</p>
        </Link>
        <p className="text-sm">{content}</p>
      </div>
      {/** delete btn */}
      <MdDeleteOutline size={25} onClick={deleteCommentHandler} />
    </div>
  );
});

export default CommentCard;
