const Shop = require('../models/shopModel')
const mongoose = require('mongoose')

const getShops = async (req, res) => {
    const shops = await Shop.find({}).sort({createdAt: -1})

    res.status(200).json(shops)
}

const getShop = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such shop'})
    }
  
    const workout = await Shop.findById(id)
  
    if (!workout) {
      return res.status(404).json({error: 'No such shop'})
    }
  
    res.status(200).json(workout)
  }

const createShop = async (req, res) => {
    const {name, products} = req.body

    try{
        const shop = await Shop.create({name, products})
        res.status(200).json(shop)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getShops,
    getShop,
    createShop
}