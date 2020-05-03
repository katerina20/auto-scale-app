const express = require('express');
const router = express.Router();

// let stocksList = require('../../data/items');
const itemsController = require('../controllers/itemsController');

//get all items from db
router.get('/', itemsController.getAll);

//add supply
router.put('/add', itemsController.addWeight);

//buy item
router.put('/buy', itemsController.substWeight);

//edit item
router.put('/', itemsController.edit);

//get last 10 days by item id
router.get('/stat/:id', itemsController.getStatistic);

// router.get('/init', itemsController.init);

module.exports = router;
