import React, { useCallback, useRef } from 'react';
import { GrUpdate } from 'react-icons/gr';
import Input from '../Input';
import { Backdrop, Box, Fade, Modal } from '@mui/material';
import { updateProfile } from '../../libs';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const style = {
  width: 300,
  height: 50,
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

const UpdateNameModal = ({ open, handleClose }) => {
  const currentUser = useSelector((state) => state.currentUser.userId);
  const nameRef = useRef();

  const updateHandler = useCallback(async () => {
    try {
      const { data, status } = await updateProfile(currentUser.userId, nameRef.current.value);
      if (status === 200) toast.success('Update successfully');
    } catch (error) {
      toast.error("Cannot update user")
    }
  }, [currentUser]);

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
            <div className="relative">
              <Input name="text" type="text" placeHolder="Your name" ref={nameRef} />
              <GrUpdate
                size={20}
                className="cursor-pointer absolute top-2 right-3"
                onClick={updateHandler}
              />
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default UpdateNameModal;
