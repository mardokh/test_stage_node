// Import modules
const mongoose = require('mongoose')


// Create timestampe date
const date = new Date()
const formattedDate = date.toISOString().split('T')[0]

// Schema
const usersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  timestamp: {
    type: String,
    default: formattedDate
  },
  status: {
    type: String,
    default: 'unable'
  }
})

// Model
const Users = mongoose.model('Users', usersSchema)


// Export modules
module.exports = Users