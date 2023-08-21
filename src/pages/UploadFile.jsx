import React from 'react';
import { useState } from 'react';

const UploadFile = () => {
  const [file, setFile] = useState();

  return (
    <div>
      <p>Module test for uploading</p>
      <input type="file"/>
      <button>Submit</button>
    </div>
  );
};

export default UploadFile;
