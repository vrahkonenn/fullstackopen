const {beforeEach, test, after, describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const { initialBlogs, testUser, blogsInDb } = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)
let user
let token = null

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    await api
    .post('/api/users')
    .send(testUser)
    
    user = await User.findOne({ username: 'testuser' })

    for (const blog of initialBlogs) {
        const blogObject = new Blog({
            ...blog,
            user: user._id
        })

        await blogObject.save()
        user.blogs = user.blogs.concat(blogObject._id)
    }

    await user.save()
    
    const res = await api
    .post('/api/login')
    .send({username: "testuser", password: "testpass"})
    
    token = res.body.token
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
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            userId: user.id
        }  

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: `Bearer ${token}`})
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsInDb()        

        assert.strictEqual(blogsAtEnd.length, initialBlogs.length+1)
    })

    test("New blog can't be added without a token", async () => {
        const newBlog = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            userId: user.id
        }  
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await blogsInDb()        

        assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
          
        })

    test('If likes not given when adding a blog, likes are set 0', async () => {
          const newBlog = {
            title: "New Blog",
            author: "Some dude",
            url: "blog.com",
            userId: user.id
          }  

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: `Bearer ${token}`})
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
            .set({ Authorization: `Bearer ${token}`})
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
            .set({ Authorization: `Bearer ${token}`})
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('A blog can be deleted', async () => {
        const id = initialBlogs[0]._id 

        const response = await api
            .delete(`/api/blogs/${id}`)
            .set({ Authorization: `Bearer ${token}`})
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