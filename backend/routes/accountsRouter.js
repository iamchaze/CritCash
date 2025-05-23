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
    if (!accounts) {
        return res.status(200).json({ message: 'No payment requests found' });
    } else {
        return res.status(200).json({ paymentRequests: accounts });
    }

})

module.exports = accountsRouter;