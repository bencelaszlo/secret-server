const mongoose = require('mongoose')

mongoose.connect('mongodb://mongo:27017/secret-server', {
  useNewUrlParser: true,
  useCreateIndex: true
})
