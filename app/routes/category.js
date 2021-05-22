const express = require('express');

const { category: categoryController } = require('../http/controllers');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.post('/categories', auth, categoryController.create);
router.get('/categories', categoryController.getList);
router.put('/categories/:categoryId', auth, categoryController.update);
router.delete('/categories/:categoryId', auth, categoryController.remove);

module.exports = router;
