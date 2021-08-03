import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notificationChange } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'


const NewBlog = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const author = event.target.author.value
    const title = event.target.title.value
    const url = event.target.url.value
    event.target.author.value = ''
    event.target.title.value = ''
    event.target.url.value = ''
    const content = {
      author: author,
      title: title,
      url: url
    }
    dispatch(createBlog(content))
    dispatch(notificationChange(`a new blog '${content.title}' by ${content.author} added!`, 5000, 'success'))
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          author
          <input
            id='author'
          />
        </div>
        <div>
          title
          <input
            id='title'
          />
        </div>
        <div>
          url
          <input
            id='url'
          />
        </div>
        <Button variant="success" id="create">create</Button>
      </form>
    </div>
  )
}

export default NewBlog