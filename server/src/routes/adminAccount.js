
const express = require('express')
const router = express.Router()

const adminAccountController = require('../app/controllers/AdminAccountController')

router.patch('/:id/restore', adminAccountController.restore)
router.delete('/:id/force', adminAccountController.forceDelete)
router.post('/handle-form-actions', adminAccountController.handleFormActions)
router.patch('/:id/addPermission', adminAccountController.addPermission)
router.patch('/:id/removePermission', adminAccountController.removePermission)
router.put('/:id', adminAccountController.update)
router.post('/create', adminAccountController.create)
router.delete('/:id', adminAccountController.delete)
router.get('/all', adminAccountController.all)
router.get('/trash', adminAccountController.trash)
router.get('/:id', adminAccountController.detail)
router.get('/', adminAccountController.show)

module.exports = router