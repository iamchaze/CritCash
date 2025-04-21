const mongoose = require('mongoose');
const depositsSchema = new mongoose.Schema({
    depositId: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
    },
    depositDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    depositTime: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
    },
    depositAmount: {
        type: Number,
        required: true,
        default: 0,
    },
    depositStatus: {
        type: String,
        required: true,
        enum: ['success', 'failed', 'pending'],
        default: 'pending'
    }
})

exports = mongoose.model('Deposits', depositsSchema);