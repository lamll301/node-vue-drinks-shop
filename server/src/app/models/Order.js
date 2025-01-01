
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Order = new Schema({
    _id: Number,
    // accountId: { type: Number, ref: 'Account' },
    customerId: { type: Number, ref: 'Customer' },
    voucherId: { type: Number, ref: 'Voucher' },
    subTotal: Number,
    shippingFee: Number,
    tax: Number,        // tax = 10% * subtotal
    total: Number,      // total = subTotal (tiền mặt hàng) + shippingFee + tax - voucher
    customerPayment: Number,    // tiền khách trả
    excessPayment: Number,      // tiền thừa
    status: { type: String, enum: ['pending', 'shipped', 'delivered', 'canceled', 'refunded'], default: 'pending' },
}, {
    _id: false,
    timestamps: true
});

// Order.pre('save', async function(next) {
//     this.tax = Math.ceil((this.subTotal * 0.1) / 1000) * 1000
//     this.total = this.subTotal + this.shippingFee + this.tax
//     if (this.voucherId) {
//         const voucher = await Voucher.findById(this.voucherId).select('value')
//         if (voucher && voucher.value) {
//             this.total -= voucher.value
//         }
//     }
//     this.total = this.total > 0 ? this.total : 0
//     next()
// })

Order.statics.getSearchQuery = function (req) {
    let key = req.query.key ? req.query.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : ''
    let query = {}
    if (req.query.action && req.query.filterId) {
        switch (req.query.action) {
            case 'filterByCustomer':
                query.customerId = req.query.filterId
                break
            case 'filterByStatus':
                query.status = req.query.filterId
                break
            default:
                break
        }
    }
    if (key && !isNaN(key)) {
        query = {
            ...query,
            $or: [
                { _id: parseInt(key) },
            ]
        }
    }
    return query
}
Order.statics.searchable = function (req, includeDeleted = false) {
    if (req.query.key || (req.query.action && req.query.filterId)) {
        const searchQuery = this.getSearchQuery(req)
        return includeDeleted ? this.findWithDeleted({ ...searchQuery, deleted: true }) : this.find(searchQuery)
    }
    return includeDeleted ? this.findWithDeleted({ deleted: true }) : this.find({})
}
// custom query helpers
Order.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        })
    }
    return this
}

Order.plugin(AutoIncrement, { id: 'orderId', inc_field: '_id' });
Order.plugin(mongooseDelete, { 
    overrideMethods: 'all',
    deletedAt : true,
});

module.exports = mongoose.model('Order', Order);