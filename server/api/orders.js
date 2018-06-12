const router = require('express').Router()
const { Order, Product, OrderItem } = require('../db/models')

router.get('/', (req, res, next) => {
  Order.findAll({ include: [{ all: true }] })
    .then(allOrders => {
      res.send(allOrders)
    })
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  Order.findOrCreate({
    where: {
      userId: Number(req.params.userId),
      status: 'pending'
    },
    include: [{ all: true }]
  })
    .then(order => {
      res.send(order[0])
    })
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
  Order.findOne({
    where: {
      id: Number(req.params.orderId)
    },
    include: [{ all: true }]
  })
    .then(order => {
      res.send(order)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Order.findOrCreate({
    where: { status: 'pending' },
    defaults: req.body
  })
    .then(createdOrder => {
      res.status(201).send(createdOrder[0]);
    })
    .catch(next)
})

router.put('/:userId/products', (req, res, next) => {
  Order.findOrCreate({
    where: {
      userId: Number(req.params.userId),
      status: 'pending'
    },
    include: [{ all: true }]
  })
    .then(order => {
      return order[0].addProduct(req.body.id, { through: { quantity: 1, fixedPrice: req.body.fixedPrice } })
    })
    .then(addedProduct => {
      res.send(addedProduct)
    })
    .catch(next)
})

router.delete('/:orderId/products', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => {
      return order.removeProduct(req.body.id)
    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(next)
})

router.put('/:orderId/quantity/:productId', (req, res, next) => {
  Order.findById(Number(req.params.orderId),
    {
      include: [{all: true}]
    })
    .then(foundOrder => {
      let [product] = foundOrder.products.filter(prod => prod.id === Number(req.params.productId))
      
      foundOrder.removeProduct(product)
      foundOrder.addProduct(product, { through: { quantity: req.body.quantity, fixedPrice: product.price } })
      res.send('We hit')
    })
    .catch(next)
})

router.put('/:orderId', (req, res, next) => {
  Order.update({
    ...req.body
  }, {
      where: {
        id: req.params.orderId
      },
      returning: true,
      plain: true
    })
    .then(updatedOrder => {
      if (updatedOrder) res.send(updatedOrder[1])
      else res.sendStatus(404)
    })
    .catch(next)
})

// router.put('./:orderId/quantity/:productId', (req, res, next) => {
//   Order.findById(Number(req.params.orderId),
//     {
//       include: [{all: true}]
//     })
//     .then(foundOrder => {
//       let product = foundOrder.product.filter(prod => prod.id === Number(req.params.productId))
//       foundOrder.updateQuantity(req.body.quantity, product)
//       res.send('We hit')
//     })
//     .catch(next)
// })


module.exports = router
