const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
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
  type: { 
    type: String,
    enum: ['admin', 'user'], 
    default: 'user' 
  }
}, { collection: 'User' })

const User = mongoose.model('User', userSchema)

module.exports = User
