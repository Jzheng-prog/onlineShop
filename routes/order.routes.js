const express = require('express')
const orderController = require('../controllers/order.controller.js')

const router = express.Router();

router.get('/', orderController.getOrders);

router.get('/success', orderController.getSucess);

router.get('/failure', orderController.getFailure);


router.post('/', orderController.addOrder);

module.exports = router;


