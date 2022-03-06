const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id: {
        type:String,
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    },
    type: {
        type: String,
        enum: ["mentor", "mentee"]
    },
})

module.exports = mongoose.model('Usee', userSchema)