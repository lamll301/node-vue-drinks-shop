
const express = require('express')
const router = express.Router()

const adminSupplierController = require('../app/controllers/AdminSupplierController')

router.get('/trash', adminSupplierController.trash)
router.patch('/:id/restore', adminSupplierController.restore)
router.delete('/:id/force', adminSupplierController.forceDelete)
router.post('/handle-form-actions', adminSupplierController.handleFormActions)
router.put('/:id', adminSupplierController.update)
router.post('/create', adminSupplierController.create)     
router.delete('/:id', adminSupplierController.delete)    
router.get('/all', adminSupplierController.showAll) 
router.get('/:id', adminSupplierController.detail)    
router.get('/', adminSupplierController.show)     

module.exports = router