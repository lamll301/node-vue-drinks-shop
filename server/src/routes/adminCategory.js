
const express = require('express')
const router = express.Router()

const adminCategoryController = require('../app/controllers/AdminCategoryController')

router.get('/trash', adminCategoryController.trash)
router.patch('/:id/restore', adminCategoryController.restore)
router.delete('/:id/force', adminCategoryController.forceDelete)
router.post('/handle-form-actions', adminCategoryController.handleFormActions)

router.put('/:id', adminCategoryController.update)
router.post('/create', adminCategoryController.create)     
router.delete('/:id', adminCategoryController.delete)  
router.get('/all', adminCategoryController.showAll)
router.get('/:id', adminCategoryController.detail)
router.get('/', adminCategoryController.show)     

module.exports = router