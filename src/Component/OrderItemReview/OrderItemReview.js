import React from 'react';
import './OrderItemReview.css';
const OrderItemReview = (props) => {
    const {name,quantity,price,key} = props.product;
    return (
        <div>
            <h4>Name: {name}</h4>
            <h4>Quantity: {quantity}</h4>
            <h4>price: {price}</h4>

            <button onClick={ () => props.handleRemoveBtn(key)} className="bye_button">Remove</button>
        </div>
    );
};

export default OrderItemReview;