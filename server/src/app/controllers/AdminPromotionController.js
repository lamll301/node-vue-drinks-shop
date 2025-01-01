
const Promotion = require('../models/Promotion')
const { pagination } = require('../../helpers/helpers')

const PROMOTION_STATUS_OPTIONS = {
    'active': 'Hoạt động',
    'inactive': 'Không hoạt động',
    'expired': 'Hết hạn',
}
const PAGE_SIZE = 10

class AdminPromotionController {

    // [GET] /admin/promotion/all
    async showAll(req, res, next) {
        await Promotion.find({})
            .then(promotions => res.send(promotions))
            .catch(next)
    }

    // [GET] /admin/promotion
    async show(req, res, next) {
        const total = await Promotion.searchable(req).countDocuments()
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Promise.all([
            Promotion.searchable(req).sortable(req)
                .skip(skip)
                .limit(PAGE_SIZE),
            Promotion.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([promotions, deletedCount]) => {
                res.send({
                    promotions,
                    deletedCount,
                    totalPages,
                    PROMOTION_STATUS_OPTIONS,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }   

    // [POST] /admin/promotion/create
    async create(req, res, next) {
        const promotion = new Promotion(req.body);
        await promotion.save()
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/promotion/:id
    async delete(req, res, next) {
        await Promotion.delete({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [GET] /admin/promotion/:id
    async detail(req, res, next) {
        await Promotion.findById(req.params.id)
            .then(promotion => res.send({ promotion, PROMOTION_STATUS_OPTIONS }))
            .catch(next)
    } 
    
    // [PUT] /admin/promotion/:id
    async update(req, res, next) {
        await Promotion.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [GET] /admin/promotion/trash
    async trash(req, res, next) {
        const searchQuery = Promotion.getSearchQuery(req)
        const total = await Promotion.countDocumentsWithDeleted({ ...searchQuery, deleted: true })
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Promotion.searchable(req, true).sortable(req)
            .skip(skip)
            .limit(PAGE_SIZE)
            .then(promotions => {
                res.send({
                    promotions,
                    totalPages,
                    PROMOTION_STATUS_OPTIONS,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }

    // [PATCH] /admin/promotion/:id/restore
    async restore(req, res, next) {
        await Promotion.restore({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/promotion/:id/force
    async forceDelete(req, res, next) {
        await Promotion.deleteOne({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [POST] /admin/promotion/handle-form-actions
    async handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Promotion.delete({ _id: { $in: req.body.promotionIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'restore':
                Promotion.restore({ _id: { $in: req.body.promotionIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'forceDelete':
                Promotion.deleteMany({ _id: { $in: req.body.promotionIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action is invalid' })
        }
    }
}

module.exports = new AdminPromotionController