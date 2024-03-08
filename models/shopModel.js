const mongoose = require('mongoose')

const Product = require('./productModel')

const Schema = mongoose.Schema

const shopSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    products: [Product.schema]
}, { timestamps: true })

module.exports = mongoose.model('Shop', shopSchema)