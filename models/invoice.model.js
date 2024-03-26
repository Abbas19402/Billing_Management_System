const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    clientEmail: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Invoices',invoiceSchema);