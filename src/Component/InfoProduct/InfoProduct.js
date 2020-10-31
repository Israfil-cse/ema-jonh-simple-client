import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './InfoProduct.css';

const InfoProduct = () => {
    const { Productivitykey } = useParams(); //{ Productivitykey} ata holo tmr dynamic path
    const [product, setProduct] = useState({});
    useEffect(() =>{
        fetch('http://localhost:4000/Product/'+ Productivitykey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[Productivitykey])
    const {img, name, stock, shipping, price} = product;
    return (
        <div className="infoStyle">
            <h1>Product details</h1>
            <h3>product key: {Productivitykey}</h3> {/*url theke key take ai page show korlo*/}
            <img src={img} alt=""/>
            <h3>product name: { name}</h3>
            <p>product available: { stock }</p>
            <p>product shipping: ${ shipping}</p>
            <p>product Price: ${ price}</p>
        </div>
    );
};

export default InfoProduct;