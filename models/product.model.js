
const db = require('../data/database')

class Product{

    constructor(prodData){

        this.title = prodData.title;
        this.summary = prodData.summary;
        this.price = +prodData.price;
        this.description = prodData.description;

        this.image = prodData.image;
        this.imagePath = `product-data/images/${prodData.image}`
        this.imageUrl = `/products/asset/images/${prodData.image}`
        if(prodData._id){
            this.id = prodData._id.toString();
        }

        // console.log('inside constructor imageUrl',this.imageUrl)
        // console.log('inside constructor imagePath',this.imagePath)

    }

    static async findAll(){
        const products = await db.getDB().collection('products').find().toArray();
        //console.log('inside findAll, product.Model', products)
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

        await db.getDB().collection('products').insertOne(productData);
    }
}

module.exports = Product;