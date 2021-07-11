const express = require('express');
const { user: userController } = require('../http/controllers');
const upload = require('../http/middlewares/uploadFile');

const router = express.Router();

router.get('/users', userController.getUsers);
router.put('/users', upload.single('userImg'), userController.updateUser);

module.exports = router;
