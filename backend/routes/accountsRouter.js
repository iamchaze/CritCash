const express = require('express');
const { zod } = require('zod');
const { Users } = require('../db');
const authmiddleware = require('../middlewares/authMiddleware');
const accountsRouter = express.Router();
const cookieParser = require('cookie-parser');


accountsRouter.use(express.json());

accountsRouter.use(authmiddleware);

accountsRouter.get('/balance', async (req, res) => {
    if (req.cookies.authToken) {
        const id = req.userid;
        const account = await Users.findOne({ _id: id });
        const accountBalance = account.accountDetails.balance;
        if (!accountBalance) {
            return res.status(200).json({ message: 'Account not found' });
        } else {
            return res.status(200).json({ balance: accountBalance });
        }
    }
})

module.exports = accountsRouter;