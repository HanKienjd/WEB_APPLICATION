const express = require('express');

const { category: categoryController } = require('../http/controllers');

const router = express.Router();

router.post('/categories', categoryController.create);
router.get('/categories', categoryController.getList);
router.put('/categories/:categoryId', categoryController.update);
router.delete('/categories/:categoryId', categoryController.remove);

module.exports = router;
