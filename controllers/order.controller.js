const User = require('../models/users.model')

const Order = require('../models/order.model')


async function addOrder(req,res,next){

    console.log('order.controller:addOrder')

    const cart = res.locals.cart;

    let userDocument;

    //console.log('order.controller:addOrder cart', cart)


    try{
        userDocument = await User.findByID(res.locals.uid)
    }catch(error){
        return next(error)
    }

    const order = new Order(cart, userDocument);

    //console.log('order.controller:addOrder order',order)


    try{
        await order.save();
    }catch(error){
        next(error);
        return;
    }

    req.session.cart = null;
    res.redirect('/orders')
}

async function getOrders(req,res, next){

    try{
        const orders = await Order.findAllForUser(res.locals.uid);

        // console.log('order.controller getOrders res.locals.uid', res.locals.uid);

        // console.log('order.controller getOrders orders', orders);

        res.render('customer/orders/all-orders', {orders:orders})

    }catch(error){
        next(error)
    }
}

module.exports={
    getOrders:getOrders,
    addOrder:addOrder
}