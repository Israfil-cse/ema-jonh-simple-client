import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardPayment from './SimpleCardPayment';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51Ha1uTHF7xtnLDXDguiQ8nNO4NQP2Pcd8jTDvMJkdnSenRJWNShmoKvnpkWCt3o1p6kIN4iBHaNDfTRDIxli4ync004tf1myt0');


const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardPayment></SimpleCardPayment>
        </Elements>
    );
};

export default Payment;