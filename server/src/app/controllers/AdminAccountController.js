
const Account = require('../models/Account')
const { pagination } = require('../../helpers/helpers')

const ACCOUNT_STATUS_OPTIONS = {
    'active': 'Hoạt động',
    'locked': 'Bị khóa',
    'terminated': 'Bị cấm',
}
const PAGE_SIZE = 10

class AdminAccountController {

    // [GET] /admin/account
    async show(req, res, next) {
        const total = await Account.searchable(req).countDocuments()
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Promise.all([
            Account.searchable(req).sortable(req)
                .populate('permissionId')
                .skip(skip)
                .limit(PAGE_SIZE),
            Account.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([accounts, deletedCount]) => {
                res.send({
                    accounts,
                    deletedCount,
                    totalPages,
                    ACCOUNT_STATUS_OPTIONS, 
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }   

    // [GET] /admin/account/all
    async all(req, res, next) {
        await Account.find({})
            .then(accounts => res.send(accounts))
            .catch(next)
    }

    // [POST] /admin/account/create
    async create(req, res, next) {
        const username = req.body.username
        const accountExists = await Account.findOne({ username })
        if (accountExists || !req.body.password || !username) {
            return
        }
        const account = new Account(req.body)
        await account.save()
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/account/:id
    async delete(req, res, next) {
        await Account.delete({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [GET] /admin/account/:id
    async detail(req, res, next) {
        await Account.findById(req.params.id)
            .populate('permissionId')
            .then(account => res.send({ account, ACCOUNT_STATUS_OPTIONS }))
            .catch(next)
    } 
    
    // [PUT] /admin/account/:id
    async update(req, res, next) {
        delete req.body.permissionId
        let account = req.body
        let selectedPermissionId = req.body.selectedPermissionId
        await Account.updateOne({ _id: req.params.id }, {
            $set: account,
            $push: { permissionId: selectedPermissionId }
        })
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [PATCH] /admin/account/:id/addPermission
    async addPermission(req, res, next) {
        await Account.updateOne(
            { _id: req.params.id },
            { $addToSet: { permissionId: req.body.selectedPermissionId } }      // chỉ thêm nếu chưa có
        )
            .then(() => res.send('success'))
            .catch(next)
    }

    // [PATCH] /admin/account/:id/removePermission
    async removePermission(req, res, next) {
        await Account.updateOne(
            { _id: req.params.id },
            { $pull: { permissionId: req.body.selectedPermissionId } }
        )
            .then(() => res.send('success'))
            .catch(next)
    }

    // [GET] /admin/account/trash
    async trash(req, res, next) {
        const searchQuery = Account.getSearchQuery(req)
        const total = await Account.countDocumentsWithDeleted({ ...searchQuery, deleted: true })
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Account.searchable(req, true).sortable(req)
            .populate('permissionId')
            .skip(skip)
            .limit(PAGE_SIZE)
            .then(accounts => {
                res.send({
                    accounts,
                    totalPages,
                    ACCOUNT_STATUS_OPTIONS,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }

    // [PATCH] /admin/account/:id/restore
    async restore(req, res, next) {
        await Account.restore({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/account/:id/force
    async forceDelete(req, res, next) {
        await Account.deleteOne({ _id: req.params.id })     // force delete
            .then(() => res.send('success'))
            .catch(next)
    }

    // [POST] /admin/account/handle-form-actions
    async handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Account.delete({ _id: { $in: req.body.accountIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'restore':
                Account.restore({ _id: { $in: req.body.accountIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'forceDelete':
                Account.deleteMany({ _id: { $in: req.body.accountIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'addPermission':
                Account.updateMany(
                    { _id: { $in: req.body.accountIds } },
                    { $addToSet: { permissionId: req.body.selectedPermissionId } }
                )
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'removePermission':
                Account.updateMany(
                    { _id: { $in: req.body.accountIds } },
                    { $pull: { permissionId: req.body.selectedPermissionId } }
                )
                    .then(() => res.send('success'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action is invalid' })
        }
    }
}

module.exports = new AdminAccountController