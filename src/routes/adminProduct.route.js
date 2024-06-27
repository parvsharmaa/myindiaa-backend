const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authenticate = require('../middlewares/authenticate');

router.post('/', authenticate, productController.createProduct);

router.post('/create', authenticate, productController.createMultipleProduct);

router.delete('/:id', authenticate, productController.deleteProduct);

router.put('/:id', authenticate, productController.updateProduct);

module.exports = router;
