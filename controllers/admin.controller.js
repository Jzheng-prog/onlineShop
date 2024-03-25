
const Product = require('../models/product.model')


async function getProducts(req,res, next){

    try{
        const products = await Product.findAll();
        // console.log('inside getProd, admin.controller', products)
        res.render('admin/products/all-products',{products:products})
    }catch(error){
        next(error);
        return;
    }
}

function getNewProduct(req,res){
    res.render('admin/products/new-products')
}


async function createNewProduct(req,res, next){
    const product = new Product({
        ...req.body,
        image: req.file.filename
    });

    // console.log('inside CreateProd', product)

    try{
        await product.save();
    }catch(error){
        next(error);
        return;
    }
    res.redirect('/admin/products')
}


module.exports ={
    getNewProduct: getNewProduct,
    getProducts: getProducts,
    createNewProduct:createNewProduct
}