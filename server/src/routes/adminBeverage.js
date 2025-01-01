
const express = require('express')
const router = express.Router()
const multer  = require('multer')
// const storage = multer.memoryStorage();
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

const adminBeverageController = require('../app/controllers/AdminBeverageController')

router.patch('/:id/addImage', upload.single('image'), adminBeverageController.addImage)     // data dạng file và có dạng image: abcde12345.jpg
router.patch('/:id/removeImage', adminBeverageController.removeImage)
router.patch('/:id/addCategory', adminBeverageController.addCategory)
router.patch('/:id/removeCategory', adminBeverageController.removeCategory)

router.get('/trash', adminBeverageController.trash)
router.patch('/:id/restore', adminBeverageController.restore)
router.delete('/:id/force', adminBeverageController.forceDelete)
router.post('/handle-form-actions', adminBeverageController.handleFormActions)

router.post('/create', upload.single('image'), adminBeverageController.create)
router.put('/:id', upload.single('image'), adminBeverageController.update)
router.delete('/:id', adminBeverageController.delete)
router.get('/all', adminBeverageController.all)
router.get('/:id', adminBeverageController.detail)
router.get('/', adminBeverageController.show)

module.exports = router