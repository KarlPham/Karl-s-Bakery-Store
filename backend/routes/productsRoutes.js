const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Route to get all products
router.get('/', productsController.getAllProducts);

// Route to get product bt Id
router.get('/:productId', productsController.getProductById);

module.exports = router;
