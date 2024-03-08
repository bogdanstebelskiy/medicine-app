require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const shopRoutes = require('./routes/shops')
const customerRoutes = require('./routes/customers')
const couponRoutes = require('./routes/coupons')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/shops', shopRoutes);
app.use('/api/customers', customerRoutes)
app.use('/api/coupons', couponRoutes)

mongoose.connect(process.env.MONGO_URI, {dbName: 'MedicineDeliveryDatabase'})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to database and listening on port 4000')
        })        
    })
    .catch((error) => {
        console.log(error)
    })

