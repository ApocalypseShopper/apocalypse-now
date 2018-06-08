const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/', (req, res, next) => {
  Order.findAll({include: [{all: true}]})
    .then(allOrders => {
      res.send(allOrders)
    })
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
  Order.findOne({
    where: {
      id: Number(req.params.orderId)
    },
    include: [{all: true}]
  })
  .then(order => {
    res.send(order)
  })
  .catch(next)
})

router.post('/', (req, res, next) => {
  Order.findOrCreate({
    where:{status: 'pending'},
    defaults: req.body
  })
    .then(createdOrder => {
      res.status(201).send(createdOrder[0]);
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

module.exports = router
