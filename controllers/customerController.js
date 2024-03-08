const Customer = require('../models/customerModel')

const getCustomers = async (req, res) => {
    const customers = await Customer.find({}).sort({createdAt: -1})

    res.status(200).json(customers)
}

const createCustomer = async (req, res) => {
    const {name, email, phone, address, totalPrice, order} = req.body

    try{
        const customer = await Customer.create({name, email, phone, address, totalPrice, order})
        res.status(200).json(customer)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getCustomers,
    createCustomer
}