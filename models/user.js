const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name : {
        type: String, 
        required: [true, 'Please Provide name'],
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String, 
        validate : {
            validator: validator.isEmail,
            message: 'Pleaese Provide mail'
        },
        required: [true, 'Pleaese Provide mail']
    },
    password: {
        type: String, 
        required: [true, 'Please Provide password'],
        minLength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})


module.exports = mongoose.model('User', UserSchema)