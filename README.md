# OnlineShop

This is a simple online shop website created using vanilla JavaScript, CSS, and HTML, with Node.js and the Express.js framework. The project follows the Model/View/Controller (MVC) pattern and uses MongoDB as the backend database server.

## Features

- User account creation and authentication
- Admin rights
- Product listing and details
- Shopping cart functionality
- Order processing and history
- Secure payment processing via Stripe

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Security**: bcryptjs for password hashing
- **Payment Gateway**: Stripe

## Data Models

1. **User Data**:
   - email
   - name
   - password
   - address (state, postal, city)

2. **Product Data**:
   - title
   - summary
   - price
   - description
   - image
   - id

3. **Order Data**:
   - status
   - date
   - userData
   - productData

4. **Cart Data**:
   - items
   - totalPrice
   - totalQuantity

## Security

Passwords are hashed using **bcryptjs** to ensure they are securely stored in the database.

## Payment

**Stripe** is integrated as a third-party payment gateway to handle transactions securely.

## Project Structure

- **Model**: Defines the structure for user, product, order, and cart data.
- **View**: Manages the user interface and displays data.
- **Controller**: Handles the logic and interactions between the model and the view/routes.

This structure ensures a clear separation of concerns, making the application easier to maintain and scale.

## Admin
Admin status must be manually given to a created user inside mongoDB.

## Installation

1. Clone the repository:

inside terminal run:
- cd onlineShop
- npm install
- node app.jss


**Make sure mongodb and stripe is setup correctly**
Navigate to controllers folder in to order.controller.js.
const stripe = require('stripe')('***Put your own secret key from sripe')




