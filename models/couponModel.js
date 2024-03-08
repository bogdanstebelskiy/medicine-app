const mongoose = require('mongoose')

const Schema = mongoose.Schema

const couponSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Coupon', couponSchema)