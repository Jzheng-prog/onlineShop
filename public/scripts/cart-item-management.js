const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management') //multiple forms
const cartBadgeElements = document.querySelectorAll('.nav-items .badge');
const cartTotalPriceElement = document.getElementById('cart-total-price');

//script is call in cart.ejs.

//ajax request

async function updateCartItem(event){

    event.preventDefault();

    const form = event.target;
    const prodId = form.dataset.productid;
    const csrfToken = form.dataset.csrf;
  
    const quantity = form.firstElementChild.value; // input

    let response;

    try{
        response = await fetch('/cart/items',{ //routes defined in cart.routes
                method: 'PATCH',
                body: JSON.stringify({
                    productid:  prodId, //productid value is from cart.controller
                    _csrf: csrfToken,
                    quantity:quantity
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
        })

    }catch(error){

        alert('Cart-Item-Management Something Went Wrong');
        return;

    }

    //console.log('Cart-Item-Management reponse:', response)


    if(!response.ok){
        alert('Cart-Item-Management Something Went Wrong2');
        return;
    }

    const responseData = await response.json();


    if(responseData.updatedCartData.updatedItemPrice ===0){
        form.parentElement.parentElement.remove();
    }else{

        const totalProductPrice = form.parentElement.querySelector('.cart-item-price .cart-product-price')

        const totalProductPrice3 = form.parentElement.querySelector('.cart-item-price .cart-product-price3')

        totalProductPrice.textContent = responseData.updatedCartData.updatedItemPrice.toFixed(2)

        totalProductPrice3.textContent = quantity;


    }
    


    cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);

    //console.log('cartBadge.textContent: ',cartBadge)
    for(const cartBadgeElement of cartBadgeElements){
        cartBadgeElement.textContent = responseData.updatedCartData.newTotalQuantity;
    }
}

for(const formElement of cartItemUpdateFormElements){
    formElement.addEventListener('submit', updateCartItem);
}