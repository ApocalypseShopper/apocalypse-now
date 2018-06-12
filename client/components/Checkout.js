import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const CURRENCY = 'USD';
const fromDollarToCent = amount => amount * 100

const successPayment = data => {
    alert('Payment Successful');
};

const errorPayment = data => {
    alert('Payment Error');
};

const onToken = (amount, description) => token =>
    axios.post('/api/payment',
        {
            description,
            source: token.id,
            currency: CURRENCY,
            amount: fromDollarToCent(amount)
        })
        .then(successPayment)
        .catch(errorPayment);

const Checkout = ({amount}) =>
    <StripeCheckout
        name={'Your Cart'}
        description={'This is all your orders'}
        amount={fromDollarToCent(amount)}
        token={onToken(amount,'This is all your orders')}
        currency={CURRENCY}
        stripeKey={'pk_test_rTH0SFU9hTdEnqYMR8sLZdGR'}
    />

export default Checkout
