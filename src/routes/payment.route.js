const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const authenticate = require('../middlewares/authenticate');

router.post('/:id', authenticate, paymentController.createPaymentLink);

router.get('/', authenticate, paymentController.updatePaymentInformation);

module.exports = router;
