const express = require('express');
const mongoose = require('mongoose');

const accountsSchema = new mongoose.Schema({
    walletId: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
    },
    walletPassword: {
        type: String,
        required: true,
        trim: true,
        maxLength: 15,
    },
    accountBalance: {
        type: Number,
        required: true,
        default: 0,
    },
    amountSpentCurrentMonth: {
        type: Number,
        required: true,
        default: 0,
    },
    amountReceivedCurrentMonth: {
        type: Number,
        required: true,
        default: 0,
    },
    totalAmountSpent: {
        type: Number,
        required: true,
        default: 0,
    },
    totalAmountReceived: {
        type: Number,
        required: true,
        default: 0,
    }
})

exports = mongoose.model('Accounts', accountsSchema);