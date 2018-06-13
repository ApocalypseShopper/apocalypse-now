const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('pending', 'purchased', 'shipped'),
    defaultValue: 'pending',
  },
})

Order.prototype.updateQuantity = function (quantity, product) {
  this.removeProduct(product)
  this.addProduct(product, { through: { quantity: product.quantity, fixedPrice: product.fixedPrice } })
}

module.exports = Order
