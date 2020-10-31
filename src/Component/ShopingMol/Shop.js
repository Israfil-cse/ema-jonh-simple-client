import React, { useState } from 'react';
import './Shop.css'
import Productivity from '../Product/Productivity';
import Cart from '../Cart_section/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('https://stark-headland-08286.herokuapp.com/allProducts?search='+search)
        .then(res => res.json())
        .then(data => setProducts(data))
    },[search])

    const handelSearch = event => {
        setSearch(event.target.value);
    }


    useEffect(() => {
        const saveData = getDatabaseCart();
        const productKey = Object.keys(saveData);
        fetch('https://stark-headland-08286.herokuapp.com/productsByKeys',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(productKey)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    },[]);

    

    const handlerAddProduct = (product) => {
        const toBeAdedKey = product.key;
        const countSameProduct = cart.find(pd => pd.key === toBeAdedKey);
        let count = 1;
        let newCart;
        if (countSameProduct) {
            count = countSameProduct.quantity + 1;
            countSameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdedKey)
            newCart = [...others, countSameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);

        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="shoping_mol">
            <div className="product_section">
                <div style={{margin:"0 auto"}} className=" pb-5">
                    <input className="form-control" onChange={handelSearch} type="text" placeholder="  Search Items ................."/>
                </div>
                {
                    products.map(allProduct => <Productivity
                        handlerAddProduct={handlerAddProduct}
                        productPass={allProduct}>
                    </Productivity>)
                }
            </div>
            <div className="cart_section">
                <Cart cart={cart}>
                <Link to="/Review"><button className="bye_button">Order Review</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;