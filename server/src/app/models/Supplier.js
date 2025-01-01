
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Supplier = new Schema({
    _id: Number,
    name: String,
    address: String,
    phone: String,
    email: String,
}, {
    _id: false,
    timestamps: true
});

// custom statics
Supplier.statics.getSearchQuery = function (req) {
    let key = req.query.key ? req.query.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : ''
    return key ? {
        $or: [
            { name: { $regex: key, $options: 'i' } },
        ]
    } : {}
}
Supplier.statics.searchable = function (req, includeDeleted = false) {
    if (req.query.key) {
        const searchQuery = this.getSearchQuery(req)
        return includeDeleted ? this.findWithDeleted({ ...searchQuery, deleted: true }) : this.find(searchQuery)
    }
    return includeDeleted ? this.findWithDeleted({ deleted: true }) : this.find({})
}
// custom query helpers
Supplier.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        })
    }
    return this
}

Supplier.plugin(AutoIncrement, { id: 'supplierId', inc_field: '_id' });
Supplier.plugin(mongooseDelete, { 
    overrideMethods: 'all',
    deletedAt : true,
});

module.exports = mongoose.model('Supplier', Supplier);
