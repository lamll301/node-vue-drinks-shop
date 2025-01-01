
const Ingredient = require('../models/Ingredient')
const { pagination } = require('../../helpers/helpers')

const PAGE_SIZE = 10

class AdminIngredientController {

    // [GET] /admin/ingredient
    async show(req, res, next) {
        const total = await Ingredient.searchable(req).countDocuments()
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Promise.all([
            Ingredient.searchable(req).sortable(req)
                .populate('unitId')
                .skip(skip)
                .limit(PAGE_SIZE),
            Ingredient.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([ingredients, deletedCount]) => {
                res.send({
                    ingredients,
                    deletedCount,
                    totalPages,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }

    // [GET] /admin/ingredient/all
    async all(req, res, next) {
        await Ingredient.find({})
            .then(ingredients => res.send(ingredients))
            .catch(next)
    }

    // [POST] /admin/ingredient/create
    async create(req, res, next) {
        const ingredient = new Ingredient(req.body);
        await ingredient.save()
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/ingredient/:id
    async delete(req, res, next) {
        await Ingredient.delete({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [GET] /admin/ingredient/:id
    async detail(req, res, next) {
        await Ingredient.findById(req.params.id)
            .then(ingredient => res.send(ingredient))
            .catch(next)
    } 
    
    // [PUT] /admin/ingredient/:id
    async update(req, res, next) {
        await Ingredient.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [GET] /admin/ingredient/trash
    async trash(req, res, next) {
        const searchQuery = Ingredient.getSearchQuery(req)
        const total = await Ingredient.countDocumentsWithDeleted({ ...searchQuery, deleted: true })
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Ingredient.searchable(req, true).sortable(req)
            .populate('unitId')
            .skip(skip)
            .limit(PAGE_SIZE)
            .then(ingredients => {
                res.send({
                    ingredients,
                    totalPages,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }

    // [PATCH] /admin/ingredient/:id/restore
    async restore(req, res, next) {
        await Ingredient.restore({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/ingredient/:id/force
    async forceDelete(req, res, next) {
        await Ingredient.deleteOne({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [POST] /admin/ingredient/handle-form-actions
    async handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Ingredient.delete({ _id: { $in: req.body.ingredientIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'restore':
                Ingredient.restore({ _id: { $in: req.body.ingredientIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'forceDelete':
                Ingredient.deleteMany({ _id: { $in: req.body.ingredientIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action is invalid' })
        }
    }
}

module.exports = new AdminIngredientController