
const express = require('express')
const router = express.Router()

const adminBeverageController = require('../app/controllers/AdminBeverageController')

router.post('/create', adminBeverageController.create)      
router.get('/:id', adminBeverageController.detail)      
router.put('/:id', adminBeverageController.update)
router.delete('/:id', adminBeverageController.delete)  
router.get('/', adminBeverageController.show)           //list

module.exports = router