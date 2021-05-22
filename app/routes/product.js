const express = require('express');

const { product: productController } = require('../http/controllers');
const upload = require('../http/middlewares/uploadFile');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.post('/products', auth, upload.single('productImg'), productController.create);
router.get('/products', productController.getList);
router.get('/products/:productId', productController.getDetail);
router.put('/products/:productId', auth, upload.single('productImg'), productController.update);
router.delete('/products/:productId', auth, productController.remove);

module.exports = router;
