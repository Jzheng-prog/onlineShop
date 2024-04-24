const Product = require('../models/product.model');

async function addCartItem(req,res,next){

    // console.log('inside addCartitem');
    let prod;

    try{

        // console.log('inside addCartitem try', req.body);

        prod = await Product.findByID(req.body.productId)
    }catch(error){
        next(error)
        return;
    }

    const cart = res.locals.cart;
    // console.log("cart.controller product:",prod)

    //console.log("cart.controller cart before:",cart)

    cart.addItem(prod);

    //console.log("cart.controller cart after:",cart)

    req.session.cart = cart;

    res.status(201).json({
        message: "Cart Updated!",
        newTotalItems: cart.totalQuantity
    })
}

function getCart(req,res){
    res.render('/customer/cart/cart')
}

module.exports ={
    addCartItem:addCartItem,
    getCart:getCart
}