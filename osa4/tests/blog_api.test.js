const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')

beforeEach(async() =>{
  await User.deleteMany({})
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  let authorization
  beforeEach(async () =>{
    const user = {
      username: 'yeet',
      name: 'yeet',
      password: 'yeet'
    }
    await api
      .post('/api/users')
      .send(user)

    const result = await api
      .post('/api/login')
      .send(user)

    authorization = {
      'Authorization': `bearer ${result.body.token}`}
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .set(authorization)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs have to have an id', async () => {
    const blog = await Blog.find({})
    expect(blog[0]._id).toBeDefined()
  })
})
describe('addition of a new blog',() => {
  let authorization
  beforeEach(async () =>{
    const user = {
      username: 'yeet',
      name: 'yeet',
      password: 'yeet'
    }
    await api
      .post('/api/users')
      .send(user)

    const login = await api
      .post('/api/login')
      .send(user)

    authorization = {'Authorization': `bearer ${login.body.token}`}
  })

  test('a valid blog can be added', async () =>{
    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7
   }
    await api 
      .post('/api/blogs/')
      .send(newBlog)
      .expect(200)
      .set(authorization)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map(n => n.title)
    expect(title).toContain('React patterns')
  })

  test('likes not determined will equal to 0', async () =>{
    const newBlog = {
      title: 'Likes not found',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/'
   }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .set(authorization)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const like = blogsAtEnd.find(n=> n.title === 'Likes not found')
    expect(like.likes).toBe(0)
  })

  test('blog without title and url isnt added', async () =>{
    const newBlog = {
      author: 'Haksa', 
      likes: 0
   }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(authorization)
      .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

afterAll(() => {
  mongoose.connection.close()
})