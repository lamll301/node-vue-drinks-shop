
const express = require('express')
const router = express.Router()

const adminUnitController = require('../app/controllers/AdminUnitController')

router.get('/trash', adminUnitController.trash)
router.patch('/:id/restore', adminUnitController.restore)
router.delete('/:id/force', adminUnitController.forceDelete)
router.post('/handle-form-actions', adminUnitController.handleFormActions)
router.put('/:id', adminUnitController.update)
router.post('/create', adminUnitController.create)     
router.delete('/:id', adminUnitController.delete)
router.get('/all', adminUnitController.showAll)
router.get('/:id', adminUnitController.detail)    
router.get('/', adminUnitController.show)     

module.exports = router