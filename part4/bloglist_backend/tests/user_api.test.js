const {beforeEach, test, after, describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const {testUser, usersInDb} = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)
let user

beforeEach(async () => {
    await User.deleteMany({})
    
    const response = await api
        .post('/api/users')
        .send(testUser)
    
    user = response.body
})

describe('User api tests', () => {

    test('user creation fails with invalid data', async () => {

        usersAtStart = usersInDb()

        const user1 = {
            username: "a",
            name: "a",
            password: "password"
        }
        
        const user2 = {
            username: "abraham",
            name: "abraham",
            password: "e"
        }

        const user3 = {
            name:  "asadasd",
            password: "asdad"
        }

        const user4 = {
            username: "abraham",
            name: "abraham",
        }

        await api
            .post('/api/users')
            .send(user1)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        await api
            .post('/api/users')
            .send(user2)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        await api
            .post('/api/users')
            .send(user3)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        await api
            .post('/api/users')
            .send(user4)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = usersInDb()

        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    after(async () => {
        await mongoose.connection.close()
    })
})