import React, { useState } from 'react';
import UploadFile from './UploadFile';

const CreatePostPage = () => {
  const [imageUrl, setUrl] = useState();
  return (
    <div className="container-2xl mx-10 grid grid-cols-3">
      {/** form for create post */}
      <p>Create post here right here</p>
      {/** upload file form */}
      <UploadFile setUrl={setUrl} />
    </div>
  );
};

export default CreatePostPage;
