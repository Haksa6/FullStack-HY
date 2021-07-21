import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [updatedBlog, setUpdate] = useState(blog)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5 }

  const addLike = () => {
    const likedBlog = ({ ...blog, likes: blog.likes +1 })
    updateBlog(likedBlog)
    setUpdate(likedBlog)

  }
  const removeBlog = async(event) => {
    event.preventDefault()
    deleteBlog(blog)
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const username = blog.user?.username

  return(
    <div>
      <div className='blog' style = {hideWhenVisible}>
        {blog.title} {blog.author}<button id='view' onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>{updatedBlog.likes} <button id='like' onClick={addLike}>like</button></p>
        <p> {username}</p>
        <button id='remove' onClick={removeBlog}>remove</button>
      </div>
    </div>
  )}

export default Blog