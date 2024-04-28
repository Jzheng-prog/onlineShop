const express = require('express');
const adminController = require('../controllers/admin.controller');
const imageUploadMid = require('../middlewares/image-upload');

const router = express.Router();

// console.log('inside admin.routes.js')

router.get('/products', adminController.getProducts);

router.get('/products/new', adminController.getNewProduct);

router.post('/products', imageUploadMid, adminController.createNewProduct);

router.get('/products/:id', adminController.getUpdateProduct);

router.post('/products/:id', imageUploadMid, adminController.updateProduct);

router.delete('/products/:id', adminController.deleteProduct)


router.get('/orders', adminController.getOrder);

router.patch('/orders/:id', adminController.updateOrder)


module.exports = router;