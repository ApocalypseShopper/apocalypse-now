const Sequelize = require('sequelize')
const Category = require('./category')
const db = require('../db')

const Product = db.define('product', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    imageUrl: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'http://www.safetysign.com/images/source/large-images/J6805.png',
        validate: {
            notEmpty: ''
        }
    }
});

Product.prototype.updateCategories = function(categories, product) {
    return Product.findById(
        product.id,
        { include: [{ model: Category }] }
    )
    .then(foundProduct => {
        const prodCategories = foundProduct.categories.map(category => category.id)
        const uniqueProdCategory = prodCategories.filter(category => !categories.includes(category))
        const uniqueCategory = categories.filter(category => !prodCategories.includes(category))
        foundProduct.removeCategories(uniqueProdCategory)
        foundProduct.addCategories(uniqueCategory)
    })
    .catch(console.error)
  }

module.exports = Product;
