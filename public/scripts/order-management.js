const updateOrderFormElements = document.querySelectorAll('.order-actions form') //order-items.ejs

async function updateOrder(event){

    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);

    const newStatus = formData.get('status');

    const orderId = formData.get('orderid');

    const csrfToken = formData.get('_csrf');

    //console.log('Clicked Update Start')

    
    //console.log('Status', newStatus)

    let response;

    try{
        //console.log('Inside try')

        response = await fetch(`/admin/orders/${orderId}`,{
            method:'PATCH',
            body: JSON.stringify({
                newStatus: newStatus,
                _csrf: csrfToken,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        //console.log('order.management updateOrder reponse recieved:', response)

    }catch(error){
        console.log('Inside catch')

        alert('Something went Wrong1!');
        return;
    }

    if(!response.ok){
        console.log('Inside if')

        alert('Something went Wrong2!');
        return;
    }

    //console.log('order.management updateOrder reponse:', response)


    const responseData = await response.json();

    //console.log('order.management updateOrder reponseData:', responseData)


    form.parentElement.parentElement.querySelector('.badge').textContent = responseData.newStatus.toUpperCase();
    //console.log('Clicked Update end')

}

for(const updateElement of updateOrderFormElements){
    updateElement.addEventListener('submit', updateOrder)
}