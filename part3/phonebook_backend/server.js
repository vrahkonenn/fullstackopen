require('dotenv').config()
const express = require('express')
const app = express() 
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const generateId = () => {
    return Math.floor(Math.random() * 10000)
}
// Routet
app.get('/api/persons', (request, response, next) => {
    Person
        .find({})
        .then(persons => response.json(persons))
        .catch(err => next(err))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => response.json(person))
        .catch(err => next(err))
    }
)

app.get('/info', (request, response, next) => {
    Person
        .find({})
        .then(persons => {
            const amount = persons.length 
            const timestamp = new Date().toString()
            response.end(`Phonebook has info for ${amount} people\n${timestamp}`)
        })
        .catch(err => next(err))
   
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) return response.status(404).json({error: 'content missing'})
        
    //if (persons.find(p => p.name === body.name)) return response.status(404).json({error: 'name must be unique'})

    const person = new Person ({
        name: body.name,
        number: body.number,
        id: generateId()
    }) 

    person
        .save()
        .then(savedPerson => response.json(savedPerson))
        .catch(err => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findById(request.params.id)
        .then(person => {
            if (!person) return response.status(404).end()

            person.name = name
            person.number = number

            return person.save().then(updatedPerson => response.json(updatedPerson))
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person
        .findByIdAndDelete(request.params.id)
        .then(result => response.status(204).end())
        .catch(err => next(err))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'})
    }
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})