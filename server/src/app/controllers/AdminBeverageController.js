
const Beverage = require('../models/Beverage')

class AdminBeverageController {

    // [GET] /admin/beverage
    async show(req, res, next) {
        await Beverage.find({})
            .then(beverages => res.send(beverages))
            .catch(next)
    }   

    // [GET] /admin/beverage/:id
    async detail(req, res, next) {
        await Beverage.findById(req.params.id)
            .then(beverage => res.send(beverage))
            .catch(next)
    } 

    // [POST] /admin/beverage/create
    async create(req, res, next) {
        const beverage = new Beverage(req.body);
        await beverage.save()
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [PUT] /admin/beverage/:id
    async update(req, res, next) {
        await Beverage.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [DELETE] /admin/beverage/:id
    async delete(req, res, next) {
        await Beverage.deleteOne({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    } 
}

module.exports = new AdminBeverageController