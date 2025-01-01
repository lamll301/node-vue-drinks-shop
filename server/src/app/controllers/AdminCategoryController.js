
const Category = require('../models/Category')
const { pagination } = require('../../helpers/helpers')

const PAGE_SIZE = 10

class AdminCategoryController {

    // [GET] /admin/category/all
    async showAll(req, res, next) {
        await Category.find({})
            .then(categories => res.send(categories))
            .catch(next)
    }

    // [GET] /admin/category
    async show(req, res, next) {
        const total = await Category.searchable(req).countDocuments()
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Promise.all([
            Category.searchable(req).sortable(req)
                .skip(skip)
                .limit(PAGE_SIZE),
            Category.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([categories, deletedCount]) => {
                res.send({
                    categories,
                    deletedCount,
                    totalPages,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }   

    // [POST] /admin/category/create
    async create(req, res, next) {
        const category = new Category(req.body);
        await category.save()
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/category/:id
    async delete(req, res, next) {
        await Category.delete({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [GET] /admin/category/:id
    async detail(req, res, next) {
        await Category.findById(req.params.id)
            .then(category => res.send(category))
            .catch(next)
    } 
    
    // [PUT] /admin/category/:id
    async update(req, res, next) {
        delete req.body.slug
        await Category.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [GET] /admin/category/trash
    async trash(req, res, next) {
        const searchQuery = Category.getSearchQuery(req)
        const total = await Category.countDocumentsWithDeleted({ ...searchQuery, deleted: true })
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Category.searchable(req, true).sortable(req)
            .skip(skip)
            .limit(PAGE_SIZE)
            .then(categories => {
                res.send({
                    categories,
                    totalPages,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }

    // [PATCH] /admin/category/:id/restore
    async restore(req, res, next) {
        await Category.restore({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/category/:id/force
    async forceDelete(req, res, next) {
        await Category.deleteOne({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [POST] /admin/category/handle-form-actions
    async handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Category.delete({ _id: { $in: req.body.categoryIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'restore':
                Category.restore({ _id: { $in: req.body.categoryIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'forceDelete':
                Category.deleteMany({ _id: { $in: req.body.categoryIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action is invalid' })
        }
    }
}

module.exports = new AdminCategoryController