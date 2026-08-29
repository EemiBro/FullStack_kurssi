const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

if (!url) {
    console.error('MONGODB_URI environment variable is not set');
    process.exit(1);
}

mongoose.set('strictQuery', false);

console.log('connecting to MongoDB...');

mongoose.connect(url, { family: 4 })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.error('error connecting to MongoDB:', error)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)