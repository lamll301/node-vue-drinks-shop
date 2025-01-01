
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const OrderDetail = new Schema({
    _id: Number,
    orderId: { type: Number, ref: 'Order' },
    beverageId: { type: Number, ref: 'Beverage' },
    size: { type: String, enum: ['small', 'medium', 'large'] },
    quantity: Number,
    sellPrice: Number,
    price: Number,      // don't interfere
    total: Number,      // don't interfere
}, {
    _id: false,
    timestamps: true
});

OrderDetail.plugin(AutoIncrement, { id: 'orderDetailId', inc_field: '_id' });

module.exports = mongoose.model('OrderDetail', OrderDetail);