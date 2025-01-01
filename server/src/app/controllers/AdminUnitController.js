
const Unit = require('../models/Unit')
const { pagination } = require('../../helpers/helpers')

const PAGE_SIZE = 10

class AdminUnitController {

    // [GET] /admin/unit/all
    async showAll(req, res, next) {
        await Unit.find({})
            .then(units => res.send(units))
            .catch(next)
    }
    
    // [GET] /admin/unit
    async show(req, res, next) {
        const total = await Unit.searchable(req).countDocuments()
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Promise.all([
            Unit.searchable(req).sortable(req)
                .skip(skip)
                .limit(PAGE_SIZE),
            Unit.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([units, deletedCount]) => {
                res.send({
                    units,
                    deletedCount,
                    totalPages,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }   

    // [POST] /admin/unit/create
    async create(req, res, next) {
        const unit = new Unit(req.body);
        await unit.save()
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/unit/:id
    async delete(req, res, next) {
        await Unit.delete({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [GET] /admin/unit/:id
    async detail(req, res, next) {
        await Unit.findById(req.params.id)
            .then(unit => res.send(unit))
            .catch(next)
    } 
    
    // [PUT] /admin/unit/:id
    async update(req, res, next) {
        await Unit.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [GET] /admin/unit/trash
    async trash(req, res, next) {
        const searchQuery = Unit.getSearchQuery(req)
        const total = await Unit.countDocumentsWithDeleted({ ...searchQuery, deleted: true })
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Unit.searchable(req, true).sortable(req)
            .skip(skip)
            .limit(PAGE_SIZE)
            .then(units => {
                res.send({
                    units,
                    totalPages,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }

    // [PATCH] /admin/unit/:id/restore
    async restore(req, res, next) {
        await Unit.restore({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/unit/:id/force
    async forceDelete(req, res, next) {
        await Unit.deleteOne({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [POST] /admin/unit/handle-form-actions
    async handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Unit.delete({ _id: { $in: req.body.unitIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'restore':
                Unit.restore({ _id: { $in: req.body.unitIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'forceDelete':
                Unit.deleteMany({ _id: { $in: req.body.unitIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action is invalid' })
        }
    }
}

module.exports = new AdminUnitController