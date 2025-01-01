
const express = require('express')
const router = express.Router()

const adminPromotionController = require('../app/controllers/AdminPromotionController')

router.get('/trash', adminPromotionController.trash)
router.patch('/:id/restore', adminPromotionController.restore)
router.delete('/:id/force', adminPromotionController.forceDelete)
router.post('/handle-form-actions', adminPromotionController.handleFormActions)
router.put('/:id', adminPromotionController.update)
router.post('/create', adminPromotionController.create)     
router.delete('/:id', adminPromotionController.delete)
router.get('/all', adminPromotionController.showAll)   
router.get('/:id', adminPromotionController.detail)    
router.get('/', adminPromotionController.show)     

module.exports = router