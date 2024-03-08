const mongoose = require('mongoose')

const Product = require('./productModel')

const Schema = mongoose.Schema

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    totalPrice: {
        type: String,
        required: true
    },
    order: [Product.schema]
}, { timestamps: true })

module.exports = mongoose.model('Customer', customerSchema)