
const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const Report = new Schema({
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
    link: String,
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },       // bản nháp, đã xuất bản
}, {
    timestamps: true // Thêm trường createdAt và updatedAt
});

module.exports = mongoose.model('Report', Report);