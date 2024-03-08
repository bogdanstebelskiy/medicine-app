const Coupon = require('../models/couponModel')

const getCoupons = async (req, res) => {
    const coupons = await Coupon.find({}).sort({createdAt: -1})

    res.status(200).json(coupons)
}

const createCoupon = async (req, res) => {
    const {name, code, discount} = req.body

    try{
        const coupon = await Coupon.create({name, code, discount})
        res.status(200).json(coupon)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getCoupons,
    createCoupon
}