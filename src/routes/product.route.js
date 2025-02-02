const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authenticate = require('../middlewares/authenticate');

router.get('/', authenticate, productController.getAllProducts);

router.get('/id/:id', authenticate, productController.findProductById);

module.exports = router;
