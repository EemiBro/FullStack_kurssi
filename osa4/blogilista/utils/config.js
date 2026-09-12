require('dotenv').config()

const port = process.env.PORT
const mongoUrl = process.env.MONGODB_URI

module.exports = { port, mongoUrl }