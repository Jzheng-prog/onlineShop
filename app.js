const express = require('express');
const csrf = require('csurf');
const path = require('path');

const expressSession = require('express-session');
const createSessionConfig = require('./config/session');
const sessionConfig = createSessionConfig()

const db = require('./data/database');
const addCSRFTokenMiddleware = require('./middlewares/csrf-token');
const checkAuthStatus = require('./middlewares/check-auth');
const protectRoutesMID = require('./middlewares/protectRoutes');
const cartMiddleware = require('./middlewares/cart');
const updateCartPricesMiddleware = require('./middlewares/update-cart-prices');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/base.routes');
const baseRoutes = require('./routes/products.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');

const errHandler = require('./middlewares/error-handler')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/products/asset', express.static('product-data'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//middlewares
app.use(expressSession(sessionConfig))
app.use(csrf());
app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);

app.use(addCSRFTokenMiddleware);
app.use(checkAuthStatus);

//routes
app.use(authRoutes);
app.use(productRoutes);
app.use(baseRoutes);
app.use('/cart', cartRoutes)
app.use('/orders',protectRoutesMID, orderRoutes)
app.use('/admin',protectRoutesMID, adminRoutes);

app.use(errHandler);

db.connectToDatabase().then(function(){
    app.listen('3000');
}).catch(function(error){
    console.log('Fail to Conenct.');
    console.log(error);
});
