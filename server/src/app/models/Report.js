
const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');      // soft delete
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Report = new Schema({
    _id: Number,
    title: String,
    slug: { type: String, slug: 'title', unique: true },
    author: String,
    images: [{ 
        data: Buffer, 
        contentType: String,
        name: { type: String, default: '' }
    }],
    highlight: String,      // phần muốn hiển thị lên mục quảng cáo, mô tả ngắn gọn
    content: String,
    tags: [String],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },       // bản nháp, đã xuất bản
}, {
    _id: false,
    timestamps: true // Thêm trường createdAt và updatedAt
});

// custom statics
Report.statics.getSearchQuery = function (req) {
    let key = req.query.key ? req.query.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : ''     // key = \ error
    return key ? {
        $or: [
            { title: { $regex: key, $options: 'i' } },
            { author: { $regex: key, $options: 'i' } }
        ]
    } : {}
}
Report.statics.searchable = function (req, includeDeleted = false) {
    if (req.query.key) {
        const searchQuery = this.getSearchQuery(req)
        return includeDeleted ? this.findWithDeleted({ ...searchQuery, deleted: true }) : this.find(searchQuery)
    }
    return includeDeleted ? this.findWithDeleted({ deleted: true }) : this.find({})
}
// custom query helpers
Report.query.sortable = function (req) {
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
Report.plugin(AutoIncrement);
Report.plugin(mongooseDelete, { 
    overrideMethods: 'all',
    deletedAt : true,
});

module.exports = mongoose.model('Report', Report);

// const FakeData = mongoose.model('Report', Report);
// for (let i = 0; i < 20; i++) {
//     FakeData.create({
//         title: 'test' + i,
//     });
// }