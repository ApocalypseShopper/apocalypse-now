const router = require('express').Router()
const { Product } = require('../db/models')

router.get('/', (req, res, next) => {
    Product.findAll({})
    .then(allProducts => {
        res.send(allProducts)
    })
    .catch(next)
})

module.exports = router