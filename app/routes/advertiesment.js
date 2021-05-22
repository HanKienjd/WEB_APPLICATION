const express = require('express');

const { advertisement: advertisementController } = require('../http/controllers');
const upload = require('../http/middlewares/uploadFile');

const router = express.Router();

router.post('/advertisements', upload.single('advertisementImg'), advertisementController.create);
router.get('/advertisements', advertisementController.getList);
router.put('/advertisements/:advertisementId', upload.single('advertisementImg'), advertisementController.update);
router.delete('/advertisements/:advertisementId', advertisementController.remove);

module.exports = router;
