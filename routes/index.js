const express = require('express');
const router = express.Router();

const signRouter = require('./signRouter');
const itemsRouter = require('./itemsRouter');
const providersRouter = require('./providersRouter');
const transactionsRouter = require('./transactionsRouter');

const isAuthorizedMiddleware = require('../middleware/isAuthorized');

router.use('/api/sign', signRouter);
router.use('/api/items', isAuthorizedMiddleware, itemsRouter);
router.use('/api/providers', isAuthorizedMiddleware, providersRouter);
router.use('/api/transactions', isAuthorizedMiddleware, transactionsRouter);

module.exports = router;
