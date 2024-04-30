const User = require('../models/users.model')

const Order = require('../models/order.model')

const stripe = require('stripe')('keyekeykey')


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

    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items: cart.items.map(function(item){
            return{
        
                price_data:{
                    currency: 'usd',
                    product_data: {
                        name: item.product.title
                    },
                    unit_amount: +item.product.price.toFixed(2) * 100
                },
                quantity: item.quantity,
        
            }
        }),
        mode: 'payment',
        success_url:'http://localhost:3000/orders/success',
        cancel_url:'http://localhost:3000/orders/failure'
    })

    res.redirect(303,session.url)
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

function getSucess(req,res){
    res.render('customer/orders/success')
}

function getFailure(req,res){
    res.render('customer/orders/failure')
}

module.exports={
    getOrders:getOrders,
    addOrder:addOrder,
    getSucess:getSucess,
    getFailure:getFailure
}