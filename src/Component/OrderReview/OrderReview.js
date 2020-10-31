import React from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useState } from 'react';
import OrderItemReview from '../OrderItemReview/OrderItemReview';
import Cart from '../Cart_section/Cart';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';
import Shipment from '../Shipment/Shipment';



const OrderReview = () => {
    const [cart, setCart] = useState([]);
    const [orderplace, setOrderplace] = useState(false)
    const history = useHistory();
    const handleProceedCheckOut = () => {
        history.push('/Shipment')
    }


    const handleRemoveBtn = (productkey) => {
        const removeCart = cart.filter(pd => pd.key !== productkey);
        setCart(removeCart);
        removeFromDatabaseCart(productkey);
    }


    useEffect(() => {
        const saveData = getDatabaseCart();
        const productKey = Object.keys(saveData);

        fetch('http://localhost:4000/productsByKeys',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(productKey)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, []);
    
    let thankYou;
    if(orderplace){
        thankYou = <img src={happyImg} alt=""/>
    }

    return (
        <div style={{display: 'flex'}}>

            <div className="product_section">
                <h1>Order summary</h1>
                {
                    cart.map(product => <OrderItemReview product={product} handleRemoveBtn={handleRemoveBtn}></OrderItemReview>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart_container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckOut} className="bye_button">Proceed ChekOut</button>
                </Cart>
            </div>
            
        </div>
    );
};

export default OrderReview;