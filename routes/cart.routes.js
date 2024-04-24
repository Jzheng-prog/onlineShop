const express = require('express')
const cartController = require('../controllers/cart.controller.js')

const router = express.Router();

router.get('/items', cartController.getCart);


router.post('/items', cartController.addCartItem);

module.exports = router;


