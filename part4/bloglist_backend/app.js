const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const { info, error } = require('./utils/logger')
const app = express()
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

info('Connecting to: ', config.mongoUrl)

mongoose
  .connect(config.mongoUrl, { family: 4 })
  .then(info('connected to MongoDB'))
  .catch(err => error('Error connecting to MongoDB: ', err))

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
