// require the mongoose package
const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    header: {
        type: String
    },
    content: {
        type: String
    },
    // array of object ids that reference the Cats that the user has made
    cats:[{
        // tell mongoose that this is a reference
        // tell mongoose what is being referenced ??
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cat'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Comment', CommentSchema)