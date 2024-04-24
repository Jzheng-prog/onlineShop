const deleteProductButtonElements = document.querySelectorAll('.product-item button')

async function deleteProd(event){

    const buttonElement = event.target;

    const productid = buttonElement.dataset.productid;
    const csrfToken = buttonElement.dataset.csrf;

    console.log('inside deleteProd', productid, csrfToken);


    const response = await fetch('/admin/products/' + productid + '?_csrf=' + csrfToken, {
        method: 'DELETE'
    });

    // console.log(response);

    if(!response.ok){
        alert('Something went wrong!');
        return;
    }
    buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for( const deleteProductButtonElement of deleteProductButtonElements){
    deleteProductButtonElement.addEventListener('click', deleteProd);
}