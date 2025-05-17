const express = require('express');
const { zod } = require('zod');
const { Accounts } = require('../db');
const authmiddleware = require('../middlewares/authMiddleware');
const accountsRouter = express.Router();
const cookieParser = require('cookie-parser');


accountsRouter.use(express.json());

accountsRouter.use(authmiddleware);

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

accountsRouter.post('/transfer', async (req, res) => {
    const user = req.body.currentUser
    const amount = parseInt(req.body.amount)
    console.log(user, amount);
})

module.exports = accountsRouter;