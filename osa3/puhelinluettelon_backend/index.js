const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const Person = require('./models/person')
const mongoose = require('mongoose')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    next()
}

app.use(express.static('dist'))
app.use(morgan('tiny'))
app.use(express.json())
app.use(requestLogger)

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
    .catch(error => next(error))
})

app.get('/api/info', (request, response) => {
    Person.countDocuments({}).then(count => {
        response.send(`phonebook has info for ${count} people <br>${new Date()}`)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const generateId = () => {
    const id = Math.floor(Math.random() * 10000)

    return String(id)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number){
        return response.status(400).json({
            error: 'content missing'
        })
    }
    
    const nameExists = persons.find(person => person.name === body.name)

    if (nameExists) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const numberExists = persons.find(person => person.number === body.number)

    if (numberExists) {
        return response.status(400).json({
            error: 'number must be unique'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    console.log('saving person:', person)

    person.save().then(savedPerson => {
        console.log(`added: ${savedPerson.name}, ${savedPerson.number} to phonebook`)
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}) 