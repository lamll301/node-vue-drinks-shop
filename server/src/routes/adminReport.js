
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

const adminReportController = require('../app/controllers/AdminReportController')

// router add and remove image
router.patch('/:id/addImage', upload.single('image'), adminReportController.addImage)
router.patch('/:id/removeImage', adminReportController.removeImage)
// trash
router.get('/trash', adminReportController.trash)
router.patch('/:id/restore', adminReportController.restore)
router.delete('/:id/force', adminReportController.forceDelete)
// checkbox
router.post('/handle-form-actions', adminReportController.handleFormActions)

router.put('/:id', upload.single('image'), adminReportController.update)
router.post('/create', upload.single('image'), adminReportController.create)     
router.delete('/:id', adminReportController.delete)
router.get('/:id', adminReportController.detail)
router.get('/', adminReportController.show)     

module.exports = router