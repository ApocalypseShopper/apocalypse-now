const router = require('express').Router()
const { Product } = require('../db/models')

router.get('/', (req, res, next) => {
    Product.findAll({})
    .then(allProducts => {
        res.send(allProducts)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    Product.create(req.body)
    .then(createdProduct => {
        res.status(201).send(createdProduct);
    })
    .catch(next)
})

router.get('/:productId', (req, res, next) => {
    Product.findById(Number(req.params.productId))
    .then(foundProduct => {
        res.send(foundProduct)
    })
    .catch(next)
})

module.exports = router
