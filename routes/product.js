const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/product');

// Create a new product
router.post('/', productCtrl.createProduct);

// Get all products
router.get('/' + '', productCtrl.getAllProduct);

// Get a specific product by ID from the database
router.get('/:productId', productCtrl.getOneProduct);

// Update a specific product by ID
router.put('/:productId', productCtrl.updateProduct);

// Delete a specific product by ID
router.delete('/:productId', productCtrl.deleteProduct);

module.exports = router;
