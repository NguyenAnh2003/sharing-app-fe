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

const UploadFile = ({ setUrl }) => {
  /** set image url */
  const [file, setFile] = useState(null);
  const currentUser = useSelector((state) => state.currentUser.userId);
  const [img, setImg] = useState();

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadHandler = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data, status } = await uploadFile(formData); // form data
      if (status === 200) {
        // setImage(data);
        console.log('image', data);
        setImg(data);
        toast.success('Uploaded successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.data);
    }
  }, [currentUser, file]);

  return (
    <div>
      <p>Module test for uploading</p>
      <input type="file" onChange={fileChangeHandler} />
      <img src={img}></img>
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
