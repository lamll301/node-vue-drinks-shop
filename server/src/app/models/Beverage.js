
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Beverage = new Schema({
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Beverage', Beverage);
