import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = 'pk_test_rTH0SFU9hTdEnqYMR8sLZdGR';
const PAYMENT_SERVER_URL = 'http://localhost:8080/api/checkout';

const CURRENCY = 'USD';

const fromCentToCent = amount => amount * 100;

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

const onToken = (amount, description) => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromCentToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Stripe = ({}) => (
    <StripeCheckout
      name="Cart"
      description="Your Orders: Pay us"
      amount={fromCentToCent(200)}
      token={onToken(200, 'Your Orders: Pay us')}
      currency={CURRENCY}
      stripeKey={STRIPE_PUBLISHABLE}
    />
)


export default Stripe
