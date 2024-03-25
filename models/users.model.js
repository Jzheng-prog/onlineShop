const db = require('../data/database');

const bcrypt = require('bcryptjs')

class User{
    
    constructor(email, password, name, street, postal, city){

        this.email = email,
        this.name = name,
        this.password = password,
        
        this.address = {
            street: street,
            postal: postal,
            city: city
        }
        // console.log('from constructor email: ' + this.email)
        // console.log('from constructor password: ' + this.password)


    }

    async sign_up(){
        const hashPW = await bcrypt.hash(this.password, 12)

        //console.log('sign_up --' + this.email, this.name, this.address, this.password, hashPW);

        await db.getDB().collection('users').insertOne({
            email: this.email,
            name: this.name,
            address: this.address,
            password: hashPW
        })
        //console.log('sign_up -' + this.email, this.name, this.address, this.password, hashPW);
    }

    async existAlready(){
        const existingUser = await this.getUserWithSameEmail();
        if(existingUser){
            return true;
        }
        return false;
    }

    getUserWithSameEmail(){
        return db.getDB().collection('users').findOne({email: this.email});
    }
    hasMatchingPassword(hashPw){
        // console.log('user.model.js' + this.password, hashPw)
        return bcrypt.compare(this.password, hashPw);
    }
}

module.exports = User;