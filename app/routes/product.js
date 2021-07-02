const express = require('express');

const { product: productController } = require('../http/controllers');
const upload = require('../http/middlewares/uploadFile');
const { auth } = require('../http/middlewares');
const checkPermission = require('../http/middlewares/permission');

const router = express.Router();

router.post('/products', auth, checkPermission, upload.single('productImg'), productController.create);
router.get('/products', productController.getList);
router.get('/products/:productId', productController.getDetail);
router.put('/products/:productId', auth, checkPermission, upload.single('productImg'), productController.update);
router.delete('/products/:productId', auth, checkPermission, productController.remove);

module.exports = router;
