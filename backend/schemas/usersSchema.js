// usersSchema.js
const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    userDetails: {
        username: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            maxLength: 900,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        contact: {
            type: String,
            required: true,
            trim: true,
            maxLength: 10,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        }
    },
    accountDetails: {
        walletKey: {
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
            default: "password",
        },
        balance: {
            type: String,
            required: true,
            default: "0",
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
    }
});

module.exports = { usersSchema };
