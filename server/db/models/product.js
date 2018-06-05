const crypto = require('crypto')
const Sequelize = require('sequelize')
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
        type: Sequelize.DECIMAL(10,2),
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
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'https://cdn.shopify.com/s/files/1/1017/2183/t/2/assets/live-preview-potato.png?4854792436625201403',
    }
});

module.exports = Product;