
const Voucher = require('../models/Voucher')
const { pagination } = require('../../helpers/helpers')

const VOUCHER_STATUS_OPTIONS = {
    'active': 'Đang hoạt động',
    'inactive': 'Không hoạt động',
    'expired': 'Hết hạn',
}
const PAGE_SIZE = 10

class AdminVoucherController {

    // [GET] /admin/voucher
    async show(req, res, next) {
        const total = await Voucher.searchable(req).countDocuments()
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Promise.all([
            Voucher.searchable(req).sortable(req)
                .skip(skip)
                .limit(PAGE_SIZE),
            Voucher.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([vouchers, deletedCount]) => {
                res.send({
                    vouchers,
                    deletedCount,
                    totalPages,
                    VOUCHER_STATUS_OPTIONS,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }

    // [GET] /admin/voucher/all
    async all(req, res, next) {
        await Voucher.find({})
            .then(vouchers => res.send(vouchers))
            .catch(next)
    }

    // [GET] /admin/voucher/:id
    async detail(req, res, next) {
        await Voucher.findById(req.params.id)
            .then(voucher => res.send({ voucher, VOUCHER_STATUS_OPTIONS }))
            .catch(next)
    } 

    // [POST] /admin/voucher/create
    async create(req, res, next) {
        const voucher = new Voucher(req.body);
        await voucher.save()
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [PUT] /admin/voucher/:id
    async update(req, res, next) {
        await Voucher.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [DELETE] /admin/voucher/:id
    async delete(req, res, next) {
        await Voucher.delete({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [GET] /admin/voucher/trash
    async trash(req, res, next) {
        const searchQuery = Voucher.getSearchQuery(req)
        const total = await Voucher.countDocumentsWithDeleted({ ...searchQuery, deleted: true })
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Voucher.searchable(req, true).sortable(req)
            .skip(skip)
            .limit(PAGE_SIZE)
            .then(vouchers => {
                res.send({
                    vouchers,
                    totalPages,
                    VOUCHER_STATUS_OPTIONS,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }

    // [PATCH] /admin/voucher/:id/restore
    async restore(req, res, next) {
        await Voucher.restore({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/voucher/:id/force
    async forceDelete(req, res, next) {
        await Voucher.deleteOne({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [POST] /admin/voucher/handle-form-actions
    async handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Voucher.delete({ _id: { $in: req.body.voucherIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'restore':
                Voucher.restore({ _id: { $in: req.body.voucherIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'forceDelete':
                Voucher.deleteMany({ _id: { $in: req.body.voucherIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'setStatus':
                Voucher.updateMany(
                    { _id: { $in: req.body.voucherIds } },
                    { $set: { status: req.body.selectedStatus } }
                )
                    .then(() => res.send('success'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action is invalid' })
        }
    }
}

module.exports = new AdminVoucherController