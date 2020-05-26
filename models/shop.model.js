var mongoose = require('mongoose');

var shopSchema = new mongoose.Schema({
  title: String,
  description: String,
  coverUrl: String
}, { versionKey: false });

var Shop = mongoose.model('Shop', shopSchema, 'sh');

module.exports = Shop;