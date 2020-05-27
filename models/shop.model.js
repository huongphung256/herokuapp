var mongoose = require('mongoose');

var shopSchema = new mongoose.Schema({
  userId: String,
  books: [{
    title: String,
    description: String,
    coverUrl: String
  }]
}, { versionKey: false });

var Shop = mongoose.model('Shop', shopSchema, 'shops');

module.exports = Shop;