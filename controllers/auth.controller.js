
const authUtil = require('../util/authentication')
const validation = require('../util/validation')
const sessionFlash = require('../util/session-flash')

const User = require('../models/users.model');
const session = require('express-session');


async function getSignUp( req, res, next){
    let sessionData = sessionFlash.getSessionData(req);

    if(!sessionData){
        sessionData = {
            email:'',
            confirmEmail:'',
            password: '',
            name: '',
            street: '',
            city:'',
            postal: ''
        }
    }
    res.render('customer/auth/signup',{inputData:sessionData});
}
function getLogin( req, res, next){
    let sessionData = sessionFlash.getSessionData(req);

    if(!sessionData){
        sessionData = {
            email: "",
            password: ""
        }
        res.render('customer/auth/login',{inputData:sessionData})
    }
}

async function signUp(req, res, next){

    const enteredData = {
        email: req.body.email,
        password: req.body.password,
        fullname: req.body.fullName,
        street: req.body.street,
        postal: req.body.postal,
        city: req.body.city
    }

    // console.log('This is user email: ' + user.email)
    // console.log('This is req.body.email: ' + req.body.email)


    //console.log('uauthController, user signup ', + req.body.email + 'No email' + req.body.fullName, req.body.password, req.body.street, req.body.postal, req.body.city)

    if(!validation.userDetailisValid(req.body.email, req.body.password, req.body.fullName, req.body.street, req.body.postal, req.body.city) ||
    !validation.emailisConfirmed(req.body.email, req.body['confirm-email'])){

        sessionFlash.flashDataToSession(
            req, 
            {
                errorMessage: 
                "Please Check Your Inputs!",
                ...enteredData
            }, 
            function(){
                //console.log('fail redirect');
                res.redirect('/signup');
            }
        );
        return;
    }

    const user = new User(req.body.email, req.body.password, req.body.fullName, req.body.street, req.body.postal, req.body.city);

    try{
        const existingUser = await user.existAlready();
        if(existingUser){
            console.log('user exist fail try/catch',existingUser)
            sessionFlash.flashDataToSession(
                req, 
                {
                    errorMessage: 
                    "User Exist Already!",
                    ...enteredData
                }, 
                function(){
                    //console.log('inside sessionFlash')
                    res.redirect('/signup')
                }
            );
            return;
        }
        await user.sign_up()

    }catch(error) {
        next(error);
        return;
    }
    res.redirect('/login')
}

async function login(req,res, next){ //function has bugs when the pw or user is not write. It does not throw an alert if it fails.

    //console.log('Inside function login')
    const user = new User(req.body.email, req.body.password)

    let existingUser; //553
    try{
        existingUser = await user.getUserWithSameEmail();
        //console.log('inside login function.try/catch', existingUser)
    }catch(error){
        next(error);
        return;
    }

    // Object.keys(user).forEach(key => {
    //     console.log(`${key}: ${user[key]}`);
    // });
    // console.log('SAME eMAIL' + existingUser.email, user.email, user.password)

    const sessionErrorData = {
        errorMessage: "Please Check Your Inputs!",
        email: user.email,
        password: user.password
    }

    if(!existingUser){
        //console.log("inside !exisitingUser.", existingUser)

        sessionFlash.flashDataToSession(
            req,
            sessionErrorData,
            function(){
                res.redirect('/login')
            }
        );
        console.log(sessionErrorData)

        return;
    }

    //console.log('before correct')


    const correctPw = await user.hasMatchingPassword(existingUser.password);
    // console.log('Hello auth.controller' + correctPw)

    //console.log('not Login')

    if(!correctPw){
        console.log('Password not right')

        sessionFlash.flashDataToSession(req, sessionErrorData, function(){
            //console.log("inside flash")
            //console.log(sessionErrorData, 'ddddddddd')
            //console.log("...............................")
            res.redirect('/login')
        });
        //console.log(sessionErrorData)
        //console.log('after sessionFlash')
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