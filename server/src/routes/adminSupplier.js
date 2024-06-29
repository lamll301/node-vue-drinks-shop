
const express = require('express')
const router = express.Router()

const adminSupplierController = require('../app/controllers/AdminSupplierController')

router.get('/:id', adminSupplierController.detail)    
router.put('/:id', adminSupplierController.update)
router.post('/create', adminSupplierController.create)     
router.delete('/:id', adminSupplierController.delete)     
router.get('/', adminSupplierController.show)     

module.exports = router