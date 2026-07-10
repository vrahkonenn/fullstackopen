import { useState, useEffect, useRef } from 'react'

// Komponentit
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'

// Servicet
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  // Blogien tila
  const [blogs, setBlogs] = useState([])

  // Käyttäjän tilat
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Notifikaatio tilat
  const [notification, setNotification] = useState('')
  const [errorNotification, setErrorNorification] = useState('')

  // Refit
  const blogFormRef = useRef()

  // Hookit
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const parsedUser = JSON.parse(loggedUserJson)
      setUser(parsedUser)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
    } else {
      blogService.setToken(null)
    }
  }, [user])

  // Metodit
  const notificationSetter = (message, error = false) => {
    // Jos error on false, renderöidään normaali notification, muutoin error viesti
    if (!error) {
      setNotification(message)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    else {
      setErrorNorification(message)
      setTimeout(() => {
        setErrorNorification(null)
      },5000)
    }
  }

  const loginForm = () => {
    return(
      <form onSubmit={handleLogin}>
        <h2>Log in to application</h2>
        <div>
          <label>
            Username
            <input type="text" value={username} onChange={({ target }) => setUsername(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="text" value={password} onChange={({ target }) => setPassword(target.value)}/>
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>
    )
  }

  const blogForm = () => {
    return(
      <div>
        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDeleteBlog={handleDeleteBlog} user={user}/>
        )}
      </div>
    )
  }

  const handleCreateBlog = async ({ title, author, url }) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.createBlog({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      notificationSetter(`Created blog: ${newBlog.title} written by ${newBlog.author}`)
    } catch (err) {
      console.log(err)
      const message = err.response?.data?.error || 'Something went wrong'
      notificationSetter(message, true)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({ username, password })
      setUser(loggedUser)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser))
      notificationSetter(`Logged in as ${loggedUser.username}`)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err)
      const message = err.response?.data?.error || 'Something went wrong'
      notificationSetter(message, true)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogOut = () => {
    setUser(null)
    notificationSetter('Logged out')
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const handleLike = async (id) => {
    const updatedBlog = await blogService.likeBlog(id)

    setBlogs(prevBlogs => prevBlogs.map(b => b.id === id ? updatedBlog : b))
  }

  const handleDeleteBlog = async (id) => {
    const blogToDelete = await blogs.filter(blog => blog.id === id)
    if (window.confirm(`Are you sure to delete blog "${blogToDelete[0].title}"`)) {
      await blogService.deleteBlog(id)
      const updatedBlogs = blogs.filter(blog => blog.id !== id)
      setBlogs(updatedBlogs)
      notificationSetter(`Deleted blog "${blogToDelete[0].title}"`)
    }
  }

  return (
    <div>
      {!user &&
      <div>
        <Notification notification={notification} errorNotification={errorNotification} />
        {loginForm()}
      </div>
      }
      {user &&
      <div>
        <h1>Blogs</h1>
        <p>{user.username} logged in <button onClick={handleLogOut}>Log out</button></p>
        <Notification notification={notification} errorNotification={errorNotification}/>
        <Togglable buttonLabel="Create blog" ref={blogFormRef}>
          <CreateBlogForm handleCreateBlog={handleCreateBlog}/>
        </Togglable>
        {blogForm()}
      </div>}
    </div>
  )
}

export default App