
const Report = require('../models/Report')
const { stringToArray, pagination } = require('../../helpers/helpers')

const REPORT_STATUS_OPTIONS = {
    'draft': 'Bản nháp',
    'published': 'Đã xuất bản'
}
const PAGE_SIZE = 10

class AdminReportController {

    // [GET] /admin/report
    async show(req, res, next) {
        const total = await Report.searchable(req).countDocuments()
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Promise.all([
            Report.searchable(req).sortable(req)
                .skip(skip)
                .limit(PAGE_SIZE),
            Report.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([reports, deletedCount]) => {
                res.send({
                    reports,
                    deletedCount,
                    totalPages,
                    REPORT_STATUS_OPTIONS, 
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }   

    // [POST] /admin/report/create
    async create(req, res, next) {
        let reportObj = { ...req.body }
        reportObj.images = []
        if (reportObj.tags) {
            reportObj.tags = stringToArray(reportObj.tags)
        }
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
        await Report.delete({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [GET] /admin/report/:id
    async detail(req, res, next) {
        await Report.findById(req.params.id)
            .then(report => res.send({ report, REPORT_STATUS_OPTIONS }))
            .catch(next)
    } 
    
    // [PUT] /admin/report/:id
    async update(req, res, next) {
        delete req.body.slug
        let report = { ...req.body }
        delete report.images
        if (report.tags) {
            report.tags = stringToArray(report.tags)
        }
        if (req.file) {
            const newImage = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                name: req.file.filename,
            }
            report.$push = { images: newImage }
        }
        await Report.updateOne({ _id: req.params.id }, report)
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [PATCH] /admin/report/:id/addImage
    async addImage(req, res, next) {
        if (!req.file) return
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

    // [PATCH] /admin/report/:id/removeImage
    async removeImage(req, res, next) {
        const { imageId } = req.body
        await Report.updateOne(
            { _id: req.params.id },
            { $pull: { images: { _id: imageId } } }
        )
            .then(() => res.send('success'))
            .catch(next)
    }
    
    // [GET] /admin/report/trash
    async trash(req, res, next) {
        const searchQuery = Report.getSearchQuery(req)
        const total = await Report.countDocumentsWithDeleted({ ...searchQuery, deleted: true })
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Report.searchable(req, true).sortable(req)
            .skip(skip)
            .limit(PAGE_SIZE)
            .then(reports => {
                res.send({
                    reports,
                    totalPages,
                    REPORT_STATUS_OPTIONS,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }

    // [PATCH] /admin/report/:id/restore
    async restore(req, res, next) {
        await Report.restore({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/report/:id/force
    async forceDelete(req, res, next) {
        await Report.deleteOne({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [POST] /admin/report/handle-form-actions
    async handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Report.delete({ _id: { $in: req.body.reportIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'restore':
                Report.restore({ _id: { $in: req.body.reportIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'forceDelete':
                Report.deleteMany({ _id: { $in: req.body.reportIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action is invalid' })
        }
    }
}

module.exports = new AdminReportController