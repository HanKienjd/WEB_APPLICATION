const express = require('express');

const { role: roleController } = require('../http/controllers');
const { permission } = require('../http/middlewares');

const router = express.Router();

router.post('/roles', permission(['manage setting']), roleController.addRole);
router.put('/roles/:roleId', permission(['manage setting']), roleController.updateRole);
router.delete('/roles/:roleId', permission(['manage setting']), roleController.removeRole);

router.get('/roles', roleController.getAllRole);

module.exports = router;
