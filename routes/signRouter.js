const express = require('express');
const router = express.Router();

const signController = require('../controllers/signController');

router.post('/', signController.sign);

module.exports = router;