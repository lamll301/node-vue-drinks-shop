
const Customer = require('../models/Customer')
const { pagination } = require('../../helpers/helpers')

const PAGE_SIZE = 10

class AdminCustomerController {

    // [GET] /admin/customer/all
    async all(req, res, next) {
        await Customer.find({})
            .then(customers => res.send(customers))
            .catch(next)
    }

    // [GET] /admin/customer
    async show(req, res, next) {
        const total = await Customer.searchable(req).countDocuments()
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Promise.all([
            Customer.searchable(req).sortable(req)
                .populate('accountId')
                .skip(skip)
                .limit(PAGE_SIZE),
            Customer.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([customers, deletedCount]) => {
                res.send({
                    customers,
                    deletedCount,
                    totalPages,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }   

    // [POST] /admin/customer/create
    async create(req, res, next) {
        const customer = new Customer(req.body);
        await customer.save()
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/customer/:id
    async delete(req, res, next) {
        await Customer.delete({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [GET] /admin/customer/:id
    async detail(req, res, next) {
        await Customer.findById(req.params.id)
            .then(customer => res.send(customer))
            .catch(next)
    } 
    
    // [PUT] /admin/customer/:id
    async update(req, res, next) {
        await Customer.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [GET] /admin/customer/trash
    async trash(req, res, next) {
        const searchQuery = Customer.getSearchQuery(req)
        const total = await Customer.countDocumentsWithDeleted({ ...searchQuery, deleted: true })
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Customer.searchable(req, true).sortable(req)
            .populate('accountId')
            .skip(skip)
            .limit(PAGE_SIZE)
            .then(customers => {
                res.send({
                    customers,
                    totalPages,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }

    // [PATCH] /admin/customer/:id/restore
    async restore(req, res, next) {
        await Customer.restore({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/customer/:id/force
    async forceDelete(req, res, next) {
        await Customer.deleteOne({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [POST] /admin/customer/handle-form-actions
    async handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Customer.delete({ _id: { $in: req.body.customerIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'restore':
                Customer.restore({ _id: { $in: req.body.customerIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'forceDelete':
                Customer.deleteMany({ _id: { $in: req.body.customerIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action is invalid' })
        }
    }
}

module.exports = new AdminCustomerController