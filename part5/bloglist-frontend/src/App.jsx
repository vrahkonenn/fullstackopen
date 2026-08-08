import { useState, useEffect, useRef, use } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate, useMatch
} from 'react-router-dom'
import { Container } from '@mui/material'

// Komponentit
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import BlogList from './components/BlogList'
import IndividualBlog from './components/IndividualBlog'
import NavBar from './components/NavBar'

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

  const handleCreateBlog = async ({ title, author, url }) => {
    try {
      const newBlog = await blogService.createBlog({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      notificationSetter(`Created blog: ${newBlog.title} written by ${newBlog.author}`)
      navigate('/')
    } catch (err) {
      console.log(err)
      const message = err.response?.data?.error || 'Something went wrong'
      notificationSetter(message, true)
    }
  }

  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({ username, password })
      setUser(loggedUser)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser))
      notificationSetter(`Logged in as ${loggedUser.username}`)
      setUsername('')
      setPassword('')
      navigate('/')
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
    navigate('/')
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
      navigate('/')
    }
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
        <NavBar user={user} handleLogOut={handleLogOut} />
        <Routes>
          <Route path='/' element={<Home blogs={blogs} handleLike={handleLike} handleDeleteBlog={handleDeleteBlog} user={user} notification={notification} errorNotification={errorNotification} handleCreateBlog={handleCreateBlog} />} />
          <Route path='/login' element={<LoginForm notification={notification} errorNotification={errorNotification} handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>} />
          <Route path='/blogs/:id' element={<IndividualBlog blog={blog} handleLike={handleLike} user={user} handleDeleteBlog={handleDeleteBlog} />} />
          <Route path='/create' element={<CreateBlogForm handleCreateBlog={handleCreateBlog}/>} />
        </Routes>
    </div>

  )
}

export default App