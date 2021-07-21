import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Haksa',
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library Haksa'
  )
})

test('clicking the button shows full information', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Haksa',
    url: 'Haksa.com',
    likes: 6
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} updateBlog={mockHandler} />
  )

  const viewButton = component.getByText('view')

  fireEvent.click(viewButton)

  expect(component.container).toHaveTextContent(
    'Haksa.com', 6
  )
})

test('clicking the button calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Haksa',
    url: 'Haksa.com',
    likes: 6
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} updateBlog={mockHandler} />
  )

  const likeButton = component.getByText('like')


  fireEvent.click(likeButton)
  fireEvent.click(likeButton)


  expect(mockHandler.mock.calls).toHaveLength(2)
})