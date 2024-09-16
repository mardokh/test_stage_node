// Import modules
const mongoose = require('mongoose')


// Schema
const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    default: 'unable'
  },
  type: { 
    type: String, 
    enum: ['admin', 'user'], 
    default: 'user' 
  }
}, { collection: 'Users' })

// Model
const Users = mongoose.model('Users', usersSchema)


// Export modules
module.exports = Users