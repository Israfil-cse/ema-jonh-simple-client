import React from 'react';

const ManageEnventory = () => {
    const handlerAddProducts = () => {
        const products = {};
        fetch('http://localhost:4000/addProducts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(products)
        })
        
    }
    return (
        <div>
            <form action="">
                <p><span>name</span><input type="text"/></p>
                <p><span>price</span><input type="text"/></p>
                <p><span>quantity</span><input type="text"/></p>
                <p><span>product image</span><input type="file"/></p>
            </form>
            <button onClick={handlerAddProducts}>add product</button>
        </div>
    );
};

export default ManageEnventory;