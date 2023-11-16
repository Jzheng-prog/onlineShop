const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase(){
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017')

    database = client.db('online-shop');
}

function getDB(){
    if(!database){
        throw new Error('No Database')
    }
    return database;
}

module.exports = {
    getDB: getDB,
    connectToDatabase: connectToDatabase
}

