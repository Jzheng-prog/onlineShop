const db = require('../data/database');
const mongodb = require('mongodb');


class Order{
    constructor(cart,userData, status = 'Pending', date, orderId){
        this.productData = cart;
        this.userData = userData;
        this.status = status;

        this.date = new Date(date);

        if(this.date){
            this.formattedDate = this.date.toLocaleDateString('en-US',{
                weekday:'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        }
        this.id = orderId;
    }

    save(){

        if(this.id){
            const orderId = new mongodb.ObjectId(this.id)

            return db.getDB().collection('orders').updateOne({_id:orderId},{
                $set: {status: this.status}
            })
        }else{
            const orderDoc = {
                userData: this.userData,
                productData: this.productData,
                date: new Date(),
                status: this.status
            };

            return db.getDB().collection('orders').insertOne(orderDoc);
        }
    }

    //Takes one order document, return new order Object
    static transformOrderDocument(orderDoc){

        //console.log('order.model:tranformDoc:', orderDoc)
        return new Order(orderDoc.productData, orderDoc.userData,orderDoc.status, orderDoc.date, orderDoc._id)
    }

    //Takes multiple order documents, return multitple new order Object

    static transformOrderDocuments(orderDocs){
        //console.log('order.model:tranformDocs:', orderDocs)
        return orderDocs.map(this.transformOrderDocument)
    }

    //find all orders in the database, return order object for each
    static async findAll(){
        const orders = await db.getDB().collection('orders').find().sort().toArray();
        //console.log('order.model orders :', orders)
        return this.transformOrderDocuments(orders);
    }

    //find all orders by the UID. a filter
    static async findAllForUser(userId){
        const uid = new mongodb.ObjectId(userId);

        //console.log('order.model findAllForUser uid', uid)
        //console.log('order.model findAllForUser userId', userId)


        const orders = await db.getDB().collection('orders').find({'userData._id': uid}).sort({_id:-1}).toArray();

        //console.log('order.model findAllForUser orders', orders)


        return this.transformOrderDocuments(orders)
    }

    //find one order by orderId
    static async findByID(orderId){

        const orderID = new mongodb.ObjectId(orderId);

        //console.log('order.model findById orderId', orderID)

        const order = await db.getDB().collection('orders').findOne({_id: orderID});

        //console.log('order.model findById order', order)

        return this.transformOrderDocument(order)
    }
}

module.exports = Order;

