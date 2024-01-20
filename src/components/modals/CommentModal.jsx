import React, { useEffect, useState } from 'react';
import { getCommentsByPostId } from '../../libs';
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CommentModal = ({ open, handleClose, postId }) => {
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

  return (
    <div>
      <Modal
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
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CommentModal;
