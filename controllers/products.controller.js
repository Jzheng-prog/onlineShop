const Product = require('../models/product.model');

async function getAllProducts(req,res,next){


    try{
        const products = await Product.findAll();
        res.render('customer/products/all-products', {products:products});
    }catch(error){
        next(error);
    }
    //console.log('products.controller.js, getAllProducts, finish')

}




async function getProductDetails(req,res,next){
    //console.log('products.controller.js, getAllProductDetails, finish')

    try{
        const prod = await Product.findByID(req.params.id);

        res.render('customer/products/product-details', {product:prod})
    }catch(error){
        next(error)
    }
}

module.exports = {
    getAllProducts:getAllProducts,
    getProductDetails:getProductDetails
};