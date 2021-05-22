const express = require('express');

const { advertisement: advertisementController } = require('../http/controllers');
const upload = require('../http/middlewares/uploadFile');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.post('/advertisements', auth, upload.single('advertisementImg'), advertisementController.create);
router.get('/advertisements', advertisementController.getList);
router.put('/advertisements/:advertisementId', auth, upload.single('advertisementImg'), advertisementController.update);
router.delete('/advertisements/:advertisementId', auth, advertisementController.remove);

module.exports = router;
