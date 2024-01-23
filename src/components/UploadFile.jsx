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
    'https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg'
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
    <div className="w-[300px]">
      {/** display image */}
      <div className="mb-5">
        <img
          style={{ objectFit: 'cover' }}
          className="w-full h-[187px]"
          src={imageUrl ? imageUrl : img}
          alt="image"
        />
      </div>
      <div className="">
        <>
          <input
            class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            type="file"
            onChange={fileChangeHandler}
            id="formFileMultiple"
          />
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
