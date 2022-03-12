const express = require('express');

const { book: bookController } = require('../http/controllers');
const { auth } = require('../http/middlewares');
const upload = require('../http/middlewares/uploadFile');
const checkPermission = require('../http/middlewares/permission');

const router = express.Router();

router.get('/books', bookController.getList);
router.get('/books/:bookId', auth, checkPermission, bookController.getBookById);
router.post('/books', auth, checkPermission, upload.single('imageBook'), bookController.create);
router.put('/books/:bookId', auth, checkPermission, upload.single('imageBook'), bookController.update);
router.delete('/books/:bookId', auth, checkPermission, bookController.remove);

module.exports = router;
