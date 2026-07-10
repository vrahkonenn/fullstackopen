import Togglable from './Togglable'
import { useState } from 'react'

const Blog = ({ blog, handleLike, user, handleDeleteBlog }) => {
  const [visibility, setVisibility] = useState(false)
  const toggleVisibility = () => {setVisibility(!visibility)}

  return(
    <div style={{ border: '1px solid black', padding: '5px', margin: '10px' }}>
      {blog.title} by {blog.author} <button onClick={ toggleVisibility }>{ !visibility && 'Show' }{ visibility && 'Hide' }</button>

      {visibility && (
        <div>
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button onClick={() => handleLike(blog.id)}>like</button></p>
          <p>{blog.user[0].username}</p>
          {user.id === blog.user[0].id && <button onClick={() => handleDeleteBlog(blog.id)}>Delete</button>}
        </div>
      )}
    </div>
  )
}

export default Blog