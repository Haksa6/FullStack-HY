/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'

const byLikes = (a1, a2) => a2.likes - a1.likes

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data.sort(byLikes)
  case 'LIKE':
    const blogToChange = state.find(n => n.id === action.data.id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    return state.map(blog =>
      blog.id !== action.data.id ? blog : changedBlog)
  case 'CREATE':
    return [...state, action.data]
  case 'DELETE':
    return state.filter(n => n.id !== action.data.id)
  case 'COMMENT':
    const blogToComment = state.find(n => n.id === action.data.id)
    const commentedBlog = {
      ...blogToComment,
      comments: action.data.comments
    }
    return state.map(blog =>
      blog.id !== action.data.id ? blog : commentedBlog)
  default:
    return state
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const data = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const toLike = { ...blog, likes: blog.likes + 1 }
    const data = await blogService.update(toLike)
    dispatch({
      type: 'LIKE',
      data
    })
  }
}
export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data: { id }
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const data = await blogService.comment(id, comment)
    dispatch({
      type: 'COMMENT',
      data
    })
  }
}

export default reducer