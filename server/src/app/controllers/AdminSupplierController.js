
const Supplier = require('../models/Supplier')
const { pagination } = require('../../helpers/helpers')

const PAGE_SIZE = 10

class AdminSupplierController {

    // [GET] /admin/supplier/all
    async showAll(req, res, next) {
        await Supplier.find({})
            .then(suppliers => res.send(suppliers))
            .catch(next)
    }

    // [GET] /admin/supplier
    async show(req, res, next) {
        const total = await Supplier.searchable(req).countDocuments()
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Promise.all([
            Supplier.searchable(req).sortable(req)
                .skip(skip)
                .limit(PAGE_SIZE),
            Supplier.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([suppliers, deletedCount]) => {
                res.send({
                    suppliers,
                    deletedCount,
                    totalPages,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }   

    // [POST] /admin/supplier/create
    async create(req, res, next) {
        const supplier = new Supplier(req.body);
        await supplier.save()
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/supplier/:id
    async delete(req, res, next) {
        await Supplier.delete({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [GET] /admin/supplier/:id
    async detail(req, res, next) {
        await Supplier.findById(req.params.id)
            .then(supplier => res.send(supplier))
            .catch(next)
    } 
    
    // [PUT] /admin/supplier/:id
    async update(req, res, next) {
        await Supplier.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [GET] /admin/supplier/trash
    async trash(req, res, next) {
        const searchQuery = Supplier.getSearchQuery(req)
        const total = await Supplier.countDocumentsWithDeleted({ ...searchQuery, deleted: true })
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Supplier.searchable(req, true).sortable(req)
            .skip(skip)
            .limit(PAGE_SIZE)
            .then(suppliers => {
                res.send({
                    suppliers,
                    totalPages,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }

    // [PATCH] /admin/supplier/:id/restore
    async restore(req, res, next) {
        await Supplier.restore({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/supplier/:id/force
    async forceDelete(req, res, next) {
        await Supplier.deleteOne({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [POST] /admin/supplier/handle-form-actions
    async handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Supplier.delete({ _id: { $in: req.body.supplierIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'restore':
                Supplier.restore({ _id: { $in: req.body.supplierIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'forceDelete':
                Supplier.deleteMany({ _id: { $in: req.body.supplierIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action is invalid' })
        }
    }
}

module.exports = new AdminSupplierController