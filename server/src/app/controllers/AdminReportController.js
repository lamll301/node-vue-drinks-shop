
const Report = require('../models/Report')

const REPORT_STATUS_OPTIONS = {
    'draft': 'Bản nháp',
    'published': 'Đã xuất bản'
}

class AdminReportController {

    // [GET] /admin/report
    async show(req, res, next) {
        await Report.find({})
            .then(reports => res.send({ reports, reportStatusOptions: REPORT_STATUS_OPTIONS }))
            .catch(next)
    }   

    // [POST] /admin/report/create
    async create(req, res, next) {
        let reportObj = { ...req.body }
        reportObj.images = []
        if (req.file) {
            reportObj.images.push({
                data: req.file.buffer,
                contentType: req.file.mimetype,
                name: req.file.filename,
            })
        }
        const report = new Report(reportObj);
        await report.save()
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/report/:id
    async delete(req, res, next) {
        await Report.deleteOne({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [GET] /admin/report/:id
    async detail(req, res, next) {
        await Report.findById(req.params.id)
            .then(report => res.send({ report, reportStatusOptions: REPORT_STATUS_OPTIONS }))
            .catch(next)
    } 
    
    // [PUT] /admin/report/:id
    async update(req, res, next) {
        await Report.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('success'))
            .catch(next)
    } 
    // [PUT] /admin/report/:id/addImage
    async addImage(req, res, next) {
        if (!req.file) {
            return;
        } 
        const newImage = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
            name: req.file.filename,
        }
        await Report.updateOne(
            { _id: req.params.id },
            { $push: { images: newImage } }
        )
            .then(() => res.send('success'))
            .catch(next)
    } 
    // [PUT] /admin/report/:id/removeImage
    async removeImage(req, res, next) {
        const { imageId } = req.body
        await Report.updateOne(
            { _id: req.params.id },
            { $pull: { images: { _id: imageId } } }
        )
            .then(() => res.send('success'))
            .catch(next)
    }
}

module.exports = new AdminReportController