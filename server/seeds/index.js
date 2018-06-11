const {Product,Category,User,Order} = require('../db/models')
const productSeed = require('./productsSeed')
const userSeed = require('./usersSeed')

module.exports = async () => {
    let products = productSeed.map(async product => {
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
        console.log(mappedCategories)
        mappedCategories = mappedCategories.filter((catId,idx) => {
            return mappedCategories.indexOf(catId) === idx
        })
        console.log(mappedCategories)
        await productCreated.addCategories(mappedCategories)  
    })

    const orderTypes = ['pending','purchased','shipped']

    userSeed.map(async (user,index) => {
        const userCreated = await User.create(user)

        const type = (index % 3)
        const orderType = orderTypes[type]
        const orderCreated = await Order.create({status: orderType, userId: userCreated.id})
        for(let i = 0; i < 5; i++){
            orderCreated.addProduct(Math.floor(Math.random() * 1000), {through: {quantity: 10, fixedPrice: Math.floor(Math.random() * 100)}})
        }
    })
}