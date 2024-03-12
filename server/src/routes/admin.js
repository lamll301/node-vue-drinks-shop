
const express = require('express')
const router = express.Router()
const adminBeverageRouter = require('./adminBeverage')

const adminController = require('../app/controllers/AdminController')

router.use('/beverage', adminBeverageRouter)
router.get('/', adminController.index)

module.exports = router
