
const Permission = require('../models/Permission')
const { pagination } = require('../../helpers/helpers')

const PAGE_SIZE = 10

class AdminPermissionController {

    // [GET] /admin/permission
    async show(req, res, next) {
        const total = await Permission.searchable(req).countDocuments()
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Promise.all([
            Permission.searchable(req).sortable(req)
                .skip(skip)
                .limit(PAGE_SIZE),
            Permission.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([permissions, deletedCount]) => {
                res.send({
                    permissions,
                    deletedCount,
                    totalPages,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }   

    // [POST] /admin/permission/create
    async create(req, res, next) {
        const permission = new Permission(req.body);
        await permission.save()
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/permission/:id
    async delete(req, res, next) {
        await Permission.delete({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [GET] /admin/permission/:id
    async detail(req, res, next) {
        await Permission.findById(req.params.id)
            .then(permission => res.send(permission))
            .catch(next)
    } 
    
    // [PUT] /admin/permission/:id
    async update(req, res, next) {
        await Permission.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('success'))
            .catch(next)
    }
    
    // [GET] /admin/permission/trash
    async trash(req, res, next) {
        const searchQuery = Permission.getSearchQuery(req)
        const total = await Permission.countDocumentsWithDeleted({ ...searchQuery, deleted: true })
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Permission.searchable(req, true).sortable(req)
            .skip(skip)
            .limit(PAGE_SIZE)
            .then(permissions => {
                res.send({
                    permissions,
                    totalPages,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }

    // [PATCH] /admin/permission/:id/restore
    async restore(req, res, next) {
        await Permission.restore({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/permission/:id/force
    async forceDelete(req, res, next) {
        await Permission.deleteOne({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [POST] /admin/permission/handle-form-actions
    async handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Permission.delete({ _id: { $in: req.body.permissionIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'restore':
                Permission.restore({ _id: { $in: req.body.permissionIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'forceDelete':
                Permission.deleteMany({ _id: { $in: req.body.permissionIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action is invalid' })
        }
    }

    // [GET] /admin/permission/all
    async showAll(req, res, next) {
        await Permission.find({})
            .then(permissions => res.send(permissions))
            .catch(next)
    }   
}

module.exports = new AdminPermissionController