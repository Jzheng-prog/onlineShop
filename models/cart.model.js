
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

        for(let i = 0; i < this.items.length; i++){
            const item = this.items[i];

            if(item.product.id === currProduct.id){
                cartItem.quantity = item.quantity +1;
                cartItem.totalPrice = item.totalPrice + currProduct.price;
                this.items[i] = cartItem;
                
                this.totalQuantity++;
                this.totalPrice += currProduct.price;
                return;
            }
            this.items.push(cartItem);
            this.totalQuantity++;
            this.totalPrice += currProduct.price;
        }

    }
}

module.exports = Cart;