const mongoose = require('mongoose')

const tweetsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Tweets', tweetsSchema)