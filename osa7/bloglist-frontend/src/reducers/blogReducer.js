import blogService from '../services/blogs'

const byLikes = (a1, a2) => a2.likes - a1.likes

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data.sort(byLikes)
  case 'LIKE':
    // eslint-disable-next-line no-case-declarations
    const liked = action.data
    return state.map(a => a.id===liked.id ? liked : a).sort(byLikes)
  case 'CREATE':
    return [...state, action.data]
  case 'DELETE':
    // eslint-disable-next-line no-case-declarations
    const deleted = action.data
    return state.map(a => a.id===deleted.id ? deleted : a).sort(byLikes)
  default:
    return state
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const data = await blogService.createNew(content)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
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
      id
    })
  }
}

export default reducer