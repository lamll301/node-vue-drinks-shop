
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Account = new Schema({
    _id: Number,
    permissionId: [{ type: Number, ref: 'Permission' }],
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
        data: Buffer, contentType: String, name: { type: String, default: '' }
    },
    status: { type: String, enum: ['active', 'locked', 'terminated'], default: 'active' },
}, {
    _id: false,
    timestamps: true
});

// custom statics
Account.statics.getSearchQuery = function (req) {
    let key = req.query.key ? req.query.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : ''
    let query = {}
    if (req.query.action && req.query.filterId) {
        switch (req.query.action) {
            case 'filterByPermission':
                query.permissionId = req.query.filterId
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
                { username: { $regex: key, $options: 'i' } },
            ]
        }
    }
    return query
}
Account.statics.searchable = function (req, includeDeleted = false) {
    if (req.query.key || (req.query.action && req.query.filterId)) {
        const searchQuery = this.getSearchQuery(req)
        return includeDeleted ? this.findWithDeleted({ ...searchQuery, deleted: true }) : this.find(searchQuery)
    }
    return includeDeleted ? this.findWithDeleted({ deleted: true }) : this.find({})
}
// custom query helpers
Account.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        })
    }
    return this
}
// plugin
Account.plugin(AutoIncrement, { id: 'accountId', inc_field: '_id' });
Account.plugin(mongooseDelete, { 
    overrideMethods: 'all',
    deletedAt : true,
});

module.exports = mongoose.model('Account', Account);

