
const express = require('express')
const router = express.Router()

const adminOrderController = require('../app/controllers/AdminOrderController')
// middleware
const { calculateOrderTotalMiddleware, processOrderDetailChangeMiddleware } = require('../app/middlewares/calculateOrderTotalMiddleware')

router.delete('/detail/:id', processOrderDetailChangeMiddleware, adminOrderController.deleteOrderDetail)
router.delete('/:id/force', adminOrderController.forceDelete)
router.delete('/:id', adminOrderController.delete)
router.patch('/:id/restore', adminOrderController.restore)
router.put('/detail/:id', processOrderDetailChangeMiddleware, adminOrderController.updateOrderDetail)
router.put('/:id', calculateOrderTotalMiddleware, adminOrderController.update)
router.post('/handle-form-actions', adminOrderController.handleFormActions)
router.post('/create', calculateOrderTotalMiddleware, adminOrderController.create)
router.post('/create-order-detail', processOrderDetailChangeMiddleware, adminOrderController.createOrderDetail)
router.get('/all', adminOrderController.all)
router.get('/trash', adminOrderController.trash)
router.get('/:id/order-details', adminOrderController.orderDetails)
router.get('/:id', adminOrderController.detail)
router.get('/', adminOrderController.show)

module.exports = router