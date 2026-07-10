const blogRouter = require('express').Router()
const { ReturnDocument } = require('mongodb')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
        return response.status(401).json({ error: 'Token invalid or missing'})
  }
  const user = request.user

  if (!user) return response.status(400).json({ error: 'userId missing or not valid' })

  if (!body.url || !body.title) return response.status(400).json({error: "Request must contain title and url"})

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', {username: 1, name: 1})
  response.status(201).json(populatedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const id = request.params.id 
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
        return response.status(401).json({ error: 'Token invalid or missing'})
  }

  const blogToDelete = await Blog.findById(id)

  if (!blogToDelete) {
    return response.status(401).json({ error: 'blog not found'})
  }
  
  if (!(blogToDelete.user.toString() === decodedToken.id.toString())) {
    return response.status(401).json({ error: "This user can't remove this blog"})
  }
  await Blog.findByIdAndDelete(id)  
  console.log(`${decodedToken.username} deleted ${blogToDelete.title}`)
  response.status(201).json({ message: 'deletion succesful'})
})

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { returnDocument: 'after' }
  )

  response.json(updatedBlog)
})

blogRouter.put('/:id/like', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
        return response.status(401).json({ error: 'Token invalid or missing'})
  }

  if (!blog) return response.status(404).json({ error: 'blog not found'})
    
  blog.likes += 1
  await blog.save()

  const populatedBlog = await Blog.findById(request.params.id).populate('user', {username: 1, name: 1})
  response.json(populatedBlog)  
})

module.exports = blogRouter