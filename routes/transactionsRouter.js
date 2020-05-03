const express = require('express');
const router = express.Router();

const transactionsController = require('../controllers/transactionsController');

router.get('/in', transactionsController.getAllIn);

router.get('/out', transactionsController.getAllOut);

// get statistic day/amount
router.get('/stat', transactionsController.getOutStat);

module.exports = router;
