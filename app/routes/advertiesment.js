const express = require('express');

const { advertisement: advertisementController } = require('../http/controllers');
const upload = require('../http/middlewares/uploadFile');
const { auth } = require('../http/middlewares');
const checkPermission = require('../http/middlewares/permission');

const router = express.Router();

router.post('/advertisements', auth, checkPermission, upload.single('advertisementImg'), advertisementController.create);
router.get('/advertisements', advertisementController.getList);
router.put('/advertisements/:advertisementId', auth, checkPermission, upload.single('advertisementImg'), advertisementController.update);
router.delete('/advertisements/:advertisementId', auth, checkPermission, advertisementController.remove);

module.exports = router;
