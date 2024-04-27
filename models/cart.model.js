
class Cart{
    constructor(items = [], totalQuantity = 0, totalPrice = 0){
        this.items = items;
        this.totalPrice = totalPrice;
        this.totalQuantity = totalQuantity;
    }
    addItem(currProduct){
        const cartItem = {
            product: currProduct,
            quantity: 1,
            totalPrice: currProduct.price
        }

        // console.log('cart.model cartItem:',cartItem)


        for(let i = 0; i < this.items.length; i++){
            const item = this.items[i];
            //console.log('inside for:', item)

            if(item.product.id === currProduct.id){
                cartItem.quantity = +item.quantity +1;
                cartItem.totalPrice = +item.totalPrice + currProduct.price;
                this.items[i] = cartItem;
                
                this.totalQuantity++;
                this.totalPrice += +currProduct.price;
                console.log('cart.model this.totalPrice1:',this.totalPrice)
                return;
            }
        }
        this.items.push(cartItem);
        this.totalQuantity++;
        this.totalPrice += +currProduct.price;
        console.log('cart.model this.totalPrice2:',this.totalPrice)

    }
    updateItem(prodId, newQuantity){

        //console.log('cart.Model: updateItem')
        //loop through the curr cart's items
        for( let i = 0; i < this.items.length; i++){

            //currItem
            const item = this.items[i];

            //console.log('item:', item)

            //console.log('item.product.id:', item.product.id,'prodId:',prodId)


            
            //currItem id is the one we are updating
            if(item.product.id === prodId && newQuantity > 0){

                //console.log('item: if')


                const cartItem = {...item};

                const quantityChange = newQuantity - item.quantity;

                cartItem.quantity = newQuantity;

                cartItem.totalPrice = newQuantity * item.product.price;

                this.items[i] = cartItem;

                this.totalPrice += quantityChange * item.product.price;
                
                this.totalQuantity = this.totalQuantity + quantityChange;

                return {updatedItemPrice : cartItem.totalPrice};

                //remove if newQuantity is 0 or under
            }else if(item.product.id === prodId && newQuantity <= 0){

                this.items.splice(i,1);
                this.totalQuantity = this.totalQuantity - item.quantity;

                this.totalPrice -= item.totalPrice; // maybe totalPrice

                return {updatedItemPrice: 0};
            }
        }
    }
}

module.exports = Cart;