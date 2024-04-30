
const Cart = require('../models/cart.model');

function initializeCart(req,res,next){

    let cart;

    //no current session create cart
    if(!req.session.cart){
        cart = new Cart();
    
    //there is a session
    }else{
        const sessionCart = req.session.cart;
        cart = new Cart(sessionCart.items, sessionCart.totalQuantity, sessionCart.totalPrice)
    }
    res.locals.cart = cart;
    next();
}

module.exports = initializeCart;