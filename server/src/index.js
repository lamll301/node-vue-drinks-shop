const express = require('express')
const morgan = require('morgan')
const route = require('./routes')
const db = require('./config/db')

// Connect db
db.connect()

const path = __dirname + '/views/'
const app = express()

app.use(express.static(path))

// HTTP req body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// HTTP logger
// app.use(morgan('combined'))

// Routes init
route(app)

// set port, listen for requests
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})