"use client";
import { useFetch } from "@/lib/swr";
import Image from "next/image";
import Link from "next/link";

const Blogs = () => {
  const { data: blogs, error, isLoading } = useFetch("/api/blog");
  if (isLoading) {
    <p>Loading..</p>;
  }
  if (error) {
    return <p>Something went wrong!</p>;
  }
  return (
    <div className='grid lg:grid-cols-3  gap-5 mt-5 lg:mt-10'>
      {blogs &&
        blogs.map((blog) => (
          <Link
            href={`/blog/${blog.title.split(" ").join("-")}`}
            key={blog._id}
            className='block shadow-sm rounded p-4 hover:shadow-lg transition-all duration-500 space-y-2 cursor-pointer'
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
          </Link>
        ))}
    </div>
  );
};

export default Blogs;
