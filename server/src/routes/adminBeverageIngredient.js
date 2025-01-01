
const express = require('express')
const router = express.Router()

const adminBeverageIngredientController = require('../app/controllers/AdminBeverageIngredientController')

router.put('/:id', adminBeverageIngredientController.update)
router.post('/create', adminBeverageIngredientController.create)
router.delete('/:id', adminBeverageIngredientController.delete)
router.get('/findByBeverage/:id', adminBeverageIngredientController.findByBeverage)
router.get('/:id', adminBeverageIngredientController.detail)
router.get('/', adminBeverageIngredientController.show)

module.exports = router