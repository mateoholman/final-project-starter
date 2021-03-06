const express = require('express');
const ItemsController = require('../controllers/ItemsController');

const router = express.Router();

// Create a new Item
router.post('/', ItemsController.create);

// Delete a single Item
router.delete('/:id', ItemsController.remove);

// Update an Item
// Code this later!!

module.exports = router;
