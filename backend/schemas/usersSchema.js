// usersSchema.js
const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
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
    },
    walletId: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
    }
});

module.exports = { usersSchema };
