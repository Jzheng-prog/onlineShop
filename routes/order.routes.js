const express = require('express')
const orderController = require('../controllers/order.controller.js')

const router = express.Router();

router.get('/', orderController.getOrders);

router.post('/', orderController.addOrder);

module.exports = router;


