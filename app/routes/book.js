const express = require('express');

const { book: bookController } = require('../http/controllers');
// const { auth } = require('../http/middlewares');
// const checkPermission = require('../http/middlewares/permission');

const router = express.Router();

// router.post('/categories', auth, checkPermission, categoryController.create);
router.get('/books', bookController.getList);
// router.put('/categories/:categoryId', auth, checkPermission, categoryController.update);
// router.delete('/categories/:categoryId', auth, checkPermission, categoryController.remove);

module.exports = router;
