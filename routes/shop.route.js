const express = require('express');

var shopController = require('../controllers/shop.controller.js');

var router = express.Router();

//show book list
router.get('/:id/books', shopController.index);

router.get('/books/create', shopController.create);

router.post('/books/create', shopController.postCreate);

module.exports = router;