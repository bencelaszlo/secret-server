const PORT = 8080

// Require Express, CORS and Body Parser
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Start up an instance of app
const app = express()

/* Middleware */
// Configure body-parser as middleware
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())

app.use(cors())

// Initialize the main project folder
app.use(express.static('dist'))

app.listen(PORT, () => {
  console.log(`Application is running on ${PORT}`)
})
