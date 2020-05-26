const express = require('express');
var multer = require('multer');

var shopController = require('../controllers/shop.controller.js');

var upload = multer({ dest: './public/' });

var router = express.Router();

//show book list
router.get('/:id/books', shopController.index);

router.get('/books/create', shopController.create);

router.post('/books/create', upload.single('coverUrl'), shopController.postCreate);

module.exports = router;