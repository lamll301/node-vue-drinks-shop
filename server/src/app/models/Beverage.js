
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Beverage = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { data: Buffer, contentType: String },
    // sellingPrice: { type: Number, min: 0, default: 0 },     //Gia ban
    listingPrice: { type: Number, min: 0, default: 0 },     //Gia niem yet
    quantity: { type: Number, min: 0, default: 0 },
    inventoryQuantity: { type: Number, min: 0, default: 0 },
    status: { type: String, default: 'Hoạt động' },
});

module.exports = mongoose.model('Beverage', Beverage);
