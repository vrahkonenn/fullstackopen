const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const { info, error } = require('./utils/logger')
const app = express()
const blogRouter = require('./controllers/blogs')

info('Connecting to: ', config.mongoUrl)

mongoose
  .connect(config.mongoUrl, { family: 4 })
  .then(info('connected to MongoDB'))
  .catch(err => error('Error connecting to MongoDB: ', err))

app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app
