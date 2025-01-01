
const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Category = new Schema({
    _id: Number,
    name: String,
    description: String,
    slug: { type: String, slug: 'name', unique: true },
    type: String,
}, {
    _id: false,
    timestamps: true
});

// custom statics
Category.statics.getSearchQuery = function (req) {
    let key = req.query.key ? req.query.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : ''
    return key ? {
        $or: [
            { name: { $regex: key, $options: 'i' } },
        ]
    } : {}
}
Category.statics.searchable = function (req, includeDeleted = false) {
    if (req.query.key) {
        const searchQuery = this.getSearchQuery(req)
        return includeDeleted ? this.findWithDeleted({ ...searchQuery, deleted: true }) : this.find(searchQuery)
    }
    return includeDeleted ? this.findWithDeleted({ deleted: true }) : this.find({})
}
// custom query helpers
Category.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        })
    }
    return this
}
// plugin
mongoose.plugin(slug);
Category.plugin(AutoIncrement, { id: 'categoryId', inc_field: '_id' });
Category.plugin(mongooseDelete, { 
    overrideMethods: 'all',
    deletedAt : true,
});

module.exports = mongoose.model('Category', Category);

// const FakeData = mongoose.model('Category', Category);
// for (let i = 0; i < 20; i++) {
//     FakeData.create({
//         name: 'test' + i,
//     });
// }