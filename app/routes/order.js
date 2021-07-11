const express = require('express');

const { order: orderController } = require('../http/controllers');

const router = express.Router();

router.post('/orders', orderController.create);
router.get('/orders', orderController.getList);
router.get('/orders/:orderId', orderController.getOrderDetail);

module.exports = router;
