const mongoose = require('mongoose')

const matchSchema = mongoose.Schema({
    matchId: {
        type: Number, required: false, unique: true
    },
    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    menteeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('Match', matchSchema)