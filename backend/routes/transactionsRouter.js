const express = require('express');
const { Users, Transactions, PaymentRequests } = require('../db');
const authMiddleware = require('../middlewares/authMiddleware');
const transactionsRouter = express.Router();
const mongoose = require("mongoose");


transactionsRouter.use(express.json());
transactionsRouter.use(authMiddleware);

transactionsRouter.post('/sendmoney', async (req, res) => {
    const to = req.body.to;
    const from = req.user
    const amount = req.body.amount * 100;
    const query = req.query.query;
    // Validate the request
     
    if (!to || !amount || !from) {
        return res.status(200).json({ message: 'Invalid request' });
    }
    const session = await mongoose.startSession()
    session.startTransaction()
    const fromAccount = await Users.findOne({ _id: from.id });
    const fromAccountBalance = fromAccount.accountDetails.balance;
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

    const transaction = await Transactions.create({
        senderUserId: from.id,
        receiverUserId: to.id,
        transactionAmount: amount,
        transactionStatus: "success",
        transactionDate: new Date().toISOString(),
        transactionTime: new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' }),
        transactionNote: req.body.note ? req.body.note : null,
    })
    if (query === 'acceptpaymentrequest') {
        const reponse = await PaymentRequests.updateOne({ _id: to.requestId }, { $set: { requestStatus: "completed" } })
        if (!reponse) {
            await session.abortTransaction();
            res.send({ message: 'Payment request not found' })
            return;
        }
    }

    await session.commitTransaction();
    res.send({
        message: `Money transferred`,
        transactionId: transaction._id
    })
})

transactionsRouter.post('/requestmoney', async (req, res) => {
    const to = req.body.to;
    const from = req.user
    const amount = req.body.amount * 100;
    const note = req.body.note ? req.body.note : null;
    const toAccount = await Users.findOne({ _id: to.id });
    if (!toAccount) {
        res.send({ message: 'User not found' })
        return;
    }
    const fromAccount = await Users.findOne({ _id: from.id });
    if (!fromAccount) {
        res.send({ message: 'User not found' })
        return;
    }

    const paymentRequest = await PaymentRequests.create({
        requestSenderId: from.id,
        requestReceiverId: to.id,
        requestAmount: amount,
        requestStatus: "pending",
        requestDate: new Date().toISOString(),
        requestTime: new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' }),
        requestNote: note,
    })
    if (paymentRequest) {
        res.send({
            message: `Payment request sent`
        })
    } else {
        res.send({
            message: `Payment request failed`
        })
    }
})

module.exports = transactionsRouter;