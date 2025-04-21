const mongoose = require('mongoose');

const payRequestsSchema = new mongoose.Schema({
    requestId: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
    },
    requestDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    requestTime: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
    },
    senderWalletId: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
    },
    receiverWalletId: {
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
        enum: ['success', 'failed', 'pending'],
        default: 'pending'
    },
    requestMessage: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
    }
})

exports = mongoose.model('PayRequests', payRequestsSchema);