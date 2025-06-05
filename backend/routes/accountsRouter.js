const express = require('express');
const { zod } = require('zod');
const { Users, PaymentRequests, Transactions } = require('../db');
const authmiddleware = require('../middlewares/authMiddleware');
const accountsRouter = express.Router();
const cookieParser = require('cookie-parser');


accountsRouter.use(express.json());

accountsRouter.use(authmiddleware);

accountsRouter.get('/balance', async (req, res) => {
    const id = req.user.id;
    const account = await Users.findOne({ _id: id });
    const accountBalance = account.accountDetails.balance;
    if (!accountBalance) {
        return res.status(200).json({ message: 'Account not found' });
    } else {
        return res.status(200).json({ balance: (accountBalance / 100).toFixed(2) });
    }
})
accountsRouter.get('/paymentrequests', async (req, res) => {
    const id = req.user.id;
    const accounts = await PaymentRequests.find({ requestReceiverId: id });
    if (!accounts || accounts.length === 0) {
        return res.status(200).json({ message: 'No payment requests found' });
    } else {
        const requestSender = await Users.find({ _id: { $in: accounts.map(req => req.requestSenderId) } });
        const paymentRequests = accounts.map((req) => {
            const sender = requestSender.find(user => user._id.toString() === req.requestSenderId.toString());
            return {
                _id: req._id,
                requestSenderDetails: sender ? {
                    firstName: sender.userDetails.firstName,
                    lastName: sender.userDetails.lastName,
                    username: sender.userDetails.username,
                    id: sender._id
                } : null,
                requestAmount: req.requestAmount / 100,
                requestStatus: req.requestStatus,
                requestDate: req.requestDate,
                requestTime: req.requestTime,
                requestNote: req.requestNote
            };
        });
        if (paymentRequests.length === 0) {
            return res.status(200).json({ message: 'No payment requests found' });
        }
        const pendingRequests = paymentRequests.filter(req => req.requestStatus !== 'completed');
        return res.status(200).json({ pendingRequests });
    }

})

accountsRouter.get('/history', async (req, res) => {
    const id = req.user.id;
    const response = await Transactions.find({ $or: [{ senderUserId: id }, { receiverUserId: id }] }).sort({ date: -1 });
    if (!response || response.length === 0) {
        return res.status(200).json({ message: 'No transactions found' });
    } else {
        const transactions = response.map((transaction) => {
            return {
                id: transaction._id,
                date: transaction.transactionDate,
                time: transaction.transactionTime,
                amount: transaction.transactionAmount / 100,
                status: transaction.transactionStatus,
                type: transaction.senderUserId === id ? 'sent' : 'received',
                senderUserId: transaction.senderUserId,
                receiverUserId: transaction.receiverUserId,
                note: transaction.transactionNote || null
            };
        });
        const userDetails = await Users.find({ _id: { $in: transactions.map(t => t.senderUserId).concat(transactions.map(t => t.receiverUserId)) } });
        transactions.forEach(transaction => {
            const sender = userDetails.find(user => user._id.toString() === transaction.senderUserId.toString());
            const receiver = userDetails.find(user => user._id.toString() === transaction.receiverUserId.toString());
            transaction.senderDetails = sender ? {
                firstName: sender.userDetails.firstName,
                lastName: sender.userDetails.lastName,
                username: sender.userDetails.username,
            } : null;
            transaction.receiverDetails = receiver ? {
                firstName: receiver.userDetails.firstName,
                lastName: receiver.userDetails.lastName,
                username: receiver.userDetails.username,
            } : null;
        });
        transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        return res.status(200).json({ transactions });
    }
})

accountsRouter.get('/history/:userId', async (req, res) => {
    const userId = req.params.userId;
    const id = req.user.id;
    if (userId === id) {
        return res.status(200).json({ message: 'Cannot view own transaction history' });
    }
    const response = await Transactions.find({
        $or: [
            { senderUserId: id, receiverUserId: userId },
            { senderUserId: userId, receiverUserId: id }
        ]
    }).sort({ date: -1 });
    if (!response || response.length === 0) {
        return res.status(200).json({ message: 'No transactions found' });
    } else {
        const transactions = response.map((transaction) => {
            return {
                id: transaction._id,
                date: transaction.transactionDate,
                time: transaction.transactionTime,
                amount: transaction.transactionAmount / 100,
                status: transaction.transactionStatus,
                type: transaction.senderUserId === id ? 'sent' : 'received',
                senderUserId: transaction.senderUserId,
                receiverUserId: transaction.receiverUserId,
                note: transaction.transactionNote || null
            };
        });
        const userDetails = await Users.find({ _id: { $in: transactions.map(t => t.senderUserId).concat(transactions.map(t => t.receiverUserId)) } });
        transactions.forEach(transaction => {
            const sender = userDetails.find(user => user._id.toString() === transaction.senderUserId.toString());
            const receiver = userDetails.find(user => user._id.toString() === transaction.receiverUserId.toString());
            transaction.senderDetails = sender ? {
                firstName: sender.userDetails.firstName,
                lastName: sender.userDetails.lastName,
                username: sender.userDetails.username,
            } : null;
            transaction.receiverDetails = receiver ? {
                firstName: receiver.userDetails.firstName,
                lastName: receiver.userDetails.lastName,
                username: receiver.userDetails.username,
            } : null;
        });
        transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        return res.status(200).json({ transactions });
    }
})

accountsRouter.put('/deposit', async (req, res) => {
    const amount= req.body.amount * 100;
    const id = req.user.id;
    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(200).json({ message: 'invalid amount' });
    }
    const account = await Users.updateOne(
        { _id: id },
        { $inc: { 'accountDetails.balance': amount } }
    );
    if (!account) {
        return res.status(200).json({ message: 'Account not found' });
    } else {
        const transaction = Transactions.create({
            senderUserId: id,
            receiverUserId: id,
            transactionAmount: amount,
            transactionStatus: 'success',
            transactionDate: new Date().toISOString().split('T')[0],
            transactionTime: new Date().toLocaleTimeString(),
            transactionNote: 'Deposit'
        });
        return res.status(200).json({ message: 'successful'});
    }
})



module.exports = accountsRouter;