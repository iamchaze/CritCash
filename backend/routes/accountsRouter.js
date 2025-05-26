const express = require('express');
const { zod } = require('zod');
const { Users, PaymentRequests } = require('../db');
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
        return res.status(200).json({ balance: accountBalance });
    }
})
accountsRouter.get('/paymentrequests', async (req, res) => {
    const id = req.user.id;
    const accounts = await PaymentRequests.find({ requestReceiverId: id });
    if (!accounts || accounts.length === 0) {
        return res.status(200).json({ message: 'No payment requests found' });
    } else {
        const requestSender = await Users.find({ _id: { $in: [...new Set((accounts.map(req => {req.requestSenderId})))] } });
        const paymentRequests = accounts.map((req) => {
            const sender = requestSender.find(user => user._id.toString() === req.requestSenderId.toString());
            return {
                _id: req._id,
                requestSenderDetails: sender ? {
                    username: sender.userDetails.username,
                    firstName: sender.userDetails.firstName,
                    lastName: sender.userDetails.lastName,
                    id: sender._id,
                } : null,
                requestAmount: req.requestAmount / 100,
                requestStatus: req.requestStatus,
                requestDate: req.requestDate,
                requestTime: req.requestTime,
                requestNote: req.requestNote
            };
        });
        console.log(paymentRequests);
        return res.status(200).json({ paymentRequests });
    }

})

module.exports = accountsRouter;