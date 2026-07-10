import { useState } from 'react'

const CreateBlogForm = ({ handleCreateBlog }) => {
  // Blogin luonnin tilat
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreateBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      <h2>Create new blog</h2>
      <div>
        <label>
          Title:
          <input type='text' value={title} onChange={({ target }) => setTitle(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          Author:
          <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          Url:
          <input type='text' value={url} onChange={({ target }) => setUrl(target.value)}/>
        </label>
      </div>
      <button type='submit' style={{ 'marginTop':10 }}>Create</button>
    </form>
  )
}

export default CreateBlogForm