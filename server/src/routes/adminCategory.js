
const express = require('express')
const router = express.Router()
const multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/src/assets/img/data/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
    }
})
const upload = multer({ storage: storage });

const adminCategoryController = require('../app/controllers/AdminCategoryController')

// router add and remove image
router.put('/:id/addImage', upload.single('image'), adminCategoryController.addImage)
router.put('/:id/removeImage', adminCategoryController.removeImage)
// 
router.get('/:id', adminCategoryController.detail)    
router.put('/:id', adminCategoryController.update)
router.post('/create', upload.single('image'), adminCategoryController.create)     
router.delete('/:id', adminCategoryController.delete)     
router.get('/', adminCategoryController.show)     

module.exports = router