import React, { useCallback, useMemo, useRef } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { uploadFile } from '../libs';

/**
 * Post Image URL
 * avatar user URL
 * */

const UploadFile = ({ setUrl, imageUrl }) => {
  /** set image url */
  const [file, setFile] = useState(null);
  const currentUser = useSelector((state) => state.currentUser.userId);
  const [img, setImg] = useState(
    'http://res.cloudinary.com/drijaswh2/image/upload/v1705807950/cwfs1vnfho0rhpuxtqvu.jpg'
  );

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
          setImg(data); // display image
          setUrl(data); // set url for parent component
          toast.success('Uploaded successfully');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.data);
    }
  }, [currentUser, file]);

  return (
    <div className="w-[270px]">
      {/** display image */}
      <div className="mb-5  h-[266px]">
        <img
          style={{ objectFit: 'cover' }}
          className=" w-full"
          src={imageUrl ? imageUrl : img}
          alt="image"
        />
      </div>
      <div className="">
        <>
          <input type="file" onChange={fileChangeHandler} />
          <button
            onClick={uploadHandler}
            className="mt-5 font-semibold py-2 w-full rounded bg-btn text-white"
          >
            Submit
          </button>
        </>
      </div>
    </div>
  );
};

export default UploadFile;
