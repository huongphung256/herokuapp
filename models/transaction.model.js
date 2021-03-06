var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
  userId: String,
  sessionId: String,
  bookId: String,
  isComplete: Boolean,
  isAdmin: Boolean
}, { versionKey: false });

var Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

module.exports = Transaction;