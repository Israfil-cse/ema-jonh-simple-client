import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Payment from '../Payment/Payment';
import './Shipment.css';
const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => {
    const saveCart = getDatabaseCart();
    const orderDetails = {...loggedInUser, products: saveCart, shipment:data, orderTime: new Date()}

    fetch('http://localhost:4000/addOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        processOrder()
        alert('your order has been added')
      }
    })

  }

  return (
  <div className="row">
      <div className="col-md-6">

          <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          
          <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="your name" />
          {errors.name && <span className='error'>Name is required</span>}

          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="your email" />
          {errors.name && <span className='error'>Email is required</span>}

          <input name="address" ref={register({ required: true })} placeholder="your address" />
          {errors.name && <span className='error'>address is required</span>}

          <input name="phone" ref={register({ required: true })} placeholder="your phone number" />
          {errors.name && <span className='error'>phone number is required</span>}

          <input type="submit" />
        </form>
      </div>

      <div className="col-md-6">
        <h1>please pay for me</h1>
          <Payment></Payment>
      </div>

    </div>
  );
};

export default Shipment;