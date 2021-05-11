const express = require('express');
const { user: userController } = require('../http/controllers');
const { permission } = require('../http/middlewares');

const router = express.Router();

router.get('/users', permission(['manage users', 'access users']), userController.getUsers);
router.post('/users', permission(['manage users']), userController.addUser);
router.get('/users/list', permission(['manage users', 'access users']), userController.getList);
router.put('/users/:userId', permission(['manage users']), userController.updateUser);

module.exports = router;
