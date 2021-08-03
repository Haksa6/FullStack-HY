import React from 'react'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

const CurrentBlog = ({ blog, own }) => {
  const dispatch = useDispatch()

  const handleRemove = () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if(ok){
      dispatch(deleteBlog(blog.id))
    }
  }

  const BlogAddedBy = () => {
    if(!blog?.user?.name) return(null)
    return(
      <p>Added by {blog.user.name} {own&&<button onClick={() => handleRemove()}>remove</button>}</p>
    )
  }

  return (
    <div>
      <h2>{blog?.title} {blog?.author}</h2>
      <a href={`${blog?.url}`}> {blog?.url}</a>
      <p>{blog?.likes} likes <Button variant="success" onClick={() => dispatch(likeBlog(blog))}>like</Button></p>
      <BlogAddedBy/>
      <h3>comments</h3>
      <ul>
        {blog?.comments.map(comment =>
          <li key={comment}>
            {comment}
          </li>
        )}
      </ul>
    </div>
  )
}

export default CurrentBlog