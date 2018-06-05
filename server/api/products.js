const router = require('express').Router()
const { Product } = require('../db/models')

console.log(Product);

router.get('/', (req, res, next) => {
    Product.findAll({})
    .then(allProducts => {
        res.send(allProducts)
    })
})

module.exports = router