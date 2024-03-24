const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    associatedWith: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    totalAmount: { 
        type: Number, 
        required: true 
    }
})

module.exports = mongoose.model('Clients',clientSchema);