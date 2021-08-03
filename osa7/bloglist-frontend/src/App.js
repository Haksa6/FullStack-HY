import React, { useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { login, logout } from './reducers/loginReducer'

import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom'
import CurrentUser from './components/CurrentUser'
import CurrentBlog from './components/CurrentBlog'
import { Table, Form, Button } from 'react-bootstrap'
import Menu from './components/Menu'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.loginUser)
  const users = useSelector(state => state.users)

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs()),dispatch(initializeUsers()),dispatch(initializeUser())
  }, [dispatch])

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(login(username,password))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const match = useRouteMatch('/users/:id')
  const addedBlogs = match ? blogs.filter(blog => blog?.user?.id === match.params.id) : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const singleBlog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null


  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              id="username"
            />
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="password"
              id="password"
            />
            <Button variant="primary" type="submit">
              login
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }


  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div className="container">
      <Menu user={user} handleLogout={handleLogout}/>
      <h2>blog app</h2>
      <Notification />
      <Switch>
        <Route path="/users/:id">
          <CurrentUser blogs = {addedBlogs}/>
        </Route>
        <Route path="/blogs/:id">
          <CurrentBlog blog={singleBlog} own={user.username===singleBlog?.user?.username}/>
        </Route>
        <Route path="/users">
          <h2> Users </h2>
          {users.map(user =>
            <Users
              key={user.id}
              user={user}
            />
          )}
        </Route>
        <Route path="/">
          <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
            <NewBlog  />
          </Togglable>
          <Table striped>
            <tbody>
              {blogs.sort(byLikes).map(blog =>
                <Blogs
                  key={blog.id}
                  blog={blog}
                />
              )}
            </tbody>
          </Table>
        </Route>
      </Switch>
    </div>
  )
}

export default App