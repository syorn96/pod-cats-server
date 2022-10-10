// require mongoose ODM
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  cats: {
    type: Array
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema)