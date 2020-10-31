import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Productivity.css';
import { Link } from 'react-router-dom';

const Productivity = (props) => {
    const {img, name, seller, price, stock,key} = props.productPass;
    return (
        <div className="product_items">
            <div class="card" style={{width: "70rem"}}>
                <img style={{width:"300px", height:"300px"}} src={img} class="card-img-top" alt="img" />
                <div class="card-body">
                    <h3><Link to={'/Productivity/' + key}>{name}</Link></h3>
                    <h4>By: {seller}</h4>
                    <h4>price: ${price}</h4>
                    <h4><small>Only {stock} left in stock - Order soon</small></h4>
                    <button className="bye_button" onClick={() => props.handlerAddProduct(props.productPass)}><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
                </div>
            </div>
            
        </div>
    );
};

export default Productivity;