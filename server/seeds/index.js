const {Product} = require('../db/models')
const seed = require('./productsSeed')

module.exports = async () => {
    let products = seed.map(product => {
        Product.create(product)
    })

    await Promise.all(products)
    console.log("!!!!!!!!!!!!SEEDED!!!!!!!!!!")
}