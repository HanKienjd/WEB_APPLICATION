const express = require('express');
const { policy: policyController } = require('../http/controllers');
const { permission } = require('../http/middlewares');

const router = express.Router();

router.get('/policies', permission(['manage setting']), policyController.getAllPolicies);

module.exports = router;
