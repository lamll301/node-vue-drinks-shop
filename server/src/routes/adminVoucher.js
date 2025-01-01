
const express = require('express')
const router = express.Router()

const adminVoucherController = require('../app/controllers/AdminVoucherController')

router.patch('/:id/restore', adminVoucherController.restore)
router.delete('/:id/force', adminVoucherController.forceDelete)
router.post('/handle-form-actions', adminVoucherController.handleFormActions)
router.put('/:id', adminVoucherController.update)
router.post('/create', adminVoucherController.create)  
router.delete('/:id', adminVoucherController.delete)
router.get('/all', adminVoucherController.all)
router.get('/trash', adminVoucherController.trash)
router.get('/:id', adminVoucherController.detail)
router.get('/', adminVoucherController.show)

module.exports = router