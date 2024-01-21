import React, { useCallback } from 'react';
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
  const [image, setImage] = useState('');
  const currentUser = useSelector((state) => state.currentUser.userId);

  const uploadHandler = useCallback(async () => {
    try {
      const { data, status } = await uploadFile();
      if (status === 200) {
        setImage(image);
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
      <input type="file" />
      <img src={image}></img>
      <button>Submit</button>
    </div>
  );
};

export default UploadFile;
