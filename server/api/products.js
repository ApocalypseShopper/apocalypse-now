const router = require('express').Router()
const { Product, Category } = require('../db/models')

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

router.put('/:productId', (req, res, next) => {
    Product.update({
        ...req.body
    }, {
            where: { id: req.params.productId },
            returning: true,
            plain: true
        })
        .then(updatedProduct => {
            if (updatedProduct) res.send(updatedProduct)
            else res.sendStatus(404)
        })
        .catch(next)
})


router.get('/:productId', (req, res, next) => {
    Product.findOne({
        where: {
          id: Number(req.params.productId)
        },
        include: [{model: Category}]
      })
        .then(foundProduct => {
            res.send(foundProduct)
        })
        .catch(next)
})

module.exports = router
