

const authUtil = require('../util/authentication')
const User = require('../models/users.model')


function getSignUp( req, res, next){
    res.render('customer/auth/signup');
}
function getLogin( req, res, next){
    res.render('customer/auth/login')
}

async function signUp(req, res, next){
    const user = new User(req.body.email, req.body.password, req.body.fullName, req.body.street, req.body.postal, req.body.city)
    // console.log('This is user email: ' + user.email)
    // console.log('This is req.body.email: ' + req.body.email)


    //console.log('uauthController, user signup ', + req.body.email + 'No email' + req.body.fullName, req.body.password, req.body.street, req.body.postal, req.body.city)
    try{
        await user.sign_up();
    }catch(error) {
        next(error);
        return;
    }
    res.redirect('/login')
}

async function login(req,res, next){
    const user = new User(req.body.email, req.body.password)

    let existingUser; //553
    try{
        existingUser = await user.getUserWithSameEmail();
    }catch(error){
        next(error);
        return;
    }

    // Object.keys(user).forEach(key => {
    //     console.log(`${key}: ${user[key]}`);
    // });
    // console.log('SAME eMAIL' + existingUser.email, user.email, user.password)

    if(!existingUser){
        res.redirect('/login');
        return;
    }

    //console.log('before correct')


    const correctPw = await user.hasMatchingPassword(existingUser.password);
    // console.log('Hello auth.controller' + correctPw)

    //console.log('not Login')


    if(!correctPw){
        res.redirect('/login');
        return;
    }
    //console.log('Login')

    authUtil.createUserSession(req, existingUser, function(){
        res.redirect('/');
    });
}

function logout(req,res){
    authUtil.destroyUserAuthSession(req);
    res.redirect('/login')
}

module.exports = {
    getSignUp: getSignUp,
    getLogin: getLogin,
    signUp: signUp,
    login: login,
    logout, logout
}