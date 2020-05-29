const mongoose = require('mongoose')

const Secret = mongoose.model('Secret', {
  hash: {
    type: String,
    required: true
  },
  secretText: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  isExpired: {
    type: Boolean,
    required: true
  },
  remainingViews: {
    type: Number,
    required: true
  }
})

module.exports = Secret
