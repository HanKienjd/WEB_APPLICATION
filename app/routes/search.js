const express = require('express');
const { auth } = require('../http/middlewares');
const checkPermission = require('../http/middlewares/permission');

const { search: searchController } = require('../http/controllers');

const router = express.Router();

router.get('/search', searchController.queryName);

module.exports = router;
