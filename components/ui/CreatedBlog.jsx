import Image from "next/image";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CreatedBlog = ({
  blogs,
  error,
  loading,
  setFormData,
  setIsUpId,
  handleDeleteBlog,
}) => {
  if (loading) <p>Loading...</p>;
  if (error) {
    <p>Something went wrong</p>;
    return;
  }

  const updateBlog = (data) => {
    setFormData({
      title: data.title,
      description: data.description,
      image: data.image,
    });
    setIsUpId(data._id);
  };

  return (
    <div className='space-y-5 '>
      {blogs &&
        blogs.map((blog) => (
          <div
            key={blog._id}
            className='shadow-sm rounded p-4 hover:shadow-lg transition-all duration-500 space-y-2'
          >
            <h1 className='text-2xl font-semibold'>
              {blog.title.slice(0, 70)}
            </h1>

            <figure className='max-w-2xl h-64'>
              <Image
                height={700}
                width={1200}
                src={blog.image}
                alt={blog.title}
                className='h-full w-full object-cover'
                priority
              />
            </figure>
            <p className='text-base'>{blog.description.slice(0, 150)}...</p>

            <div className='flex justify-between mt-2'>
              <span onClick={() => updateBlog(blog)} className='cursor-pointer'>
                <FaEdit />
              </span>
              <span
                onClick={() => handleDeleteBlog(blog._id)}
                className='cursor-pointer'
              >
                <MdDelete />
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CreatedBlog;
