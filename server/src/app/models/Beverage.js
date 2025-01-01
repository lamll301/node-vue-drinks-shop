
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Beverage = new Schema({
    _id: Number,
    categoryId: [{ type: Number, ref: 'Category' }],
    supplierId: { type: Number, ref: 'Supplier' },
    unitId: { type: Number, ref: 'Unit' },
    promotionId: { type: Number, ref: 'Promotion' },
    name: String,
    images: [{
        data: Buffer, 
        contentType: String,
        name: { type: String, default: '' }
    }],
    description: String,
    listPrice: { type: Number, min: 0, default: 0 },    // giá niêm yết (giá hiện tại)
    // sellPrice: { type: Number, min: 0, default: 0 },    // giá lúc bán
    quantity: { type: Number, min: 0, default: 0 },
    status: { type: String, enum: ['outOfStock', 'inStock', 'unavailable'], default: 'unavailable' },
}, {
    _id: false,
    timestamps: true
});

Beverage.statics.getSearchQuery = function (req) {
    let key = req.query.key ? req.query.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : ''
    let query = {}
    if (req.query.action && req.query.filterId) {
        switch (req.query.action) {
            case 'filterByCategory':
                query.categoryId = req.query.filterId
                break
            case 'filterBySupplier':
                query.supplierId = req.query.filterId
                break
            case 'filterByPromotion':
                query.promotionId = req.query.filterId
                break
            case 'filterByStatus':
                query.status = req.query.filterId
                break
            default:
                break
        }
    }
    if (key) {
        query = {
            ...query,
            $or: [
                { name: { $regex: key, $options: 'i' } },
            ]
        }
    }
    return query
}
Beverage.statics.searchable = function (req, includeDeleted = false) {
    if (req.query.key || (req.query.action && req.query.filterId)) {
        const searchQuery = this.getSearchQuery(req)
        return includeDeleted ? this.findWithDeleted({ ...searchQuery, deleted: true }) : this.find(searchQuery)
    }
    return includeDeleted ? this.findWithDeleted({ deleted: true }) : this.find({})
}
// custom query helpers
Beverage.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        })
    }
    return this
}

Beverage.plugin(AutoIncrement, { id: 'beverageId', inc_field: '_id' });
Beverage.plugin(mongooseDelete, { 
    overrideMethods: 'all',
    deletedAt : true,
});

module.exports = mongoose.model('Beverage', Beverage);
