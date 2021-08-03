import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blogs = ({ blog }) => {

  return (
    <tr>
      <td>
        <div className='blog'>
          <Link to={`blogs/${blog.id}`}><i>{blog.title}</i> by {blog.author} </Link>
        </div>
      </td>
    </tr>
  )
}

Blogs.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export default Blogs