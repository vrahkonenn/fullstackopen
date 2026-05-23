const express = require('express')
const app = express() 
var morgan = require('morgan')
const cors = require('cors')
app.use(express.json())
app.use(cors())
morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": "1"
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": "2"
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": "3"
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": "4"
    } 
]

const generateId = () => {
    return Math.floor(Math.random() * 10000)
}
// Routet
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const amount = persons.length
    const timestamp = new Date().toString()
    response.end(`Phonebook has info for ${amount} people\n${timestamp}`)
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) return response.status(404).json({error: 'content missing'})
        
    if (persons.find(p => p.name === body.name)) return response.status(404).json({error: 'name must be unique'})

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    } 

    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})