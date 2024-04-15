
const Permission = require('../models/Permission')

class AdminPermissionController {

    // [GET] /admin/permission
    async show(req, res, next) {
        await Permission.find({})
            .then(permissions => res.send(permissions))
            .catch(next)
    }   

    // [POST] /admin/permission/create
    async create(req, res, next) {
        // res.send(req.body)
        const permission = new Permission(req.body);
        await permission.save()
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/permission/:id
    async delete(req, res, next) {
        await Permission.deleteOne({ _id: req.params.id })
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
}

module.exports = new AdminPermissionController