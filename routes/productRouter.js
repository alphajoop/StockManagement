const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');

const productController = require('../controllers/productController');

// Create a new product
router.post('/', auth, productController.createProduct);

// Get all products
router.get('/' + '', auth, productController.getAllProduct);

// Get a specific product by ID from the database
router.get('/:productId', auth, productController.getOneProduct);

// Update a specific product by ID
router.put('/:productId', auth, productController.updateProduct);

// Delete a specific product by ID
router.delete('/:productId', auth, productController.deleteProduct);

module.exports = router;
