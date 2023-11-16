const db = require('../data/database');

const bcrypt = require('bcryptjs')

class User{
    
    constructor(email, name, password, street, postal, city){
        this.email = email,
        this.name = name,
        this.password = password,
        
        this.address = {
            street: street,
            postal: postal,
            city: city
        }
    }

    async sign_up(){
        const hashPW = await bcrypt.hash(this.password, 12)

        await db.getDB().collection('users').insertOne({
            email: this.email,
            name: this.name,
            address: this.address,
            password: hashPW
        })
    }
}

module.exports = User;