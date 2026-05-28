const blogRouter = require('express').Router()
const { ReturnDocument } = require('mongodb')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

  body = request.body

  if (!body.url || !body.title) return response.status(400).json({error: "Request must contain title and url"})

  const blog = new Blog({
    author: body.author,
    title: body.title,
    likes: body.likes || 0
  })

  const result = await blog.save()
  response.status(201).json(result)
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