
const Voucher = require("../models/Voucher")
const Beverage = require('../models/Beverage')
const Order = require('../models/Order')
const OrderDetail = require('../models/OrderDetail')
const sizePriceRate = {
    small: 1,
    medium: 1.2,
    large: 1.4
}

async function calculateOrderTotalMiddleware(req, res, next) {
    const { shippingFee, voucherId } = req.body.order
    let subTotal = 0, oldSubTotal = 0
    req.body.orderDetails = await Promise.all(req.body.orderDetails.map(async orderDetail => {
        // update
        if (orderDetail._id) {
            const oldOrderDetail = await OrderDetail.findById(orderDetail._id)
            if (!oldOrderDetail) {
                return res.status(400).json({ 
                    error: `Order detail with ID ${orderDetail._id} not found.` 
                })
            }
            oldSubTotal += oldOrderDetail.total
        }
        const beverage = await Beverage.findById(orderDetail.beverageId)
        if (!beverage) {
            return res.status(400).json({ 
                error: `Beverage with ID ${orderDetail.beverageId} not found.` 
            })
        }
        const totalOrderDetail = beverage.listPrice * orderDetail.quantity
        subTotal += totalOrderDetail
        return {
            ...orderDetail,
            price: beverage.listPrice,
            total: totalOrderDetail
        }
    }))
    if (req.params.id) {
        const order = await Order.findById(req.params.id)
        if (!order) {
            return res.status(400).json({ 
                error: `Order with ID ${req.params.id} not found.` 
            })
        }
        subTotal = order.subTotal + subTotal - oldSubTotal
    }
    const tax = subTotal * 0.1
    let total = subTotal + shippingFee + tax
    if (voucherId) {
        const voucher = await Voucher.findById(voucherId)
        if (!voucher) {
            return res.status(400).json({ 
                error: `Voucher with ID ${voucherId} not found.` 
            })
        }
        if (voucher.value) {
            total -= voucher.value
        }
    }
    total = total > 0 ? total : 0 
    req.body.order.subTotal = subTotal
    req.body.order.tax = tax
    req.body.order.total = total
    next()
}

const calculateSubTotal = async (orderId, orderDetailId = null, isMethodPost = false) => {
    if (!orderId) return { error: 'Order ID is required.' }
    let orderDetails = []
    if (isMethodPost) {
        orderDetails = await OrderDetail.find({ orderId }).select('total')
    } else {
        if (!orderDetailId) return { error: 'Order detail ID is required.' }
        orderDetails = await OrderDetail.find({ orderId, _id: { $ne: orderDetailId } }).select('total')
    }
    if (orderDetails.length === 0) return 0
    let subTotal = 0
    orderDetails.forEach(orderDetail => {
        subTotal += orderDetail.total
    })
    return subTotal
}

async function processOrderDetailChangeMiddleware(req, res, next) {
    const validSizes = ['small', 'medium', 'large']
    let subTotal, shippingFee, voucherValue = 0, orderId
    try {
        if (req.params.id && req.method === 'DELETE') {
            const orderDetail = await OrderDetail.findById(req.params.id).select('orderId total').lean()
            if (!orderDetail) {
                return res.status(400).json({ 
                    error: `Order detail with ID ${req.params.id} not found.`
                })
            }
            orderId = orderDetail.orderId
            subTotal = await calculateSubTotal(orderId, req.params.id)
            if (subTotal.error) return res.status(400).json({ error: subTotal.error })
            req.body = {
                order: {}
            }
        } else {
            if (typeof req.body.quantity !== 'number' || req.body.quantity <= 0) return res.status(400).json({ error: 'Invalid quantity.' })
            if (!validSizes.includes(req.body.size)) {
                return res.status(400).json({
                    error: `Invalid size. Must be one of ${validSizes.join(', ')}.`
                })
            }
    
            if (req.params.id) {
                subTotal = await calculateSubTotal(req.body.orderId, req.params.id)
                const orderDetailExists = await OrderDetail.exists({ _id: req.params.id })
                if (!orderDetailExists) return res.status(400).json({ error: `Order detail with ID ${req.params.id} not found.` })
            } else {
                subTotal = await calculateSubTotal(req.body.orderId, null, true)
                const orderDetailExists = await OrderDetail.exists({
                    orderId: req.body.orderId,
                    beverageId: req.body.beverageId
                })
                if (orderDetailExists) {
                    return res.status(400).json({ 
                        error: `OrderDetail with orderId ${req.body.orderId} and beverageId ${req.body.beverageId} exists.`
                    })
                }
            }
            if (subTotal.error) return res.status(400).json({ error: subTotal.error })
            const beverage = await Beverage.findById(req.body.beverageId).select('listPrice')
            if (!beverage) return res.status(400).json({ error: `Beverage with ID ${req.body.beverageId} not found.` })
            const orderDetailSellPrice = beverage.listPrice
            const orderDetailPrice = Math.ceil((orderDetailSellPrice * sizePriceRate[req.body.size]) / 1000) * 1000
            const orderDetailTotal = orderDetailPrice * req.body.quantity
            // order
            subTotal += orderDetailTotal
            orderId = req.body.orderId
            req.body = {
                orderDetail: {
                    ...req.body,
                    sellPrice: orderDetailSellPrice,
                    price: orderDetailPrice,
                    total: orderDetailTotal
                },
                order: {}
            }
        }
        const order = await Order.findById(orderId).select('shippingFee voucherId').lean()
        if (!order) return res.status(400).json({ error: `Order with ID ${orderId} not found.` })
        shippingFee = order.shippingFee || 0
        voucherValue = (await Voucher.findById(order.voucherId).select('value')).value || 0
        const tax = subTotal * 0.1
        const total = Math.ceil((subTotal + tax + shippingFee - voucherValue) / 1000) * 1000
        req.body.order.orderId = orderId
        req.body.order.subTotal = subTotal
        req.body.order.tax = tax
        req.body.order.total = total > 0 ? total : 0
        next()
    } catch (error) {
        return res.status(500).json({ error })
    }
}

module.exports = {
    calculateOrderTotalMiddleware,
    processOrderDetailChangeMiddleware
}