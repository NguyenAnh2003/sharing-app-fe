import React, { useCallback, useRef } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { uploadFile } from '../libs';

/**
 * Post Image URL
 * avatar user URL
 * */

const UploadFile = ({ setUrl }) => {
  /** set image url */
  const [image, setImage] = useState(null);
  const currentUser = useSelector((state) => state.currentUser.userId);

  const fileChangeHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadHandler = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('file', image);

      const { data, status } = await uploadFile(formData); // form data
      if (status === 200) {
        // setImage(data);
        console.log('image', data);
        toast.success('Uploaded successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.data);
    }
  }, [currentUser, image]);

  return (
    <div>
      <p>Module test for uploading</p>
      <input type="file" onChange={fileChangeHandler} />
      <img src={image}></img>
      <button
        onClick={uploadHandler}
        className="font-semibold py-2 px-4 w-full rounded bg-btn text-white"
      >
        Submit
      </button>
    </div>
  );
};

export default UploadFile;
