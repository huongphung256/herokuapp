const express = require('express');

var shopController = require('../controllers/shop.controller.js');

var router = express.Router();

router.get('/books/create', shopController.create);

router.post('/books/create', shopController.postCreate);

module.exports = router;