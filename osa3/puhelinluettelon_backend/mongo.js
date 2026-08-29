    const mongoose = require('mongoose');

    if (process.argv.length < 3) {
        console.log('give password as argument')
        process.exit(1)
    }

    const password = process.argv[2]

    const url = `mongodb+srv://fullstack:${password}@cluster0.if8uldk.mongodb.net/puhelinluettelo?
    retryWrites=true&w=majority&appName=Culster0`

    mongoose.set('strictQuery', false)
    mongoose.connect(url, { family: 4 })
    
    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    if (process.argv.length === 3) {
        Person.find({}).then(persons => {
            console.log('phonebook:')
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        }).catch(error => {
            console.log('Error fetching persons:', error)
            mongoose.connection.close()
        })
        return
    }

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(() => {
        console.log(`added: ${person.name}, ${person.number} to phonebook`)
        mongoose.connection.close()
    }).catch((error) => {
        console.log('Error saving person:', error)
        mongoose.connection.close()
    })