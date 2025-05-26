const mongoose = require('mongoose');

const payRequestsSchema = new mongoose.Schema({
    requestSenderId: {
        type: String,
        required: true,
        trim: true
    },
    requestReceiverId: {
        type: String,
        required: true,
        trim: true
    },
    requestDate: {
        type: String,
        required: true,
        default: Date.now,
    },
    requestTime: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
    },
    requestAmount: {
        type: Number,
        required: true,
        default: 0,
    },
    requestStatus: {
        type: String,
        required: true,
        enum: ['completed', 'failed', 'pending'],
        default: 'pending'
    },
    requestNote: {
        type: String,
        trim: true,
        maxLength: 100,
    }
})


module.exports = { payRequestsSchema };