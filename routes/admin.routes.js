const express = require('express');
const adminController = require('../controllers/admin.controller');
const imageUploadMid = require('../middlewares/image-upload');

const router = express.Router();

router.get('/products', adminController.getProducts);

router.get('/products/new', adminController.getNewProduct);

router.post('/products', imageUploadMid, adminController.createNewProduct);


module.exports = router;