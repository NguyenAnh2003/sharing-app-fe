import React, { useEffect, useRef, useState } from 'react';
import { getCommentsByPostId } from '../../libs';
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material';
import { FaRegCommentAlt } from 'react-icons/fa';
import Input from '../Input';

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
  const [comments, setComments] = useState([]);
  /** ref */
  const commentRef = useRef(null);

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
            <div className='px-10 relative'>
              <Input name="text" type="text" placeHolder="Your expression" ref={commentRef} />
              <FaRegCommentAlt size={20} className="cursor-pointer absolute top-2 right-14" />
            </div>
            <div className="overflow-y-scroll h-full"></div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CommentModal;
