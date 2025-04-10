import React from 'react'

const BlogDetails = ({blog}) => {
  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
    </div>
  )
}

export default BlogDetails