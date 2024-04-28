const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management')
const cartBadgeElements = document.querySelectorAll('.nav-item .badge');
const cartTotalPriceElement = document.getElementById('cart-total-price');



async function updateCartItem(event){

    //console.log('cart-item-management.js')

    event.preventDefault();

    const form = event.target;
    const prodId = form.dataset.productid;
    const csrfToken = form.dataset.csrf;

    const quantity = form.firstElementChild.value; // input


    let response;

    try{
     response = await fetch('/cart/items',{
            method: 'PATCH',
            body: JSON.stringify({
                productid:  prodId,
                _csrf: csrfToken,
                quantity:quantity
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        //console.log('response:',response)
    }catch(error){

        alert('Something Went Wrong');
        return;

    }

    //console.log(response)


    if(!response.ok){
        alert('Something Went Wrong');
        return;
    }

    const responseData = await response.json();


    if(responseData.updatedCartData.updatedItemPrice ===0){
        form.parentElement.parentElement.remove();
    }else{
        const cartItemTotalPriceElement = form.parentElement.querySelector('.cart-item-price'); // <span> + <p>

        cartItemTotalPriceElement.textContent = responseData.updatedCartData.updatedItemPrice.toFixed(2)
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