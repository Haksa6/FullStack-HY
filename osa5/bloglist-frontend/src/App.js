/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async(blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setBlogs(blogs.concat(returnedBlog))
  }
  const updateBlog = async(blogObject) => {
    const returnedBlog = await blogService.update(blogObject)
    setBlogs(blogs.map(b => b.id !== blogObject.id ? b : blogObject))
  }

  const deleteBlog = async(blogObject) => {
    if(window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)){
      const returnedBlog = await blogService.remove(blogObject.id)
      setBlogs(blogs.filter(b => b.id !== blogObject.id))
    }
  }


  const handleLogout = async(event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="create a new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog}
      />
    </Togglable>
  )




  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <Notification message={errorMessage} />
          <p><b>{user.name} </b> logged in
            <button onClick={
              handleLogout}>logout</button></p>
          {blogForm()}
          {blogs.sort((a,b) => b.likes-a.likes ).map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
          )}
        </div>
      }

    </div>
  )
}

export default App