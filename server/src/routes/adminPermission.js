
const express = require('express')
const router = express.Router()

const adminPermissionController = require('../app/controllers/AdminPermissionController')

router.get('/:id', adminPermissionController.detail)    
router.put('/:id', adminPermissionController.update)
router.post('/create', adminPermissionController.create)     
router.delete('/:id', adminPermissionController.delete)     
router.get('/', adminPermissionController.show)     

module.exports = router