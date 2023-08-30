import React from 'react';
import { useState } from 'react';

/**
 * Post Image URL
 * avatar user URL
 * */

const UploadFile = () => {
  const postImgURL = "https://scontent.fdad4-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=5u62LPpCL0kAX8HfD6c&_nc_ht=scontent.fdad4-1.fna&oh=00_AfB7Ra6szL7-CfX_YUIiLJeeMKyq_sq0yQHjFUWmqurZFQ&oe=650EFC78"
  const [image, setImage] = useState(postImgURL);
  
  return (
    <div>
      <p>Module test for uploading</p>
      <input type="file"/>
      <img src={image}></img>
      <button>Submit</button>
    </div>
  );
};

export default UploadFile;
