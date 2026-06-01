const blogRouter = require('express').Router()
const { ReturnDocument } = require('mongodb')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

  body = request.body

  if (!body.url || !body.title) return response.status(400).json({error: "Request must contain title and url"})

  const user = await User.findById(body.userId)

  if (!user) return response.status(400).json({ error: 'userId missing or not valid' })

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id 

  const result = await Blog.findByIdAndDelete(id)
  response.status(201).json(result)
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

module.exports = blogRouter