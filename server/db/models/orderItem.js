const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  fixedPrice: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      isDecimal: true
    },
    defaultValue: null,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
})

module.exports = OrderItem
