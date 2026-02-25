const express = require('express');
const { Router } = require('express');
const mainRouter = express.Router();
const usersRouter = require('./usersRouter');
const transactionsRouter = require('./transactionsRouter');
const accountsRouter = require('./accountsRouter');
const depositsRouter = require('./depositsRouter');

mainRouter.use("/users", usersRouter)
mainRouter.use("/accounts", accountsRouter);
mainRouter.use("/transactions", transactionsRouter)
// mainRouter.use("/transactions", transactionsRouter);
// mainRouter.use("/accounts", accountsRouter);
// mainRouter.use("/deposits", depositsRouter);
// mainRouter.use("/payRequests", payRequestsRouter);


mainRouter.get('/', (req, res) => {
    res.send('Hello from main router');
}
);

mainRouter.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
})

module.exports = mainRouter