
const Order = require('../models/Order')
const OrderDetail = require('../models/OrderDetail')
const { pagination } = require('../../helpers/helpers')

const ORDER_STATUS_OPTIONS = {
    'pending': 'Chờ xử lý',
    'shipped': 'Đã gửi',
    'delivered': 'Đã giao',
    'canceled': 'Đã hủy',
    'refunded': 'Hoàn tiền',
}
const PAGE_SIZE = 10

class AdminOrderController {

    // [GET] /admin/order
    async show(req, res, next) {
        const total = await Order.searchable(req).countDocuments()
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Promise.all([
            Order.searchable(req).sortable(req)
                .populate('customerId').populate('voucherId')
                .skip(skip)
                .limit(PAGE_SIZE),
            Order.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([orders, deletedCount]) => {
                res.send({
                    orders,
                    deletedCount,
                    totalPages,
                    ORDER_STATUS_OPTIONS,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }

    // [GET] /admin/order/all
    async all(req, res, next) {
        await Order.find({})
            .then(orders => res.send(orders))
            .catch(next)
    }

    // [GET] /admin/order/:id
    async detail(req, res, next) {
        await Order.findById(req.params.id)
            .populate('customerId').populate('voucherId')
            .then(order => res.send({ order, ORDER_STATUS_OPTIONS }))
            .catch(next)
    } 

    // [POST] /admin/order/create
    async create(req, res, next) {
        // res.send(req.body)
        const order = new Order(req.body.order);
        await order.save()
            .then(async order => {
                const orderDetails = req.body.orderDetails.map(orderDetail => {
                    const newOrderDetail = new OrderDetail({
                        ...orderDetail,
                        orderId: order._id
                    })
                    return newOrderDetail.save()
                })
                await Promise.all(orderDetails)
                    .then(() => res.send('success'))
                    .catch(next)
            })
            .catch(next)
    } 

    // [PUT] /admin/order/:id
    async update(req, res, next) {
        // res.send(req.body)
        const orderDetails = req.body.orderDetails.map(orderDetail => {
            const { _id, orderId, ...remainingOrderDetail } = orderDetail
            return OrderDetail.updateOne(
                { _id: orderDetail._id },
                {
                    orderId: req.params.id,
                    ...remainingOrderDetail
                }
            )
        })
        Promise.all([
            ...orderDetails,
            Order.updateOne({ _id: req.params.id }, req.body.order)
        ])
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [DELETE] /admin/order/:id
    async delete(req, res, next) {
        await Order.delete({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    } 

    // [GET] /admin/order/trash
    async trash(req, res, next) {
        const searchQuery = Order.getSearchQuery(req)
        const total = await Order.countDocumentsWithDeleted({ ...searchQuery, deleted: true })
        const { totalPages, skip } = pagination(req, total, PAGE_SIZE)
        await Order.searchable(req, true).sortable(req)
            .populate('customerId').populate('voucherId')
            .skip(skip)
            .limit(PAGE_SIZE)
            .then(orders => {
                res.send({
                    orders,
                    totalPages,
                    ORDER_STATUS_OPTIONS,
                    _sort: res.locals._sort
                })
            })
            .catch(next)
    }

    // [PATCH] /admin/order/:id/restore
    async restore(req, res, next) {
        await Order.restore({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/order/:id/force
    async forceDelete(req, res, next) {
        await Order.deleteOne({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [POST] /admin/order/handle-form-actions
    async handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Order.delete({ _id: { $in: req.body.orderIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'restore':
                Order.restore({ _id: { $in: req.body.orderIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'forceDelete':
                Order.deleteMany({ _id: { $in: req.body.orderIds } })
                    .then(() => res.send('success'))
                    .catch(next)
                break
            case 'setStatus':
                Order.updateMany(
                    { _id: { $in: req.body.orderIds } },
                    { $set: { status: req.body.selectedStatus } }
                )
                    .then(() => res.send('success'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action is invalid' })
        }
    }

    // [GET] /admin/order/:id/order-details
    async orderDetails(req, res, next) {
        await OrderDetail.find({ orderId: req.params.id })
            .populate('beverageId')
            .then(orderDetails => res.send(orderDetails))
            .catch(next)
    }

    // [POST] /admin/order/create-order-detail
    async createOrderDetail(req, res, next) {
        res.send(req.body)
    }

    // [PUT] /admin/order/detail/:id
    async updateOrderDetail(req, res, next) {
        res.send(req.body)
    }

    // [DELETE] /admin/order/detail/:id
    async deleteOrderDetail(req, res, next) {
        res.send(req.body)
    }
}

module.exports = new AdminOrderController