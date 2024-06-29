
const express = require('express')
const router = express.Router()
const adminBeverageRouter = require('./adminBeverage')
const adminPermissionRouter = require('./adminPermission')
const adminAccountRouter = require('./adminAccount')
const adminSupplierRouter = require('./adminSupplier')

const adminController = require('../app/controllers/AdminController')

router.use('/supplier', adminSupplierRouter)
router.use('/account', adminAccountRouter)
router.use('/permission', adminPermissionRouter)
router.use('/beverage', adminBeverageRouter)
router.get('/', adminController.index)

module.exports = router
