import React from 'react'

const CurrentUser = ({ blogs }) => {
  const user = blogs[0]?.user?.name

  if(!user){
    return null
  }


  return (
    <div>

      <h2>{user}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map(blog =>
          <li key = {blog.id}>
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default CurrentUser