const express = require('express');

const { product: productController } = require('../http/controllers');
const upload = require('../http/middlewares/uploadFile');

const router = express.Router();

router.post('/products', upload.single('productImg'), productController.create);
router.get('/products', productController.getList);
router.get('/products/:productId', productController.getDetail);
router.put('/products/:productId', upload.single('productImg'), productController.update);
router.delete('/products/:productId', productController.remove);

module.exports = router;
