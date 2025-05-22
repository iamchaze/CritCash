const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
    senderUserId:{
        type: String,
        required: true,
        trim: true
    },
    receiverUserId:{
        type: String,
        required: true,
        trim: true
    },
    transactionDate: {
        type: String,
        required: true,
        default: Date.now,
    },
    transactionTime: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
    },
    transactionAmount: {
        type: Number,
        required: true,
        default: 0,
    },
    transactionStatus: {
        type: String,
        required: true,
        enum: ['success', 'failed', 'pending'],
        default: 'pending'
    },
    transactionNote: {
        type: String,
        trim: true,
        maxLength: 100,
    }
})

module.exports = { transactionsSchema };