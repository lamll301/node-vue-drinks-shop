
const BeverageIngredient = require('../models/BeverageIngredient')

class AdminBeverageIngredientController {

    // [GET] /admin/beverageIngredient
    async show(req, res, next) {
        await BeverageIngredient.find({})
            .then(beverageIngredients => res.send(beverageIngredients))
            .catch(next)
    }

    // [GET] /admin/beverageIngredient/:id
    async detail(req, res, next) {
        await BeverageIngredient.findById(req.params.id)
            .then(beverageIngredient => res.send(beverageIngredient))
            .catch(next)
    } 

    // [GET] /admin/beverageIngredient/findByBeverage/:id
    async findByBeverage(req, res, next) {
        await BeverageIngredient.find({ beverageId: req.params.id })
            .populate('unitId')
            .populate('ingredientId')
            .then(beverageIngredients => res.send(beverageIngredients))
            .catch(next)
    }

    // [POST] /admin/beverageIngredient/create
    async create(req, res, next) {
        const beverageIngredient = new BeverageIngredient(req.body)
        await beverageIngredient.save()
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [PUT] /admin/beverageIngredient/:id
    async update(req, res, next) {
        await BeverageIngredient.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [DELETE] /admin/beverageIngredient/:id
    async delete(req, res, next) {
        await BeverageIngredient.deleteOne({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }
}

module.exports = new AdminBeverageIngredientController