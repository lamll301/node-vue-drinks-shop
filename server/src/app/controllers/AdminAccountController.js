
const Account = require('../models/Account')

class AdminAccountController {

    // [GET] /admin/account
    async show(req, res, next) {
        await Account.find({})
            .populate('permission_id', 'name')
            .then(accounts => res.send(accounts))
            .catch(next)
    }   

    // [POST] /admin/account/create
    async create(req, res, next) {
        // res.send(req.body)
        const account = new Account(req.body);
        await account.save()
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/account/:id
    async delete(req, res, next) {
        await Account.deleteOne({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [GET] /admin/account/:id
    async detail(req, res, next) {
        await Account.findById(req.params.id)
            .populate('permission_id', 'name')
            .then(account => res.send(account))
            .catch(next)
    } 
    
    // [PUT] /admin/account/:id
    async update(req, res, next) {
        await Account.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('success'))
            .catch(next)
    } 
}

module.exports = new AdminAccountController