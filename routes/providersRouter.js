const express = require('express');
const router = express.Router();

const providersController = require('../controllers/providersController');

router.get('/', providersController.getAll);

//add new provider
router.post('/', providersController.add);

//edit provider info
router.put('/', providersController.edit);

module.exports = router;
