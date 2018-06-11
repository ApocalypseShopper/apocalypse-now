const {Product,Category} = require('../db/models')
const seed = require('./productsSeed')

module.exports = async () => {
    let products = seed.map(async product => {
        const productCreated = await Product.create({
            title: product.title,
            description: product.description,
            price: product.price,
            quantity: product.quantity
        })

        
        const categoriesList = product.categories.split(' ')
        const cats = await Promise.all(categoriesList.map(cat => {
            return Category.findOrCreate({
                where: {
                    name: cat
                },
                defaults: { name: cat }
            })
        }))
        
        let mappedCategories = cats.map(cat => {
            return cat[0].id
        })
        
        mappedCategories = mappedCategories.filter((catId,idx) => {
            return mappedCategories.indexOf(catId) !== idx
        })
        
        await productCreated.addCategories(mappedCategories)  
    })

    await Promise.all(products)
    
}