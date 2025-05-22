const express = require('express');
const { Users, Transactions } = require('../db');
const authmiddleware = require('../middlewares/authMiddleware');
const transactionsRouter = express.Router();
const mongoose = require("mongoose");


transactionsRouter.use(express.json());
transactionsRouter.use(authmiddleware);

transactionsRouter.post('/sendmoney', async (req, res) => {
    const to = req.body.to;
    const from = req.user
    console.log(from);
    const amount = req.body.amount * 100;
    if (!to || !amount || !from) {
        return res.status(200).json({ message: 'Invalid request' });
    }
    const session = await mongoose.startSession()
    session.startTransaction()
    const fromAccount = await Users.findOne({ _id: from.id });
    const fromAccountBalance = fromAccount.accountDetails.balance;
    console.log(fromAccountBalance, typeof fromAccountBalance, amount, typeof amount);
    if (!fromAccount || fromAccount.accountDetails.balance < amount) {
        await session.abortTransaction();
        res.send({ message: 'Insufficient Balance' })
        return;
    }

    const toAccount = await Users.findOne({ _id: to.id });
    if (!toAccount) {
        await session.abortTransaction()
        res.send({ message: 'User not found' })
        return;
    }

    // //Perform the Transfer
    await Users.updateOne({ _id: fromAccount._id }, { $inc: { "accountDetails.balance": -amount } })
    await Users.updateOne({ _id: toAccount._id }, { $inc: { "accountDetails.balance": amount } })

    await Transactions.create({
        senderUserId: from.id,
        receiverUserId: to.id,
        transactionAmount: amount,
        transactionStatus: "success",
        transactionDate: new Date().toISOString(),
        transactionTime: new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' }),
        transactionNote: req.body.note ? req.body.note : null,
    })

    await session.commitTransaction();
    res.send({
        message: `Money transferred`
    })
})

transactionsRouter.post('/requestmoney', async (req, res) => {
    const to = req.body.to;
    const from = req.user
    const amount = req.body.amount * 100;
    
    
})

module.exports = transactionsRouter;