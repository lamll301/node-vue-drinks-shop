
const express = require('express')
const router = express.Router()
const multer  = require('multer')
// const storage = multer.memoryStorage();      //luu luon len db
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/src/assets/img/products/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
    }
})
const upload = multer({ storage: storage });

const adminBeverageController = require('../app/controllers/AdminBeverageController')

router.post('/create', upload.single('image'), adminBeverageController.create)     
router.get('/:id', adminBeverageController.detail)      
router.put('/:id', upload.single('image'), adminBeverageController.update)
router.delete('/:id', adminBeverageController.delete)  
router.get('/', adminBeverageController.show)           //list

module.exports = router