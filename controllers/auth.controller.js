
const User = require('../models/users.model')


function getSignUp( req, res, next){
    res.render('customer/auth/signup');
}
function getLogin( req, res, next){
    res.render('customer/auth/login')
}

async function signUp(req, res){
    const user = new User(req.body.email, req.body.fullName, req.body.password, req.body.street, req.body.postal, req.body.city)

    await user.sign_up();
    res.redirect('/login')
}

module.exports = {
    getSignUp: getSignUp,
    getLogin: getLogin,
    signUp: signUp
}