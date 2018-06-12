const router = require('express').Router()
const stripe = require('stripe') ('pk_test_rTH0SFU9hTdEnqYMR8sLZdGR')
// const stripe = stripeLib.configureStripe('pk_test_rTH0SFU9hTdEnqYMR8sLZdGR')

const postStripeCharge = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  }

router.get('/', (req, res, next) => {
    res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
})

router.post('/', (req, res, next) => {
    stripe.charges.create(req.body, postStripeCharge(res))
})

module.exports = router

// router.post('/', (req, res, next) => {
//     let token = req.body.stripeToken
//     let chargeAmount = req.body.chargeAmount
//     let charge = stripe.charges.create({
//         amount: chargeAmount,
//         currency: 'usd',
//         source: token
//     }, function(err, charge){
//         if(err & err.type === "StripeCardError") {
//             console.log('Your card was declined')
//         }
//     }
// )
// })