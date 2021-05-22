const express = require('express');

const { upload: uploadController } = require('../http/controllers');

const router = express.Router();

router.get('/uploads/:imgName', uploadController.getImage);

module.exports = router;
