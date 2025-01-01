
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Ingredient = new Schema({
    _id: Number,
    unitId: { type: Number, ref: 'Unit' },
    name: String,
    description: String,
    quantity: { type: Number, default: 0 },
}, {
    _id: false,
    timestamps: true
});

Ingredient.statics.getSearchQuery = function (req) {
    let key = req.query.key ? req.query.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : ''
    return key ? {
        $or: [
            { name: { $regex: key, $options: 'i' } },
        ]
    } : {}
}
Ingredient.statics.searchable = function (req, includeDeleted = false) {
    if (req.query.key) {
        const searchQuery = this.getSearchQuery(req)
        return includeDeleted ? this.findWithDeleted({ ...searchQuery, deleted: true }) : this.find(searchQuery)
    }
    return includeDeleted ? this.findWithDeleted({ deleted: true }) : this.find({})
}
Ingredient.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        })
    }
    return this
}
Ingredient.plugin(AutoIncrement, { id: 'ingredientId', inc_field: '_id' });
Ingredient.plugin(mongooseDelete, { 
    overrideMethods: 'all',
    deletedAt : true,
});

module.exports = mongoose.model('Ingredient', Ingredient);