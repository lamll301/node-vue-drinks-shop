
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Customer = new Schema({
    _id: Number,
    accountId: { type: Number, ref: 'Account', unique: true },
    name: { type: String, default: '' },
    address: { type: String, default: '' },
    phone: { type: String, default: '', unique: true },
    email: { type: String, default: '' },
}, {
    _id: false,
    timestamps: true
});

Customer.statics.getSearchQuery = function (req) {
    let key = req.query.key ? req.query.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : ''
    return key ? {
        $or: [
            { name: { $regex: key, $options: 'i' } },
            { email: { $regex: key, $options: 'i' } },
            { phone: { $regex: key, $options: 'i' } }
        ]
    } : {}
}
Customer.statics.searchable = function (req, includeDeleted = false) {
    if (req.query.key) {
        const searchQuery = this.getSearchQuery(req)
        return includeDeleted ? this.findWithDeleted({ ...searchQuery, deleted: true }) : this.find(searchQuery)
    }
    return includeDeleted ? this.findWithDeleted({ deleted: true }) : this.find({})
}
Customer.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        })
    }
    return this
}
Customer.plugin(AutoIncrement, { id: 'customerId', inc_field: '_id' });
Customer.plugin(mongooseDelete, { 
    overrideMethods: 'all',
    deletedAt : true,
});

module.exports = mongoose.model('Customer', Customer);