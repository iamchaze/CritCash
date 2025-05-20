const express = require('express');
const mongoose = require('mongoose');

const accountsSchema = new mongoose.Schema({
    walletKey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
        trim: true,
        maxLength: 20,
        unique: true,
    },
    walletPassword: {
        type: String,
        required: true,
        trim: true,
        maxLength: 15,
        default: "password",
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

module.exports = { accountsSchema };