const express = require("express");
const mongoose = require("mongoose");
const { usersSchema } = require("./schemas/usersSchema");
const { transactionsSchema } = require("./schemas/transactionsSchema");
const { payRequestsSchema } = require("./schemas/payRequestsSchema");

const DB_URL = "mongodb+srv://virajkale9604:Ganja@paymate.konwosa.mongodb.net/CritCash";
mongoose.connect(DB_URL, {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

const Users = mongoose.model("Users", usersSchema);
const Transactions = mongoose.model("Transactions", transactionsSchema);
const PaymentRequests = mongoose.model("PaymentRequests", payRequestsSchema);

module.exports = {
    Users,
    Transactions,
    PaymentRequests
};
