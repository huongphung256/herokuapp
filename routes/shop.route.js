const express = require('express');

var shopController = require('../controllers/shop.controller.js');

var router = express.Router();

router.get('/:', shopController.index);

module.exports = router;