const express = require('express');
const { zod } = require('zod');
const { Users, Transactions } = require('../db');
const authmiddleware = require('../middlewares/authMiddleware');
const transactionsRouter = express.Router();
const cookieParser = require('cookie-parser');
const mongoose  = require("mongoose");


transactionsRouter.use(express.json());
transactionsRouter.use(authmiddleware);

// transactionsRouter.post('/sendmoney', async (req, res) => {
//     const targetUser = req.body.targetUser
//     const amount = req.body.amount * 100;
//     const task = req.body.task
//     const currentUserId = req.userid
//     console.log(targetUser, amount, task, currentUserId);

//     if (!targetUser || !amount || !task) {
//         return res.status(200).json({ message: 'Invalid request' });
//     }
//     const session = await mongoose.startSession()
//     session.startTransaction()
//     const fromAccount = await Users.findOne({ _id: currentUserId });


//     if (!fromAccount || fromAccount.balance < amount) {
//         await session.abortTransaction();
//         res.send({ message: 'Insufficient Balance' })
//         return;
//     }

//     const toAccount = await Users.findOne({ "userDetails.username": targetUser.username })
//     if (!toAccount) {
//         await session.abortTransaction()
//         res.send({ message: 'User not found' })
//         return;
//     }

//     //Perform the Transfer
//     await Users.updateOne({ _id: fromAccount._id }, { $inc: { "accountDetails.balance": -amount } })
//     await Users.updateOne({ _id: toAccount._id }, { $inc: { "accountDetails.balance": amount } })

//     await Transactions.create({
//         fromAccount: req.userId,
//         toAccount: to,
//         amount: amount
//     })

//     await session.commitTransaction();
//     res.send({
//         message: `Money transferred`
//     })
// })

module.exports = transactionsRouter;