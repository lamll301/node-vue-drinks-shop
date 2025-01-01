
const express = require('express')
const router = express.Router()

const adminPermissionController = require('../app/controllers/AdminPermissionController')

router.get('/trash', adminPermissionController.trash)
router.patch('/:id/restore', adminPermissionController.restore)
router.delete('/:id/force', adminPermissionController.forceDelete)
router.post('/handle-form-actions', adminPermissionController.handleFormActions)
router.put('/:id', adminPermissionController.update)
router.post('/create', adminPermissionController.create)     
router.delete('/:id', adminPermissionController.delete)  

router.get('/all', adminPermissionController.showAll)
router.get('/:id', adminPermissionController.detail)
router.get('/', adminPermissionController.show)

module.exports = router