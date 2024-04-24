const addToCartButtonElement = document.querySelector('#product-details button');

const cartBadgeElement = document.querySelector('.nav-items .badge')

async function addToCart(){
    const productId = addToCartButtonElement.dataset.productid; //product-details.ejs data-productid
    const csrfToken = addToCartButtonElement.dataset.csrf;

    let response;

    try{
        response = await fetch('/cart/items', {
            method: 'POST',
            body: JSON.stringify({
                productId: productId,
                _csrf: csrfToken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }catch(error){
        console.log(error);
        alert('Something Went Wrong 1')
        return;
    }

    if(!response.ok){
        console.log('cart-management response', response)
        alert('Something Went Wrong 2')
        return;
    }

    const responseData = await response.json();

    const newTotalQuantity = responseData.newTotalItems; //cart.controller

    cartBadgeElement.textContent = newTotalQuantity;

    console.log('cart-management', responseData)
    console.log('cart-management newTotalQuantity', newTotalQuantity)



}

addToCartButtonElement.addEventListener('click', addToCart);