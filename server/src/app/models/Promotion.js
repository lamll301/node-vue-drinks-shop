
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Promotion = new Schema({
    _id: Number,
    name: String,
    description: String,
    startAt: Date,
    endAt: Date,
    discountPercentage: { type: Number, default: 0, min: 0, max: 100 },
    maxDiscountAmount: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: ['active', 'inactive', 'expired'], default: 'inactive' },
}, {
    _id: false,
    timestamps: true
});

Promotion.statics.getSearchQuery = function (req) {
    let key = req.query.key ? req.query.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : ''
    let query = {}
    if (req.query.action && req.query.filterId) {
        switch (req.query.action) {
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
                { username: { $regex: key, $options: 'i' } },
            ]
        }
    }
    return query
}
Promotion.statics.searchable = function (req, includeDeleted = false) {
    if (req.query.key || (req.query.action && req.query.filterId)) {
        const searchQuery = this.getSearchQuery(req)
        return includeDeleted ? this.findWithDeleted({ ...searchQuery, deleted: true }) : this.find(searchQuery)
    }
    return includeDeleted ? this.findWithDeleted({ deleted: true }) : this.find({})
}
Promotion.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        })
    }
    return this
}
Promotion.plugin(AutoIncrement, { id: 'promotionId', inc_field: '_id' });
Promotion.plugin(mongooseDelete, { 
    overrideMethods: 'all',
    deletedAt : true,
});

module.exports = mongoose.model('Promotion', Promotion);