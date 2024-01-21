import React, { useState } from 'react';
import UploadFile from '../components/UploadFile';
import Input from '../components/Input';
import { useSelector } from 'react-redux';

const CreatePostPage = () => {
  const currentUser = useSelector((state) => state.currentUser.userId);
  /**
   * @param title
   * @param description
   * @param userId -> currentUser.userId
   * @param categoryId -> fetch category
   * @param imageUrl
   */
  const [imageUrl, setUrl] = useState();

  return (
    <div className="container-2xl mx-10">
      <h1 className="headingPage">Create your own post</h1>

      <div className="grid grid-cols-4 gap-12">
        {/** form for create post */}
        <div className="col-span-3">
          <form className="col-span-2 flex flex-col">
            <div className="flex flex-col gap-4 mb-4">
              <Input />
            </div>
          </form>
        </div>
        {/** upload file form */}
        <div className="">
          <UploadFile setUrl={setUrl} />
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
