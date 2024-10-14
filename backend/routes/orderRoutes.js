const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to create an order
router.post('/add', orderController.createOrder);

// Route to get order by ID
router.get('/:orderId', orderController.getOrderById);

module.exports = router;
