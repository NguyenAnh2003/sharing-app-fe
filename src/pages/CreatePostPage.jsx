import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import UploadFile from '../components/UploadFile';
import Input from '../components/Input';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createPost, getCategories } from '../libs';

const CreatePostPage = () => {
  const currentUser = useSelector((state) => state.currentUser.userId);
  const titleRef = useRef();
  const desRef = useRef();
  const [options, setOptions] = useState([]); // options of categories
  const [categoryId, setCategoryId] = useState();
  const [imageUrl, setUrl] = useState();

  /**
   * @param title
   * @param description
   * @param userId -> currentUser
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

  const categoryHandler = (e) => {
    console.log(e.target.value);
    setCategoryId(e.target.value);
  };

  const createHandler = useCallback(async () => {
    try {
      if (
        titleRef.current.value !== '' ||
        desRef.current.value !== '' ||
        categoryId !== null ||
        imageUrl !== null
      ) {
        const { data, status } = await createPost(
          currentUser.userId,
          categoryId,
          titleRef.current.value,
          desRef.current.value,
          imageUrl
        );
        if (status === 200) {
          console.log(data);
          toast.success('Create post successfully');
        }
      } else {
        toast.error('Fill info first');
      }
    } catch (error) {
      toast.error(error.data);
    }
  }, [currentUser, imageUrl, categoryId]);

  return (
    <div className="container-2xl mx-10 ">
      <h1 className="headingPage">Create your own post</h1>

      <div className="grid grid-cols-4 gap-0">
        {/** form for create post */}
        <div className="col-span-3 pr-40 pt-10 relative">
          <form className="col-span-2">
            <div className="flex flex-col gap-4">
              <Input placeHolder="Post title" name="text" type="text" ref={titleRef} />
              {/** text area */}
              <textarea
                placeholder="Your description"
                ref={desRef}
                className="outline-none peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100"
              />
            </div>
            {/** categories */}
            <div className="flex flex-row justify-between mt-4">
              <select onChange={categoryHandler} className="outline-none cursor-pointer">
                {options.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.category}
                  </option>
                ))}
              </select>
              <button
                onClick={createHandler}
                type="button"
                className="font-semibold py-2 px-4 rounded bg-btn text-white"
              >
                Create
              </button>
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
