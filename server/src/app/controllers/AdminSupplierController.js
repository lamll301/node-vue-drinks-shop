
const Supplier = require('../models/Supplier')

class AdminSupplierController {

    // [GET] /admin/supplier
    async show(req, res, next) {
        await Supplier.find({})
            .then(suppliers => res.send(suppliers))
            .catch(next)
    }   

    // [POST] /admin/supplier/create
    async create(req, res, next) {
        // res.send(req.body)
        const supplier = new Supplier(req.body);
        await supplier.save()
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/supplier/:id
    async delete(req, res, next) {
        await Supplier.deleteOne({ _id: req.params.id })
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
}

module.exports = new AdminSupplierController