const PORT = 3000

// Require Express, CORS and Body Parser
const express = require('express')
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

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Initialize the main project folder
app.use(express.static('dist'))

app.listen(PORT, () => {
  console.log(`Application is running on ${PORT}`)
})

// Hash, compare and retrieve a secret
app.get('/api/secret/:hash', async (req, res) => {
  try {
    const hashParam = req.params.hash

    if (!(hashParam && hashParam.length)) {
      return res.status(412).send('Password must be provided')
    }

    const decodedHash = Buffer.from(hashParam, 'base64')

    const secret = await Secret.findOne({ hash: decodedHash })
    if (!secret) {
      return res.status(404).send('This secret does not exist')
    }

    if (new Date() > secret.expiresAt) {
      secret.isExpired = false
      await secret.save()
      return res.status(410).send('This secret is expired and not available anymore')
    }

    if (secret.remainingViews <= 0) {
      return res.status(410).send('This secret has no remaining views')
    }

    secret.remainingViews--
    await secret.save()

    const response = {
      hash: Buffer.from(secret.hash, 'utf8').toString('base64'),
      secretText: secret.secretText,
      createdAt: secret.createdAt,
      expiresAt: secret.expiresAt,
      remainingViews: secret.remainingViews
    }

    return res.status(200).send(response)
  } catch (error) {
    console.error(JSON.stringify(error))
    return res.status(500).send()
  }
})

// Hash and store a new secret
app.post('/api/secret/', (req, res) => {
  try {
    const secretParams = req.body

    bcrypt.hash(secretParams.secret, saltRounds, async (err, hash) => {
      if (err) {
        console.error(JSON.stringify(err))
        return res.status(500).send()
      }

      const secret = new Secret({
        hash,
        secretText: secretParams.secret,
        createdAt: new Date(),
        expiresAt: secretParams.expireAfter,
        isExpired: false,
        remainingViews: parseInt(secretParams.expireAfterViews)
      })

      await secret.save()

      return res.status(200).send({
        hash: Buffer.from(secret.hash, 'utf8').toString('base64'),
        secretText: secret.secretText,
        createdAt: secret.createdAt,
        expiresAt: secret.expiresAt,
        remainingViews: secret.remainingViews
      })
    })
  } catch (error) {
    console.error(JSON.stringify(error))
    return res.status(500).send()
  }
})
