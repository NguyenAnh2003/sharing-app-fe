import React, { useEffect, useRef, useState } from 'react';
import { createComment, getCommentsByPostId } from '../../libs';
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material';
import { FaRegCommentAlt } from 'react-icons/fa';
import Input from '../Input';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import CommentCard from '../cards/CommentCard';

const style = {
  width: 600,
  height: 500,
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  paddingBottom: 10,
};

const CommentModal = ({ open, handleClose, postId }) => {
  const currentUser = useSelector((state) => state.currentUser.userId);
  const [comments, setComments] = useState([]);
  /** ref */
  const commentRef = useRef(null);

  useEffect(() => {
    /** fetch data */
    const fetchData = async () => {
      const { data, status } = await getCommentsByPostId(postId);
      if (status === 200) {
        setComments(data);
      }
    };

    fetchData();

    /** remove data */
    return () => {
      setComments([]);
    };
  }, []);

  /** add */
  const commentSubmitHandler = useCallback(async () => {
    try {
      if (commentRef.current.value !== '') {
        const { data, status } = await createComment(
          currentUser.userId,
          postId,
          commentRef.current.value
        );
        if (status === 200) {
          console.log('create comment', data);
          /** add comment ent */
          setComments((prev) => {
            return [...prev, data];
          });
          commentRef.current.value = ''
        }
      } else toast.error('Must not be empty');
    } catch (error) {
      console.error(error.data);
      toast.error(error.data);
    }
  }, [currentUser, comments]);

  return (
    <div>
      <Modal
        className=""
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open} className="overflow-hidden">
          <Box sx={style}>
            {/** input */}
            <div className="px-10 relative">
              <Input name="text" type="text" placeHolder="Your expression" ref={commentRef} />
              <FaRegCommentAlt
                onClick={commentSubmitHandler}
                size={20}
                className="cursor-pointer absolute top-2 right-14"
              />
            </div>
            <div className="overflow-y-scroll h-full">
              {/** comment list */}
              {comments.map((i, idx) => (
                <CommentCard
                  key={idx}
                  commentId={i.id}
                  userId={i.userId}
                  postId={i.postId}
                  content={i.content}
                  setComments={setComments}
                />
              ))}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CommentModal;
