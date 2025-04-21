const express = require("express");
const mongoose = require("mongoose");

const DB_URL = "mongodb+srv://virajkale9604:Ganja@paymate.konwosa.mongodb.net/?retryWrites=true&w=majority&appName=Paymate";

const connectDb = async () => {
    try {
        await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
    }



module.exports = connectDb;