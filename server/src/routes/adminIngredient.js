
const express = require('express')
const router = express.Router()

const adminIngredientController = require('../app/controllers/AdminIngredientController')

router.get('/trash', adminIngredientController.trash)
router.patch('/:id/restore', adminIngredientController.restore)
router.delete('/:id/force', adminIngredientController.forceDelete)
router.post('/handle-form-actions', adminIngredientController.handleFormActions)
router.put('/:id', adminIngredientController.update)
router.post('/create', adminIngredientController.create)     
router.delete('/:id', adminIngredientController.delete)
router.get('/all', adminIngredientController.all)
router.get('/:id', adminIngredientController.detail)
router.get('/', adminIngredientController.show)     

module.exports = router