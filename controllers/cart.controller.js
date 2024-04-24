const Product = require('../models/product.model');

async function addCartItem(req,res,next){

    console.log('inside addCartitem');
    let prod;

    try{
        prod = await Product.findByID(req.body.productid)
    }catch(error){
        next(error)
        return;
    }

    const cart = res.locals.cart;
    cart.addItems(prod);
    req.session.cart = cart;

    res.status(201).json({
        message: "Cart Updated!",
        newTotalItem: cart.totalQuantity
    })
}

module.exports ={
    addCartItem:addCartItem
}