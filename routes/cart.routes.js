const express = require('express')
const cartController = require('../controllers/cart.controller.js')

const router = express.Router();

router.get('/', cartController.getCart);

router.post('/items', cartController.addCartItem);

router.patch('/items', cartController.updateCartItem)

module.exports = router;


