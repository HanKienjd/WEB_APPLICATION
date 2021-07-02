const express = require('express');

const { order: orderController } = require('../http/controllers');
const checkPermission = require('../http/middlewares/permission');

const router = express.Router();

router.post('/orders', checkPermission, orderController.create);
router.get('/orders', orderController.getList);
router.get('/orders/:orderId', checkPermission, orderController.getOrderDetail);

module.exports = router;
