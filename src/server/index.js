const PORT = 8080

// Require Express, CORS and Body Parser
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Require and configurate bcrypt
const bcrypt = require('bcrypt')
const saltRounds = 10

// Initalize MongoDB database
require('./db/mongoose.js')

// Require secret model
const Secret = require('./models/secret')

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

// Hash, compare and retrieve a secret
app.get('/api/secret/:hash', async (req, res) => {
  try {
    const hashParam = req.params.hash

    if (!(hashParam && hashParam.length)) {
      res.status(412).send('Password must be provided')
    }

    const decodedHash = Buffer.from(hashParam, 'base64')

    const secret = await Secret.findOne({ hash: decodedHash })
    if (!secret) {
      res.status(404).send('This secret does not exist')
    }

    if (new Date() > secret.expiresAt) {
      secret.isExpired = false
      secret.save()
      res.status(404).send('This secret is expired and not available anymore')
    }

    if (secret.remainingViews <= 1) {
      res.status(404).send('This secret has no remaining views')
    }

    secret.remainingViews--
    secret.save()

    res.status(200).send({
      hash: Buffer.from(secret.hash, 'utf8').toString('base64'),
      secretText: secret.secretText,
      createdAt: secret.createdAt,
      remainingViews: secret.remainingViews
    })
  } catch (error) {
    console.error(JSON.stringify(error))
    res.status(500).send()
  }
})

// Hash and store a new secret
app.post('/api/secret/', (req, res) => {
  try {
    const secretParams = req.body

    bcrypt.hash(secretParams.secret, saltRounds, (err, hash) => {
      if (err) {
        console.error(JSON.stringify(err))
        res.status(500).send()
      }

      const secret = new Secret({
        hash,
        secretText: secretParams.secret,
        createdAt: new Date(),
        expiresAt: secretParams.expireAfter,
        isExpired: false,
        remainingViews: secretParams.expireAfterViews
      })

      secret.save()

      res.status(200).send({
        hash: Buffer.from(secret.hash, 'utf8').toString('base64'),
        secretText: secret.secretText,
        createdAt: secret.createdAt,
        remainingViews: secret.remainingViews
      })
    })
  } catch (error) {
    console.error(JSON.stringify(error))
    res.status(500).send()
  }
})

app.listen(PORT, () => {
  console.log(`Application is running on ${PORT}`)
})
