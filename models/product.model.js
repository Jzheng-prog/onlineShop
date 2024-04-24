

const mongodb = require('mongodb')
const db = require('../data/database')

class Product{

    constructor(prodData){

        this.title = prodData.title;
        this.summary = prodData.summary;
        this.price = +prodData.price;
        this.description = prodData.description;

        this.image = prodData.image;
        this.updateImageData();

        if(prodData._id){
            this.id = prodData._id.toString();
        }

        // console.log('inside constructor imageUrl',this.imageUrl)
        // console.log('inside constructor imagePath',this.imagePath)

    }

    updateImageData(){
        this.imagePath = `product-data/images/${this.image}`
        this.imageUrl = `/products/asset/images/${this.image}`
    }
    async replaceImage(newImage){
        this.image = newImage;
        this.updateImageData();
    }

    static async findAll(){
        const products = await db.getDB().collection('products').find().toArray();
        // console.log('inside findAll, product.Model', products)
        return products.map(function(productDocument){
            return new Product(productDocument);
        })
    }

    async save(){
        const productData ={
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image
        };

        if(this.id){
            const prodID = new mongodb.ObjectId(this.id);
            if(!this.image){
                delete productData.image;
            }
            await db.getDB().collection('products').updateOne(
                {_id: prodID},
                {$set:productData}
            );
        }else{
            await db.getDB().collection('products').insertOne(productData);
        }

        // await db.getDB().collection('products').insertOne(productData);
    }

    static async findByID(ProductID){

        // console.log('inside findByID, product.model.js id =', prodID)


        let prodID;

        try{
            prodID = await new mongodb.ObjectId(ProductID)
        }catch(error){
            error.code = 404;
            throw error;
        }
        const product = await db.getDB().collection('products').findOne({_id:prodID});

        if(!product){
            const error = new Error('Could not be Located/Founded!')
            error.code = 404;
            throw error;
        }
        console.log('inside findByID, product.model.js id =', prodID)
        return new Product(product);
    }

    remove(){
        console.log('removed');

        const prodId = new mongodb.ObjectId(this.id);
        return db.getDB().collection('products').deleteOne({_id: prodId});
    }
}

module.exports = Product;