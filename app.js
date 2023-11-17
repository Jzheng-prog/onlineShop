const express = require('express');
// const csrf = require('csurf');


const db = require('./data/database');
const addCSRFTokenMiddleware = require('./middlewares/csrf-token');
const errHandler = require('./middlewares/error-handler')

const authRoutes = require('./routes/auth.routes');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));


// app.use(csrf());
// app.use(addCSRFTokenMiddleware);
app.use(authRoutes);
app.use(errHandler);

db.connectToDatabase().then(function(){
    app.listen('3000');
}).catch(function(error){
    console.log('Fail to Conenct.');
    console.log(error);
});
