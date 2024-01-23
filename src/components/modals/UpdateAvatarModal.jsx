import React, { useCallback, useState } from 'react';
import { Backdrop, Box, Fade, Modal } from '@mui/material';
import toast from 'react-hot-toast';
import { uploadFile } from '../../libs';
import { GrUpdate } from 'react-icons/gr';

const style = {
  width: 350,
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

const UpdateAvatarModal = ({ open, handleClose, setImageUrl, currentImage }) => {
  const [file, setFile] = useState(null);

  const [uploadedImage, setUploadedImage] = useState();

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadHandler = useCallback(async () => {
    try {
      if (file === null) toast.error('No file chosen');
      else {
        const formData = new FormData();
        formData.append('file', file);

        const { data, status } = await uploadFile(formData); // form data
        if (status === 200) {
          console.log('image', data);
          setImageUrl(data); // parent
          setUploadedImage(data); // children
          toast.success('Uploaded successfully');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.data);
    }
  }, [file]);

  return (
    <div>
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
              <div className="flex justify-center">
                <img
                  src={uploadedImage ? uploadedImage : currentImage}
                  alt={'haha'}
                  className="w-60 h-60 rounded-full"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              {/** input */}
              <div className="relative mt-5">
                <input
                  class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  onChange={fileChangeHandler}
                  id="formFileMultiple"
                />
                <GrUpdate
                  size={20}
                  className="cursor-pointer absolute top-2 right-3"
                  onClick={uploadHandler}
                />
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default UpdateAvatarModal;
