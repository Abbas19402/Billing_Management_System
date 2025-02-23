const mongoose = require('mongoose');
const Invoice = require('./invoice.model')
const Client = require('./client.model')

const userSchema = new mongoose.Schema({
    name: {
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
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Users',userSchema)