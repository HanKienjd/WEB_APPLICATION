const express = require('express');

const { book: bookController } = require('../http/controllers');
const { auth } = require('../http/middlewares');
const checkPermission = require('../http/middlewares/permission');

const router = express.Router();

router.get('/books', auth, checkPermission, bookController.getList);
router.get('/books/:bookId', auth, checkPermission, bookController.getBookById);
router.delete('/books/:bookId', auth, checkPermission, bookController.remove);

module.exports = router;
