function isEmpty(value){
    return !value || value.trim() ===' ';
}

function userCredentialisValid(email, password){
    return( 
        email && email.includes('@') &&
        password && password.trim().length >= 6
    );
}

function userDetailisValid(email, password, name, street, postal, city){
    //console.log('UserDetailisvalid')
    return(
        userCredentialisValid(email,password) &&
        !isEmpty(name) &&
        !isEmpty(street) &&
        !isEmpty(postal) &&
        !isEmpty(city) 
    );
}

function emailisConfirmed(email, confirmEmail){
    //console.log('email/confirmed email is the same')
    return email === confirmEmail;
}

module.exports = { 
    userDetailisValid: userDetailisValid,
    emailisConfirmed: emailisConfirmed

};