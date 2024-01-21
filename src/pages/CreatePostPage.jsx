import React, { useCallback, useEffect, useRef, useState } from 'react';
import UploadFile from '../components/UploadFile';
import Input from '../components/Input';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createPost, getCategories } from '../libs';

const CreatePostPage = () => {
  const currentUser = useSelector((state) => state.currentUser.userId);
  const titleRef = useRef();
  const desRef = useRef();
  const [categoryId, setCategoryId] = useState();
  const [options, setOptions] = useState([]); // options of categories
  const [imageUrl, setUrl] = useState();

  /**
   * @param title
   * @param description
   * @param userId -> currentUser.userId
   * @param categoryId -> fetch category
   * @param imageUrl
   */

  /** fetching categories */
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, status } = await getCategories();
      if (status === 200) {
        console.log('categories', data);
        setOptions(data);
      }
    };
    fetchCategories();
  }, []);

  const createHandler = useCallback(async () => {
    try {
      if (
        titleRef.current.value === '' ||
        desRef.current.value === '' ||
        categoryId === '' ||
        imageUrl === ''
      )
        toast.error('Fill info first');
      else {
        const { data, status } = await createPost(
          currentUser.userId,
          categoryId,
          titleRef.current.value,
          desRef.current.value,
          imageUrl
        );
        if (status === 200) {
          toast.success('Create post successfully');
        }
      }
    } catch (error) {
      toast.error(error.data);
    }
  }, [currentUser]);

  return (
    <div className="container-2xl mx-10">
      <h1 className="headingPage">Create your own post</h1>

      <div className="grid grid-cols-4 gap-12">
        {/** form for create post */}
        <div className="col-span-3 pr-40">
          <form className="col-span-2">
            <div className="flex flex-col gap-4 mb-4">
              <Input />
            </div>
            {/** categories */}
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
