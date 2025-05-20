const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
    transationId: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
    },
    transactionDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    transationTime: {
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
    }
})

module.exports = { transactionsSchema };