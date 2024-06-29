
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Supplier = new Schema({
    name: String,
    address: String,
    phone: String,
    email: String,
    notes: String,
});

module.exports = mongoose.model('Supplier', Supplier);