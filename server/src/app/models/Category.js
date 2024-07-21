
const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const Category = new Schema({
    name: String,
    description: String,
    images: [{ 
        data: Buffer, 
        contentType: String,
        name: { type: String, default: '' }
    }],
    display: [{
        location: {
            type: String, 
            enum: ['menu', 'homepage', 'header'],
        },
        order: Number,
    }],
    slug: { type: String, slug: 'name', unique: true },
    classify: String,
});

module.exports = mongoose.model('Category', Category);