const express = require('express')
const morgan = require('morgan')

const path = __dirname + '/views/'
const app = express()

app.use(express.static(path))

// HTTP logger
app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.sendFile(path + "index.html")
})

// set port, listen for requests
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})