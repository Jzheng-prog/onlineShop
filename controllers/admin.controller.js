
const Product = require('../models/product.model')

// console.log('inside admin.controller.js')

async function getProducts(req,res, next){

    console.log('inside getProducts')


    try{
        const products = await Product.findAll();
        // console.log('inside getProd, admin.controller', products)
        res.render('admin/products/all-products',{products:products})
    }catch(error){
        next(error);
        console.log('admin.contronler', error)
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

    console.log('inside CreateProd', product)

    try{
        await product.save();
        console.log('admin.controller. inside CreateProd suceess')
    }catch(error){
        next(error);
        console.warn(error)
        console.log('admin.controller. inside CreateProd fail')
        return;
    }
    res.redirect('/admin/products')
}




async function getUpdateProduct(req, res, next){

    console.log('admin.controller, inside getUpdate')

    try{
        const prod = await Product.findByID(req.params.id)
        console.log('admin.controller, inside getUpdate try, product:', prod)

        res.render('admin/products/update-product', {product:prod})

    }catch(error){
        console.log('admin.controller, inside getUpdate catch', error)

        next(error)
    }
}





async function updateProduct(req,res,next){

    console.log('inside getUpdate')

    const prod = new Product({
        ...req.body,
        _id: req.params.id
    });

    if(req.file){
        prod.replaceImage(req.file.filename);
    }

    try{
        await prod.save();
    }catch(error){
        next(error)
        console.log('admin.contronler', error)
        return;
    }

    res.redirect('/admin/products')
}

async function deleteProduct(req,res,next){

    console.log('inside deleteProduct');

    let product;
    try{
        product = await Product.findByID(req.params.id);
        await product.remove();
    }catch(error){
        console.log('admin.contronler', error)
        return next(error);
    }
    res.json({message:'Deleted Product!'})
}

module.exports ={
    getNewProduct: getNewProduct,
    getProducts: getProducts,
    createNewProduct:createNewProduct,
    getUpdateProduct:getUpdateProduct,
    updateProduct:updateProduct,
    deleteProduct:deleteProduct
}