const express = require('express');
const { zod } = require('zod');
const { Accounts } = require('../db');
const authmiddleware = require('../middlewares/authMiddleware');
const accountsRouter = express.Router();
const cookieParser = require('cookie-parser');


accountsRouter.use(express.json());

accountsRouter.use(authmiddleware); // Apply the auth middleware to all routes in this router

accountsRouter.get('/balance', async (req, res) => {
    if (req.cookies.authToken) {
        const id = req.userid;
        const account = await Accounts.findOne({ walletId: id });
        if (!account) {
            return res.status(200).json({ message: 'Account not found' });
        } else {
            return res.status(200).json({ balance: account.accountBalance });
        }
    }
})

module.exports = accountsRouter;