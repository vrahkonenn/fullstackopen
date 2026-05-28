const {beforeEach, test, after, describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const { initialBlogs, blogsInDb } = require('./test_helper')
const Blog = require('../models/blog')
const { log } = require('node:console')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe('Blog api tests', () => {

    test('All the blogs are returned', async () => {
        const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
        
        assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('blogs have id field instead of _id', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blog = response.body[0]

    assert(blog.id)
    assert.strictEqual(blog._id, undefined)
    })

    test('new blog can be added', async () => {
        const newBlog = {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
          }  

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsInDb()        

        assert.strictEqual(blogsAtEnd.length, initialBlogs.length+1)
    })

    test('If likes not given when adding a blog, likes are set 0', async () => {
          const newBlog = {
            _id: "5a422bc61b54a676234d1745466fc",
            title: "New Blog",
            author: "Some dude",
            url: "blog.com",
            __v: 0
          }  

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        assert.strictEqual(response.body.likes, 0);
        
    })

    test('If title or url not given when adding a blog, returns code 400', async () => {
        let newBlog = {
            _id: "5a422bc61b54a676234d17fc",
            author: "Another dude",
            url: "blog2.com",
            likes: 2,
            __v: 0
          }  

        let response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        newBlog = {
            _id: "5a422bc61b54a676234d17fc",
            author: "Another dude",
            title: "New Blog 2",
            likes: 2,
            __v: 0
          }  

        response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('A blog can be deleted', async () => {
        const id = initialBlogs[0]._id 

        const response = await api
            .delete(`/api/blogs/${id}`)
            .expect(201)

        const blogsAtEnd = await blogsInDb()

        assert.strictEqual(blogsAtEnd.length, initialBlogs.length-1)
    })


    test('A blog can be updated', async () => {
        const id = initialBlogs[0]._id 
        const updatedBlog = {
            title: "This is updated!",
            author: "anonymous",
            url: "hihihaa.fi",
            likes: 4,
        }
        const response = await api
            .put(`/api/blogs/${id}`)
            .send(updatedBlog)

        const blogsAtEnd = await blogsInDb()

        assert.deepStrictEqual(blogsAtEnd[0], response.body)
    })

    after(async () => {
        await mongoose.connection.close()
    })
})