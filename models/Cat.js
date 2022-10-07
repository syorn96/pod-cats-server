// require mongoose ODM
const mongoose = require('mongoose')

const CatSchema = new mongoose.Schema({
  header: {
    type: String
  },
  img_Url: {
    type: String
  },
  content: {
    type: String
  },
  likes: {
    type: Number
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Cat', CatSchema)