
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Voucher = new Schema({
    _id: Number,
    code: String,
    value: Number,
    startAt: Date,
    endAt: Date,
    description: String,
    quantity: Number,
    status: { type: String, enum: ['active', 'inactive', 'expired'], default: 'inactive' },
}, {
    _id: false,
    timestamps: true
});

Voucher.statics.getSearchQuery = function (req) {
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
    if (key && !isNaN(key)) {
        query = {
            ...query,
            $or: [
                { _id: parseInt(key) },
                { code: { $regex: key, $options: 'i' } },
            ]
        }
    }
    return query
}
Voucher.statics.searchable = function (req, includeDeleted = false) {
    if (req.query.key || (req.query.action && req.query.filterId)) {
        const searchQuery = this.getSearchQuery(req)
        return includeDeleted ? this.findWithDeleted({ ...searchQuery, deleted: true }) : this.find(searchQuery)
    }
    return includeDeleted ? this.findWithDeleted({ deleted: true }) : this.find({})
}
// custom query helpers
Voucher.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        })
    }
    return this
}

Voucher.plugin(AutoIncrement, { id: 'voucherId', inc_field: '_id' });
Voucher.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt : true,
});

module.exports = mongoose.model('Voucher', Voucher);