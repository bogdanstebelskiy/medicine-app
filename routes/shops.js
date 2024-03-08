const express = require('express')

const {
    getShops,
    getShop,
    createShop
} = require('../controllers/shopController')

const router = express.Router()

router.get('/', getShops)
router.get('/:id', getShop)
router.post('/', createShop)



module.exports = router