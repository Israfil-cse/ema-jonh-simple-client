import React from 'react';
import './Cart.css'


const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total , product) => total + product.price * product.quantity,0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1;
    }
    let shipping = 0;
    if(total > 30){
        shipping = 0;
    }else if(total > 15){
        shipping = 6.99;
    }else if(total > 10){
        shipping = 4.99;
    }
    const grandTotal = (total + shipping);
    return (
        <div className="cartStyle">
            <h3>Order Summary</h3>
            <h4>Item Ordered: {cart.length}</h4>
            <h4>Product Price: ${total} </h4>
            <h4>Shipping Cost: ${shipping}</h4>
            <h3>Total: ${grandTotal}</h3>
            {
                props.children
            }
        </div>
    );
};

export default Cart;