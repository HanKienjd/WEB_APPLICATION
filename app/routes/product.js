const express = require('express');

const { product: productController } = require('../http/controllers');
const upload = require('../http/middlewares/uploadFile');

const router = express.Router();

router.post('/products', upload.single('productImg'), productController.create);
router.get('/products', productController.getList);
router.get('/products/:productId', productController.getDetail);

module.exports = router;
