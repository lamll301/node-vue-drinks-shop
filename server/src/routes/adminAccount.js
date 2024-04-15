
const express = require('express')
const router = express.Router()

const adminAccountController = require('../app/controllers/AdminAccountController')

router.get('/:id', adminAccountController.detail)    
router.put('/:id', adminAccountController.update)
router.post('/create', adminAccountController.create)     
router.delete('/:id', adminAccountController.delete)     
router.get('/', adminAccountController.show)     

module.exports = router