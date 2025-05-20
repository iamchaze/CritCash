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
        const account = await Accounts.findOne({ walletKey: id });
        if (!account) {
            return res.status(200).json({ message: 'Account not found' });
        } else {
            return res.status(200).json({ balance: account.accountBalance });
        }
    }
})

accountsRouter.post('/transfer', async (req, res) => {
    const targetUser = req.body.targetUser
    const amount = Number.isInteger(req.body.amount) ? req.body.amount * 100 : req.body.amount * 100;
    const task = req.body.task
    const currentUserId = req.userid
    const currentUser = await Accounts.findOne({ _id: currentUserId });
    console.log(targetUser, amount, task, currentUserId);
})

module.exports = accountsRouter;