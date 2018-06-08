const router = require('express').Router()
const { Product, Category } = require('../db/models')

router.get('/', (req, res, next) => {
    Product.findAll({include: [{model: Category}]})
        .then(allProducts => {
            res.send(allProducts)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    let newProduct = {}
    Product.create(req.body)
        .then(createdProduct => {
            newProduct = createdProduct
            const categories = req.body.category.split(' ')
            return Promise.all(categories.map(cat => {
                return Category.findOrCreate({
                    where: {
                        name: cat
                    },
                    defaults: {name: cat}
                })
            }))
        })
        .then(categories => {
            const mappedCategories = categories.map(cat => cat[0 ].id)
            return newProduct.addCategories(mappedCategories)
        })
        .then(() => {
            res.status(201).send(newProduct)
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
    Product.findById(Number(req.params.productId))
        .then(foundProduct => {
            res.send(foundProduct)
        })
        .catch(next)
})

// router.post('/add', (req, res, next) => {
//         Product.addCategories(req.body.categories)
//         .then(addedCategory => {
//             res.send(addedCategory)
//         })
//         .catch(next)
// })

module.exports = router
