import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = 'pk_test_rTH0SFU9hTdEnqYMR8sLZdGR';
const PAYMENT_SERVER_URL = 'http://localhost:8080/api/checkout';

const CURRENCY = 'USD';

const fromDollarToCent = amount => amount * 100;

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
      amount: fromDollarToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Stripe = ({ amount }) => (
    <StripeCheckout
      name="Cart"
      description="Your Orders: Pay us"
      amount={fromDollarToCent(amount)}
      token={onToken(amount, 'Your Orders: Pay us')}
      currency={CURRENCY}
      stripeKey={STRIPE_PUBLISHABLE}
    />
)


export default Stripe
