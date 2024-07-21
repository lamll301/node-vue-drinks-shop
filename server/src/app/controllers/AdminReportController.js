
const Report = require('../models/Report')

const REPORT_STATUS_OPTIONS = {
    'draft': 'Bản nháp',
    'published': 'Đã xuất bản'
}
const PAGE_SIZE = 10

class AdminReportController {

    // [GET] /admin/report
    async show(req, res, next) {
        const total = await Report.countDocuments({})
        let page = parseInt(req.query.page)
        const totalPages = Math.ceil(total / PAGE_SIZE)
        page = page > totalPages ? totalPages : page        
        page = page < 1 ? 1 : page                      // if total = 0, page = 1 => page = 0 (err) => đặt đk xuống đây
        let skip = (page - 1) * PAGE_SIZE
        await Promise.all([
            Report.find({}).sortable(req)
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
        if (reportObj.tags) {   // chuyển chuỗi tags thành mảng
            reportObj.tags = reportObj.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
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
        await Report.delete({ _id: req.params.id })     // soft delete
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
        delete req.body.slug;
        let report = { ...req.body }
        delete report.images
        if (report.tags) {   // chuyển chuỗi tags thành mảng   
            report.tags = report.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
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
    
    // trash
    // [GET] /admin/report/trash
    async trash(req, res, next) {
        const total = await Report.countDocumentsWithDeleted({ deleted: true })
        let page = parseInt(req.query.page)
        const totalPages = Math.ceil(total / PAGE_SIZE);
        page = page > totalPages ? totalPages : page;
        page = page < 1 ? 1 : page
        let skip = (page - 1) * PAGE_SIZE
        await Report.findWithDeleted({ deleted: true }).sortable(req)
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
        await Report.deleteOne({ _id: req.params.id })     // force delete
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