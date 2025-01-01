
const express = require('express')
const router = express.Router()

const adminCustomerController = require('../app/controllers/AdminCustomerController')

router.patch('/:id/restore', adminCustomerController.restore)
router.delete('/:id/force', adminCustomerController.forceDelete)
router.post('/handle-form-actions', adminCustomerController.handleFormActions)
router.put('/:id', adminCustomerController.update)
router.post('/create', adminCustomerController.create)
router.delete('/:id', adminCustomerController.delete)
router.get('/all', adminCustomerController.all)
router.get('/trash', adminCustomerController.trash)
router.get('/:id', adminCustomerController.detail)
router.get('/', adminCustomerController.show)

module.exports = router