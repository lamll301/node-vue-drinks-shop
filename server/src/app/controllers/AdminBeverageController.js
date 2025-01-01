
const Beverage = require('../models/Beverage')
const { pagination } = require('../../helpers/helpers')

const BEVERAGE_STATUS_OPTIONS = {
    'outOfStock': 'Hết hàng',
    'inStock': 'Còn hàng',
    'unavailable': 'Không khả dụng',
}
const PAGE_SIZE = 10

class AdminBeverageController {

    // [GET] /admin/beverage
    async show(req, res, next) {
        const total = await Beverage.searchable(req).countDocuments()
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Promise.all([
            Beverage.searchable(req).sortable(req)
                .populate('categoryId').populate('supplierId').populate('unitId').populate('promotionId')
                .skip(skip)
                .limit(PAGE_SIZE),
            Beverage.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([beverages, deletedCount]) => {
                res.send({
                    beverages,
                    deletedCount,
                    totalPages,
                    BEVERAGE_STATUS_OPTIONS,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }

    // [GET] /admin/beverage/all
    async all(req, res, next) {
        await Beverage.find({})
            .then(beverages => res.send(beverages))
            .catch(next)
    }

    // [GET] /admin/beverage/:id
    async detail(req, res, next) {
        await Beverage.findById(req.params.id)
            .populate('categoryId')
            .then(beverage => res.send({ beverage, BEVERAGE_STATUS_OPTIONS }))
            .catch(next)
    } 

    // [POST] /admin/beverage/create
    async create(req, res, next) {
        let beverageObj = { ...req.body }
        beverageObj.images = []
        if (req.file) {
            beverageObj.images.push({
                data: req.file.buffer,
                contentType: req.file.mimetype,
                name: req.file.filename,
            })
        }
        const beverage = new Beverage(beverageObj)
        await beverage.save()
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [PUT] /admin/beverage/:id
    async update(req, res, next) {
        delete req.body.images
        delete req.body.categoryId
        let query = {
            $set: req.body,
        }
        if (req.file) {
            const newImage = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                name: req.file.filename,
            }
            query.$push = { images: newImage }
        }
        await Beverage.updateOne({ _id: req.params.id }, query)
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [DELETE] /admin/beverage/:id
    async delete(req, res, next) {
        await Beverage.delete({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [PATCH] /admin/beverage/:id/addImage
    async addImage(req, res, next) {
        if (!req.file) return
        const newImage = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
            name: req.file.filename,
        }
        await Beverage.updateOne(
            { _id: req.params.id },
            { $push: { images: newImage } }
        )
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [PATCH] /admin/beverage/:id/removeImage
    async removeImage(req, res, next) {
        await Beverage.updateOne(
            { _id: req.params.id },
            { $pull: { images: { name: req.body.imageName } } }
        )
            .then(() => res.send('success'))
            .catch(next)
    }

    // [PATCH] /admin/beverage/:id/addCategory
    async addCategory(req, res, next) {
        await Beverage.updateOne(
            { _id: req.params.id },
            { $addToSet: { categoryId: req.body.selectedCategoryId } }
        )
            .then(() => res.send('success'))
            .catch(next)
    }

    // [PATCH] /admin/beverage/:id/removeCategory
    async removeCategory(req, res, next) {
        await Beverage.updateOne(
            { _id: req.params.id },
            { $pull: { categoryId: req.body.selectedCategoryId } }
        )
            .then(() => res.send('success'))
            .catch(next)
    }

    // [GET] /admin/beverage/trash
    async trash(req, res, next) {
        const searchQuery = Beverage.getSearchQuery(req)
        const total = await Beverage.countDocumentsWithDeleted({ ...searchQuery, deleted: true })
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Beverage.searchable(req, true).sortable(req)
            .populate('categoryId').populate('supplierId').populate('unitId').populate('promotionId')
            .skip(skip)
            .limit(PAGE_SIZE)
            .then(beverages => {
                res.send({
                    beverages,
                    totalPages,
                    BEVERAGE_STATUS_OPTIONS,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }

    // [PATCH] /admin/beverage/:id/restore
    async restore(req, res, next) {
        await Beverage.restore({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/beverage/:id/force
    async forceDelete(req, res, next) {
        await Beverage.deleteOne({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [POST] /admin/beverage/handle-form-actions
    async handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Beverage.delete({ _id: { $in: req.body.beverageIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'restore':
                Beverage.restore({ _id: { $in: req.body.beverageIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'forceDelete':
                Beverage.deleteMany({ _id: { $in: req.body.beverageIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'addCategory':
                Beverage.updateMany(
                    { _id: { $in: req.body.beverageIds } },
                    { $addToSet: { categoryId: req.body.selectedCategoryId } }
                )
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'removeCategory':
                Beverage.updateMany(
                    { _id: { $in: req.body.beverageIds } },
                    { $pull: { categoryId: req.body.selectedCategoryId } }
                )
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'setSupplier':
                Beverage.updateMany(
                    { _id: { $in: req.body.beverageIds } },
                    { $set: { supplierId: req.body.selectedSupplierId } }
                )
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'setPromotion':
                Beverage.updateMany(
                    { _id: { $in: req.body.beverageIds } },
                    { $set: { promotionId: req.body.selectedPromotionId } }
                )
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'setStatus':
                Beverage.updateMany(
                    { _id: { $in: req.body.beverageIds } },
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

module.exports = new AdminBeverageController